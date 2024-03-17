import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../model/common/param';
import {AccMonthListComponent} from '../acc-month.list';
import {AccMonth} from '../../../model/api/accounting/acc-month';
import {AccMonthHttpService} from '../../../services/http/accounting/acc-month.http.service';

@Component({
  selector: 'acc-months-selection-dialog',
  templateUrl: 'acc-month.selection.dialog.html',
  styleUrls: ['acc-month.selection.dialog.scss']
})
export class AccMonthSelectionDialog {

  public itemList!: AccMonthListComponent;
  @ViewChild(AccMonthListComponent) set setItemList(itemList: AccMonthListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<AccMonth> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: AccMonthHttpService,
    public dialogRef: MatDialogRef<AccMonthSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<AccMonth>) {
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
