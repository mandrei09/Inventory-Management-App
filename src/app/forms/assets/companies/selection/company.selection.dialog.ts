import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {CompanyListComponent} from '../company.list';
import {Company} from '../../../../model/api/assets/company';
import {CompanyHttpService} from '../../../../services/http/assets/company.http.service';

@Component({
  selector: 'company-selection-dialog',
  templateUrl: 'company.selection.dialog.html',
  styleUrls: ['company.selection.dialog.scss']
})
export class CompanySelectionDialog {

  public itemList!: CompanyListComponent;
  @ViewChild(CompanyListComponent) set setItemList(itemList: CompanyListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Company> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: CompanyHttpService,
    public dialogRef: MatDialogRef<CompanySelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Company>) {
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
