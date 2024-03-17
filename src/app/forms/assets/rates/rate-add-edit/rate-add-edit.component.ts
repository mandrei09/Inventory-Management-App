import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Article} from '../../../../model/api/assets/article';
import {RateHttpService} from '../../../../services/http/administration/rate.http.service';
import {Rate} from '../../../../model/api/administration/rate';

@Component({
  selector: 'app-rate-add-edit',
  templateUrl: './rate-add-edit.component.html',
  styleUrls: ['./rate-add-edit.component.scss']
})
export class RateAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: Rate | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: RateHttpService,
    public dialogRef: MatDialogRef<RateAddEditComponent>,
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
    this.item = new Rate();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: Rate) {
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
      this.dataSource.create(this.item!).subscribe((item: Rate | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Asset group a fost creata cu succes.');
      });
    }
  }
}
