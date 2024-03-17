import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {InterCompanyEN} from '../../../../model/api/assets/inter-company-en';
import {InterCompanyENHttpService} from '../../../../services/http/assets/inter-company-en.http.service';
import {InterCompanyENListComponent} from '../inter-company-en.list';

@Component({
  selector: 'inter-company-en-selection-dialog',
  templateUrl: 'inter-company-en.selection.dialog.html',
  styleUrls: ['inter-company-en.selection.dialog.scss']
})
export class InterCompanyEnSelectionDialog {

  public itemList!: InterCompanyENListComponent;
  @ViewChild(InterCompanyENListComponent) set setItemList(itemList: InterCompanyENListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<InterCompanyEN> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: InterCompanyENHttpService,
    public dialogRef: MatDialogRef<InterCompanyEnSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<InterCompanyEN>) {
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
