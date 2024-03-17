import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {ExpAccountList} from '../exp-account.list';
import {ExpAccount} from '../../../../model/api/administration/exp-account';
import {ExpAccountHttpService} from '../../../../services/http/administration/exp-account.http.service';

@Component({
  selector: 'exp-accounts-selection-dialog',
  templateUrl: 'exp-account.selection.dialog.html',
  styleUrls: ['exp-account.selection.dialog.scss']
})
export class ExpAccountSelectionDialog {

  public itemList!: ExpAccountList;
  @ViewChild(ExpAccountList) set setItemList(itemList: ExpAccountList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<ExpAccount> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: ExpAccountHttpService,
    public dialogRef: MatDialogRef<ExpAccountSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<ExpAccount>) {
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
