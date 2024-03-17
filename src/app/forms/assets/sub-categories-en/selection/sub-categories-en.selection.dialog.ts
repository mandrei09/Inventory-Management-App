import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {SubCategory} from '../../../../model/api/assets/sub-category';
import {SubCategoryENListComponent} from '../sub-category-en.list';
import {SubCategoryEN} from '../../../../model/api/assets/sub-category-en';
import {SubCategoryENHttpService} from '../../../../services/http/assets/sub-category-en.http.service';

@Component({
  selector: 'sub-categories-en-selection-dialog',
  templateUrl: 'sub-categories-en.selection.dialog.html',
  styleUrls: ['sub-categories-en.selection.dialog.scss']
})
export class SubCategoriesEnSelectionDialog {

  public itemList!: SubCategoryENListComponent;
  @ViewChild(SubCategoryENListComponent) set setItemList(itemList: SubCategoryENListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<SubCategoryEN> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: SubCategoryENHttpService,
    public dialogRef: MatDialogRef<SubCategoriesEnSelectionDialog>,
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
