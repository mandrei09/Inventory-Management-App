import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {OrderTypeListComponent} from '../order-type.list';
import {OrderType} from '../../../../model/api/order/order-type';
import {OrderTypeHttpService} from '../../../../services/http/orders/order-type.http.service';

@Component({
  selector: 'order-type-selection-dialog',
  templateUrl: 'order-type.selection.dialog.html',
  styleUrls: ['order-type.selection.dialog.scss']
})
export class OrderTypeSelectionDialog {

  public itemList!: OrderTypeListComponent;
  @ViewChild(OrderTypeListComponent) set setItemList(itemList: OrderTypeListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<OrderType> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: OrderTypeHttpService,
    public dialogRef: MatDialogRef<OrderTypeSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<OrderType>) {
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
