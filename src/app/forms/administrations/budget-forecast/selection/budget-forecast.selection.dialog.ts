import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {BudgetForecastListComponent} from '../budget-forecast.list';
import {BudgetForecast} from '../../../../model/api/budget/budget-forecast';
import {BudgetForecastHttpService} from '../../../../services/http/administration/budget-forecast.http.service';

@Component({
  selector: 'budget-forecast-selection-dialog',
  templateUrl: 'budget-forecast.selection.dialog.html',
  styleUrls: ['budget-forecast.selection.dialog.scss']
})
export class BudgetForecastSelectionDialog {

  public itemList!: BudgetForecastListComponent;
  @ViewChild(BudgetForecastListComponent) set setItemList(itemList: BudgetForecastListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<BudgetForecast> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: BudgetForecastHttpService,
    public dialogRef: MatDialogRef<BudgetForecastSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<BudgetForecast>) {
    this.items = items;
  }

  onCancel(): void {
    this.dialogRef.close({data: this.itemList.selectedItems});
  }

  public refreshItems() {
    this.itemList.resetFilters(this.params);
    this.itemList.refresh(this.params);
  }
}
