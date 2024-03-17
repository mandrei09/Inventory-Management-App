import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../model/common/param';
import {RoleList} from '../role.list';
import {RoleEntity} from '../../../model/api/common/role-entity';
import {RoleService} from '../../../services/http/identity/role.service';

@Component({
  selector: 'roles-selection-dialog',
  templateUrl: 'roles.selection.dialog.html',
  styleUrls: ['roles.selection.dialog.scss']
})
export class RolesSelectionDialog {

  public itemList!: RoleList;
  @ViewChild(RoleList) set setItemList(itemList: RoleList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<RoleEntity> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: RoleService,
    public dialogRef: MatDialogRef<RolesSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<RoleEntity>) {
    this.items = items;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  public refreshItems() {
    this.itemList.resetFilters(this.params);
    this.itemList.refresh(this.params);
  }
}
