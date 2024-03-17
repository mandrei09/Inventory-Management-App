import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {BudgetList} from '../budget.list';
import {Budget} from '../../../../model/api/administration/budget';
import {BudgetHttpService} from '../../../../services/http/administration/budget.http.service';

@Component({
  selector: 'budgets-selection-dialog',
  templateUrl: 'budget.selection.dialog.html',
  styleUrls: ['budget.selection.dialog.scss']
})
export class BudgetSelectionDialog {

  public itemList!: BudgetList;
  @ViewChild(BudgetList) set setItemList(itemList: BudgetList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Budget> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: BudgetHttpService,
    public dialogRef: MatDialogRef<BudgetSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Budget>) {
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
