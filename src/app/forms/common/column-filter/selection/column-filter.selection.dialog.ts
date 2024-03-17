import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {ColumnFilter} from '../../../../model/common/column-filter';
import {ColumnFilterHttpService} from '../../../../services/http/common/column-filter.http.service';
import { ColumnFilterListComponent } from '../column-filter.list';

@Component({
  selector: 'column-filter-selection-dialog',
  templateUrl: 'column-filter.selection.dialog.html',
  styleUrls: ['column-filter.selection.dialog.scss']
})
export class ColumnFilterSelectionDialog {

  public itemList!: ColumnFilterListComponent;
  @ViewChild(ColumnFilterListComponent) set setItemList(itemList: ColumnFilterListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<ColumnFilter> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: ColumnFilterHttpService,
    public dialogRef: MatDialogRef<ColumnFilterSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<ColumnFilter>) {
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
