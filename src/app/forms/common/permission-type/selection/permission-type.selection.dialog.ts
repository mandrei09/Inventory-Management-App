import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {PermissionTypeList} from '../permission-type.list';
import {PermissionType} from '../../../../model/api/common/permission-type';
import {PermissionTypeHttpService} from '../../../../services/http/common/permission-type.http.service';

@Component({
  selector: 'permission-type-selection-dialog',
  templateUrl: 'permission-type.selection.dialog.html',
  styleUrls: ['permission-type.selection.dialog.scss']
})
export class PermissionTypeSelectionDialog {

  public itemList!: PermissionTypeList;
  @ViewChild(PermissionTypeList) set setItemList(itemList: PermissionTypeList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) {
      this.itemList.selectedItems = this.selectedItems;
      this.refreshItems();
    }
  }

  public items: Array<PermissionType> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  private _selectedItems: Array<PermissionType> = [];
  public get selectedItems(): Array<PermissionType> { return this._selectedItems; }
  public set selectedItems(value: Array<PermissionType>) {
    this._selectedItems = value;

    if (this.itemList !== null && this.itemList !== undefined) {
      this.itemList.selectedItems = this.selectedItems;
    }
  }

  constructor(
    public dataSource: PermissionTypeHttpService,
    public dialogRef: MatDialogRef<PermissionTypeSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;

    this.selectedItems = data?.selectedItems;
  }

  public onSelectionChanged(items: Array<PermissionType>) {
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
