import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {DeviceList} from '../device.list';
import {Pocket} from '../../../../model/api/common/device';
import {DeviceHttpService} from '../../../../services/http/common/device.http.service';

@Component({
  selector: 'devices-selection-dialog',
  templateUrl: 'devices.selection.dialog.html',
  styleUrls: ['devices.selection.dialog.scss']
})
export class DevicesSelectionDialog {

  public itemList!: DeviceList;
  @ViewChild(DeviceList) set setItemList(itemList: DeviceList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Pocket> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: DeviceHttpService,
    public dialogRef: MatDialogRef<DevicesSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Pocket>) {
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
