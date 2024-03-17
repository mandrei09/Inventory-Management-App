import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Dimension} from '../../../../model/api/administration/dimension';
import {DimensionHttpService} from '../../../../services/http/administration/dimension.http.service';

@Component({
  selector: 'app-dimension-add-edit',
  templateUrl: './dimension-add-edit.component.html',
  styleUrls: ['./dimension-add-edit.component.scss']
})
export class DimensionAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: Dimension | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: DimensionHttpService,
    public dialogRef: MatDialogRef<DimensionAddEditComponent>,
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
    this.item = new Dimension();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: Dimension) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      length: [null, Validators.compose([Validators.required])],
      width: [null, Validators.compose([Validators.required])],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.length = formModel.length as string;
    this.item!.width = formModel.width as string;
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Asset group a fost modificat cu succes.');
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: Dimension | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Asset group a fost creata cu succes.');
      });
    }
  }
}
