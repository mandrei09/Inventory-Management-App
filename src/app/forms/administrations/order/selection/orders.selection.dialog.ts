import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {OrderList} from '../order.list';
import {Order} from '../../../../model/api/administration/order';
import {OrderHttpService} from '../../../../services/http/administration/order.http.service';

@Component({
  selector: 'orders-selection-dialog',
  templateUrl: 'orders.selection.dialog.html',
  styleUrls: ['orders.selection.dialog.scss']
})
export class OrdersSelectionDialog {

  public itemList!: OrderList;
  @ViewChild(OrderList) set setItemList(itemList: OrderList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Order> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: OrderHttpService,
    public dialogRef: MatDialogRef<OrdersSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Order>) {
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
