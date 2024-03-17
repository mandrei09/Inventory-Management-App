import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Region} from '../../../../model/api/administration/region';
import {AdmCenter} from '../../../../model/api/administration/adm-center';
import {RegionHttpService} from '../../../../services/http/administration/region.http.service';

@Component({
  selector: 'app-region-add-edit',
  templateUrl: './region-add-edit.component.html',
  styleUrls: ['./region-add-edit.component.scss']
})
export class RegionAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: Region | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: RegionHttpService,
    public dialogRef: MatDialogRef<RegionAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
    this.item = data.item;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.item !== null) {
        this.editItem(this.item);
      } else this.addItem();
    }, 0);
  }

  public addItem() {
    // @ts-ignore
    this.item = new Region();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: Region) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.code = formModel.code as string;
    this.item!.name = formModel.name as string;
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Asset group a fost modificat cu succes.');
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: Region | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Asset group a fost creata cu succes.');
      });
    }
  }
}
