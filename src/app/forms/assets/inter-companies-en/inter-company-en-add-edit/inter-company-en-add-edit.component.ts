import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {InterCompanyENHttpService} from '../../../../services/http/assets/inter-company-en.http.service';
import {InterCompanyEN} from '../../../../model/api/assets/inter-company-en';

@Component({
  selector: 'app-inter-company-en-add-edit',
  templateUrl: './inter-company-en-add-edit.component.html',
  styleUrls: ['./inter-company-en-add-edit.component.scss']
})
export class InterCompanyEnAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: InterCompanyEN | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: InterCompanyENHttpService,
    public dialogRef: MatDialogRef<InterCompanyEnAddEditComponent>,
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
    this.item = new InterCompanyEN();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: InterCompanyEN) {
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
      this.dataSource.create(this.item!).subscribe((item: InterCompanyEN | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Asset group a fost creata cu succes.');
      });
    }
  }
}
