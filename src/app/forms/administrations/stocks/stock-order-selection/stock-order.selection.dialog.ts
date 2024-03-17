import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {StockOrderListComponent} from '../stock-order.list';
import {SubCategoryHttpService} from '../../../../services/http/assets/sub-category.http.service';
import {SubCategory} from '../../../../model/api/assets/sub-category';

@Component({
  selector: 'stock-order-selection-dialog',
  templateUrl: 'stock-order.selection.dialog.html',
  styleUrls: ['stock-order.selection.dialog.scss']
})
export class StockOrderSelectionDialog {

  public itemList!: StockOrderListComponent;
  @ViewChild(StockOrderListComponent) set setItemList(itemList: StockOrderListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<SubCategory> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: SubCategoryHttpService,
    public dialogRef: MatDialogRef<StockOrderSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<SubCategory>) {
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
