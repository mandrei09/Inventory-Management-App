import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {CountyListComponent} from '../county.list';
import {CountyHttpService} from '../../../../services/http/administration/county.http.service';
import {County} from '../../../../model/api/administration/county';

@Component({
  selector: 'counties-selection-dialog',
  templateUrl: 'county.selection.dialog.html',
  styleUrls: ['county.selection.dialog.scss']
})
export class CountySelectionDialog {

  public itemList!: CountyListComponent;
  @ViewChild(CountyListComponent) set setItemList(itemList: CountyListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<County> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: CountyHttpService,
    public dialogRef: MatDialogRef<CountySelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<County>) {
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
