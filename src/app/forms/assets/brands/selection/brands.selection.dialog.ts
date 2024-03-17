import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {BrandList} from '../brand.list';
import {Brand} from '../../../../model/api/assets/brand';
import {BrandHttpService} from '../../../../services/http/assets/brand.http.service';

@Component({
  selector: 'brands-selection-dialog',
  templateUrl: 'brands.selection.dialog.html',
  styleUrls: ['brands.selection.dialog.scss']
})
export class BrandsSelectionDialog {

  public itemList!: BrandList;
  @ViewChild(BrandList) set setItemList(itemList: BrandList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Brand> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: BrandHttpService,
    public dialogRef: MatDialogRef<BrandsSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Brand>) {
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
