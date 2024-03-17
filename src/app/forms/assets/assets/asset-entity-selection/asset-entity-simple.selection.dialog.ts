import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {AssetEntityListComponent} from '../asset-entity.list';
import {AssetHttpService} from '../../../../services/http/assets/asset.http.service';
import {Asset} from '../../../../model/api/assets/asset';

@Component({
  selector: 'asset-entity-simple-selection-dialog',
  templateUrl: 'asset-entity-simple.selection.dialog.html',
  styleUrls: ['asset-entity-simple.selection.dialog.scss']
})
export class AssetEntitySimpleSelectionDialog {

  public itemList!: AssetEntityListComponent;
  @ViewChild(AssetEntityListComponent) set setItemList(itemList: AssetEntityListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) {
      // this.itemList.selectedItems = this.selectedItems;
      this.refreshItems();
    }
  }

  public items: Array<Asset> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  // private _selectedItems: Array<Asset> = [];
  // public get selectedItems(): Array<Asset> { return this._selectedItems; }
  // public set selectedItems(value: Array<Asset>) {
  //   this._selectedItems = value;
  //
  //   if (this.itemList !== null && this.itemList !== undefined) {
  //     this.itemList.selectedItems = this.selectedItems;
  //   }
  // }

  constructor(
    public dataSource: AssetHttpService,
    public dialogRef: MatDialogRef<AssetEntitySimpleSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
    // this.selectedItems = data?.selectedItems;
  }

  public onSelectionChanged(items: Array<Asset>) {
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
