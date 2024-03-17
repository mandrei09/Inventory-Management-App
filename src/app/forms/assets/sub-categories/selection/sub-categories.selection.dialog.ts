import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {SubCategoryListComponent} from '../sub-category.list';
import {SubCategory} from '../../../../model/api/assets/sub-category';
import {SubCategoryHttpService} from '../../../../services/http/assets/sub-category.http.service';

@Component({
  selector: 'sub-categories-selection-dialog',
  templateUrl: 'sub-categories.selection.dialog.html',
  styleUrls: ['sub-categories.selection.dialog.scss']
})
export class SubCategoriesSelectionDialog {

  public itemList!: SubCategoryListComponent;
  @ViewChild(SubCategoryListComponent) set setItemList(itemList: SubCategoryListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<SubCategory> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: SubCategoryHttpService,
    public dialogRef: MatDialogRef<SubCategoriesSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<SubCategory>) {
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
