import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {CategoryENListComponent} from '../category-en.list';
import {CategoryEN} from '../../../../model/api/assets/category-en';
import {CategoryENHttpService} from '../../../../services/http/assets/category-en.http.service';

@Component({
  selector: 'category-en-selection-dialog',
  templateUrl: 'category-en.selection.dialog.html',
  styleUrls: ['category-en.selection.dialog.scss']
})
export class CategoryEnSelectionDialog {

  public itemList!: CategoryENListComponent;
  @ViewChild(CategoryENListComponent) set setItemList(itemList: CategoryENListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<CategoryEN> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: CategoryENHttpService,
    public dialogRef: MatDialogRef<CategoryEnSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<CategoryEN>) {
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
