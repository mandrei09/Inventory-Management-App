import {AfterViewInit, Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PermissionType} from '../../../../model/api/common/permission-type';
import {PermissionTypeHttpService} from '../../../../services/http/common/permission-type.http.service';

@Component({
  selector: 'app-permission-type-add-edit',
  templateUrl: './permission-type-add-edit.component.html',
  styleUrls: ['./permission-type-add-edit.component.scss']
})
export class PermissionTypeAddEditComponent implements AfterViewInit {

  public form!: FormGroup;
  public item!: PermissionType | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: PermissionTypeHttpService,
    public dialogRef: MatDialogRef<PermissionTypeAddEditComponent>,
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
    this.item = new PermissionType();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: PermissionType) {
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
      this.dataSource.create(this.item!).subscribe((item: PermissionType | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Asset group a fost creata cu succes.');
      });
    }
  }
}
