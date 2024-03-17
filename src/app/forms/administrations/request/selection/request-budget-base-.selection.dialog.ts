import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {RequestList} from '../request.list';
import {Request} from '../../../../model/api/administration/request';
import {RequestHttpService} from '../../../../services/http/administration/request.http.service';

@Component({
  selector: 'request-budget-base-selection-dialog',
  templateUrl: 'request-budget-base.selection.dialog.html',
  styleUrls: ['request-budget-base.selection.dialog.scss']
})
export class RequestBudgetBaseSelectionDialog {

  public itemList!: RequestList;
  @ViewChild(RequestList) set setItemList(itemList: RequestList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Request> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: RequestHttpService,
    public dialogRef: MatDialogRef<RequestBudgetBaseSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Request>) {
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
