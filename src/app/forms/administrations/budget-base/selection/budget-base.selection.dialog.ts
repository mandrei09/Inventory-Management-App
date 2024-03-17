import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {BudgetBaseListComponent} from '../budget-base.list';
import {BudgetBase} from '../../../../model/api/budget/budget-base';
import {BudgetBaseHttpService} from '../../../../services/http/administration/budget-base.http.service';

@Component({
  selector: 'budget-base-selection-dialog',
  templateUrl: 'budget-base.selection.dialog.html',
  styleUrls: ['budget-base.selection.dialog.scss']
})
export class BudgetBaseSelectionDialog {

  public itemList!: BudgetBaseListComponent;
  @ViewChild(BudgetBaseListComponent) set setItemList(itemList: BudgetBaseListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<BudgetBase> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: BudgetBaseHttpService,
    public dialogRef: MatDialogRef<BudgetBaseSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<BudgetBase>) {
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
