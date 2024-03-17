import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../model/common/param';
import {InventoryList} from '../inventory.list';
import {Inventory} from '../../../model/api/inventory/inventory';
import {InventoryHttpService} from '../../../services/http/inventory/inventory.http.service';

@Component({
  selector: 'divisions-selection-dialog',
  templateUrl: 'inventories.selection.dialog.html',
  styleUrls: ['inventories.selection.dialog.scss']
})
export class InventoriesSelectionDialog {

  public itemList!: InventoryList;
  @ViewChild(InventoryList) set setItemList(itemList: InventoryList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Inventory> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: InventoryHttpService,
    public dialogRef: MatDialogRef<InventoriesSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Inventory>) {
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
