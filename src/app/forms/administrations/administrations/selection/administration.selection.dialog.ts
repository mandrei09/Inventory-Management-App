import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {AdministrationListComponent} from '../administration.list';
import {Administration} from '../../../../model/api/administration/administration';
import {AdministrationHttpService} from '../../../../services/http/administration/administration.http.service';

@Component({
  selector: 'administration-selection-dialog',
  templateUrl: 'administration.selection.dialog.html',
  styleUrls: ['administration.selection.dialog.scss']
})
export class AdministrationSelectionDialog {

  public itemList!: AdministrationListComponent;
  @ViewChild(AdministrationListComponent) set setItemList(itemList: AdministrationListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Administration> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: AdministrationHttpService,
    public dialogRef: MatDialogRef<AdministrationSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Administration>) {
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
