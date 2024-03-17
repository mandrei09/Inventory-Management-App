import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {CategoryListComponent} from '../category.list';
import {Category} from '../../../../model/api/assets/category';
import {CategoryHttpService} from '../../../../services/http/assets/category.http.service';

@Component({
  selector: 'category-selection-dialog',
  templateUrl: 'category.selection.dialog.html',
  styleUrls: ['category.selection.dialog.scss']
})
export class CategorySelectionDialog {

  public itemList!: CategoryListComponent;
  @ViewChild(CategoryListComponent) set setItemList(itemList: CategoryListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Category> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: CategoryHttpService,
    public dialogRef: MatDialogRef<CategorySelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Category>) {
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
