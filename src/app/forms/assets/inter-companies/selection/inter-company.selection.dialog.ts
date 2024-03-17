import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {InterCompanyListComponent} from '../inter-company.list';
import {InterCompany} from '../../../../model/api/assets/inter-company';
import {InterCompanyHttpService} from '../../../../services/http/assets/inter-company.http.service';

@Component({
  selector: 'inter-company-selection-dialog',
  templateUrl: 'inter-company.selection.dialog.html',
  styleUrls: ['inter-company.selection.dialog.scss']
})
export class InterCompanySelectionDialog {

  public itemList!: InterCompanyListComponent;
  @ViewChild(InterCompanyListComponent) set setItemList(itemList: InterCompanyListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<InterCompany> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: InterCompanyHttpService,
    public dialogRef: MatDialogRef<InterCompanySelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<InterCompany>) {
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
