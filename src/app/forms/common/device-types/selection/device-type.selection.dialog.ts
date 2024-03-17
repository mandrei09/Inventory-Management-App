import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {DeviceTypeList} from '../device-type.list';
import {DeviceType} from '../../../../model/api/common/device-type';
import {DeviceTypeHttpService} from '../../../../services/http/common/device-type.http.service';

@Component({
  selector: 'device-type-selection-dialog',
  templateUrl: 'device-type.selection.dialog.html',
  styleUrls: ['device-type.selection.dialog.scss']
})
export class DeviceTypeSelectionDialog {

  public itemList!: DeviceTypeList;
  @ViewChild(DeviceTypeList) set setItemList(itemList: DeviceTypeList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<DeviceType> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: DeviceTypeHttpService,
    public dialogRef: MatDialogRef<DeviceTypeSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<DeviceType>) {
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
