import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../model/common/param';
import { IEntity } from '../../model/i-entity';
import { GenericTableList as GenericMatTable } from '../../forms/generic/generic.table.list';

@Component({
    template: ''
  })
export class GenericSelectionDialog<T extends IEntity<V>, V> {

  public itemList!: GenericMatTable<T, V>;
  @ViewChild('itemList') set setItemList(itemList: GenericMatTable<T, V>) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) {
      this.itemList.selectedItems = this.selectedItems;
      // this.itemList.disabledItems = this.disabledItems;
      this.refreshItems();
    }
  }

  public items: Array<any> = [];
  public filter: string = '';
  public params: Array<Param> = [];
  public selectionType: string = 'single';

  private _selectedItems: Array<T> = [];
  public get selectedItems(): Array<T> { return this._selectedItems; }
  public set selectedItems(value: Array<T>) {
    this._selectedItems = value;

    if (this.itemList !== null && this.itemList !== undefined) {
      this.itemList.selectedItems = this.selectedItems;
    }
  }

  private _disabledItems: Array<T> = [];
  public get disabledItems(): Array<T> { return this._disabledItems; }
  public set disabledItems(value: Array<T>) {
    this._disabledItems = value;

    if (this.itemList !== null && this.itemList !== undefined) {
      this.itemList.disabledItems = this.disabledItems;
    }
  }

  constructor(public dialogRef: MatDialogRef<GenericSelectionDialog<T,V>>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.params = data?.params;
      this.selectedItems = data?.selectedItems;
      this.selectionType = data?.selectionType;
      this.disabledItems = data?.disabledItems;
  }

  public onSelectionChanged(items: Array<any>) {
    this.items = items;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  public refreshItems() {
    // this.itemList.filter = this.filter;
    this.itemList.resetFilters(this.params);
    this.itemList.refresh(this.params);
  }
}
