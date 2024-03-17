import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {TaxListComponent} from '../tax.list';
import {Tax} from '../../../../model/api/assets/tax';
import {TaxHttpService} from '../../../../services/http/assets/tax.http.service';

@Component({
  selector: 'taxselection-dialog',
  templateUrl: 'tax.selection.dialog.html',
  styleUrls: ['tax.selection.dialog.scss']
})
export class TaxSelectionDialog {

  public itemList!: TaxListComponent;
  @ViewChild(TaxListComponent) set setItemList(itemList: TaxListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Tax> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: TaxHttpService,
    public dialogRef: MatDialogRef<TaxSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Tax>) {
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
