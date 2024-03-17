import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {AssetCategoryListComponent} from '../asset-category.list';
import {AssetCategory} from '../../../../model/api/assets/asset-category';
import {AssetCategoryHttpService} from '../../../../services/http/assets/asset-category.http.service';

@Component({
  selector: 'asset-categories-selection-dialog',
  templateUrl: 'asset-categories.selection.dialog.html',
  styleUrls: ['asset-categories.selection.dialog.scss']
})
export class AssetCategoriesSelectionDialog {

  public itemList!: AssetCategoryListComponent;
  @ViewChild(AssetCategoryListComponent) set setItemList(itemList: AssetCategoryListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<AssetCategory> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: AssetCategoryHttpService,
    public dialogRef: MatDialogRef<AssetCategoriesSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<AssetCategory>) {
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
