import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {DictionaryTypeListComponent} from '../dictionary-type.list';
import {DictionaryType} from '../../../../model/api/administration/dictionary-type';
import {DictionaryTypeHttpService} from '../../../../services/http/administration/dictionary-type.http.service';

@Component({
  selector: 'dictionary-type-selection-dialog',
  templateUrl: 'dictionary-type.selection.dialog.html',
  styleUrls: ['dictionary-type.selection.dialog.scss']
})
export class DictionaryTypeSelectionDialog {

  public itemList!: DictionaryTypeListComponent;
  @ViewChild(DictionaryTypeListComponent) set setItemList(itemList: DictionaryTypeListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<DictionaryType> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: DictionaryTypeHttpService,
    public dialogRef: MatDialogRef<DictionaryTypeSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<DictionaryType>) {
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
