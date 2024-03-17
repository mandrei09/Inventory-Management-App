import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {PermissionList} from '../permission.list';
import {Permission} from '../../../../model/api/common/permission';
import {PermissionHttpService} from '../../../../services/http/common/permission.http.service';

@Component({
  selector: 'permission-selection-dialog',
  templateUrl: 'permission.selection.dialog.html',
  styleUrls: ['permission.selection.dialog.scss']
})
export class PermissionSelectionDialog {

  public itemList!: PermissionList;
  @ViewChild(PermissionList) set setItemList(itemList: PermissionList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) {
      this.itemList.selectedItems = this.selectedItems;
      this.refreshItems();
    }
  }

  public items: Array<Permission> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  private _selectedItems: Array<Permission> = [];
  public get selectedItems(): Array<Permission> { return this._selectedItems; }
  public set selectedItems(value: Array<Permission>) {
    this._selectedItems = value;

    if (this.itemList !== null && this.itemList !== undefined) {
      this.itemList.selectedItems = this.selectedItems;
    }
  }

  constructor(
    public dataSource: PermissionHttpService,
    public dialogRef: MatDialogRef<PermissionSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;

    this.selectedItems = data?.selectedItems;
  }

  public onSelectionChanged(items: Array<Permission>) {
    this.items = items;
  }

  onCancel(): void {
    this.dialogRef.close({items: this.items});
  }

  public refreshItems() {
    this.itemList.resetFilters(this.params);
    this.itemList.refresh(this.params);
  }
}
