import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {AccountList} from '../account.list';
import {Account} from '../../../../model/api/administration/account';
import { AccountHttpService } from '../../../../services/http/administration/account.http.service';

@Component({
  selector: 'accounts-selection-dialog',
  templateUrl: 'account.selection.dialog.html',
  styleUrls: ['account.selection.dialog.scss']
})
export class AccountSelectionDialog {

  public itemList!: AccountList;
  @ViewChild(AccountList) set setItemList(itemList: AccountList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Account> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: AccountHttpService,
    public dialogRef: MatDialogRef<AccountSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Account>) {
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
