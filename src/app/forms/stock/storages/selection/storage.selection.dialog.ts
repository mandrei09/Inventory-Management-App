import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {StorageListComponent} from '../storage.list';
import {Storage} from '../../../../model/api/stock/storage';
import {StorageHttpService} from '../../../../services/http/stock/storage.http.service';

@Component({
  selector: 'storage-selection-dialog',
  templateUrl: 'storage.selection.dialog.html',
  styleUrls: ['storage.selection.dialog.scss']
})
export class StorageSelectionDialog {

  public itemList!: StorageListComponent;
  @ViewChild(StorageListComponent) set setItemList(itemList: StorageListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) {
      // this.itemList.selectedItems = this.selectedItems;
      this.refreshItems();
    }
  }

  public items: Array<Storage> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  // private _selectedItems: Array<Storage> = [];
  // public get selectedItems(): Array<Storage> { return this._selectedItems; }
  // public set selectedItems(value: Array<Storage>) {
  //   this._selectedItems = value;
  //
  //   if (this.itemList !== null && this.itemList !== undefined) {
  //     this.itemList.selectedItems = this.selectedItems;
  //   }
  // }

  constructor(
    public dataSource: StorageHttpService,
    public dialogRef: MatDialogRef<StorageSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
    // this.selectedItems = data?.selectedItems;
  }

  public onSelectionChanged(items: Array<Storage>) {
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
