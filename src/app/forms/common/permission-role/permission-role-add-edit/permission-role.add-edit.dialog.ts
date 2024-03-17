import {AfterViewInit, Component, Inject, Input, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PermissionRole} from '../../../../model/api/common/permission-role';
import {PermissionRoleHttpService} from '../../../../services/http/common/permission-role.http.service';
import {CodeNameEntity} from '../../../../model/api/common/code-name-entity';
import {RoleEntity} from '../../../../model/api/common/role-entity';

@Component({
    selector: 'permission-role-add-edit-dialog',
    templateUrl: 'permission-role.add-edit.dialog.html',
    styleUrls: [ 'permission-role.add-edit.dialog.scss' ]
})
export class PermissionRoleAddEditDialog implements AfterViewInit {

  public form!: FormGroup;
  public item!: PermissionRole | null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dataSource: PermissionRoleHttpService,
    public dialogRef: MatDialogRef<PermissionRoleAddEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
    this.item = data.item;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.item !== null) {
        this.editItem(this.item);
      }
      else this.addItem();
    }, 0);
  }

  public addItem() {
    // @ts-ignore
    this.item = new PermissionRole();
    this.item.id = 0;
    this.form.patchValue(this.item);
  }

  public editItem(item: PermissionRole) {
    this.form.patchValue(item);
  }

  private createForm() {
    this.form = this.fb.group({
      permissionType: [null, Validators.compose([Validators.required])],
      permission: [null, Validators.compose([Validators.required])],
      role: [null, Validators.compose([Validators.required])],
    });
  }

  protected updateItem() {
    const formModel = this.form.value;

    this.item!.permissionType = null;
    if ((formModel.permissionType !== null)) this.item!.permissionType = formModel.permissionType as CodeNameEntity;

    this.item!.permission = null;
    if ((formModel.permission !== null)) this.item!.permission = formModel.permission as CodeNameEntity;

    this.item!.role = null;
    if ((formModel.role !== null)) this.item!.role = formModel.role as RoleEntity;
  }

  public save() {
    this.updateItem();
    if (this.item!.id! > 0) {
      this.dataSource.update(this.item!).subscribe(() => {
        this.dialogRef.close();
        // this.notificationSvc.success('Centrul de cost a fost modificat cu succes.');
      });
    } else {
      this.dataSource.create(this.item!).subscribe((item: PermissionRole | null) => {
        this.item = item;
        this.dialogRef.close();
        // this.notificationSvc.success('Centrul de cost a fost creat cu succes.');
      });
    }
  }
}
