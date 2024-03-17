import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {EmailTypeList} from '../email-type.list';
import {EmailType} from '../../../../model/api/administration/email-type';
import {EmailTypeHttpService} from '../../../../services/http/administration/email-type.http.service';

@Component({
  selector: 'email-type-selection-dialog',
  templateUrl: 'email-type.selection.dialog.html',
  styleUrls: ['email-type.selection.dialog.scss']
})
export class EmailTypeSelectionDialog {

  public itemList!: EmailTypeList;
  @ViewChild(EmailTypeList) set setItemList(itemList: EmailTypeList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<EmailType> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: EmailTypeHttpService,
    public dialogRef: MatDialogRef<EmailTypeSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<EmailType>) {
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
