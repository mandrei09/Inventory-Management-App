import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {DictionaryItemListComponent} from '../dictionary-item.list';
import {DictionaryItem} from '../../../../model/api/administration/dictionary-item';
import {DictionaryItemHttpService} from '../../../../services/http/administration/dictionary-item.http.service';

@Component({
  selector: 'dictionary-items-selection-dialog',
  templateUrl: 'dictionary-items.selection.dialog.html',
  styleUrls: ['dictionary-items.selection.dialog.scss']
})
export class DictionaryItemsSelectionDialog {

  public itemList!: DictionaryItemListComponent;
  @ViewChild(DictionaryItemListComponent) set setItemList(itemList: DictionaryItemListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<DictionaryItem> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: DictionaryItemHttpService,
    public dialogRef: MatDialogRef<DictionaryItemsSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<DictionaryItem>) {
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
