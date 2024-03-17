import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {UomListComponent} from '../uom.list';
import {Uom} from '../../../../model/api/assets/uom';
import {UomHttpService} from '../../../../services/http/assets/uom.http.service';

@Component({
  selector: 'uom-selection-dialog',
  templateUrl: 'uom.selection.dialog.html',
  styleUrls: ['uom.selection.dialog.scss']
})
export class UomSelectionDialog {

  public itemList!: UomListComponent;
  @ViewChild(UomListComponent) set setItemList(itemList: UomListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Uom> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: UomHttpService,
    public dialogRef: MatDialogRef<UomSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Uom>) {
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
