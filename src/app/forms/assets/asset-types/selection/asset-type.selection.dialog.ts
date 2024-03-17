import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {AssetTypeListComponent} from '../asset-type.list';
import {AssetType} from '../../../../model/api/assets/asset-type';
import {AssetTypeHttpService} from '../../../../services/http/assets/asset-type.http.service';

@Component({
  selector: 'asset-types-selection-dialog',
  templateUrl: 'asset-type.selection.dialog.html',
  styleUrls: ['asset-type.selection.dialog.scss']
})
export class AssetTypeSelectionDialog {

  public itemList!: AssetTypeListComponent;
  @ViewChild(AssetTypeListComponent) set setItemList(itemList: AssetTypeListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<AssetType> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: AssetTypeHttpService,
    public dialogRef: MatDialogRef<AssetTypeSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<AssetType>) {
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
