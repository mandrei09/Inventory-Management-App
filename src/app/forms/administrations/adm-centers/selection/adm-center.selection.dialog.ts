import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {AdmCenterListComponent} from '../adm-center.list';
import {AdmCenter} from '../../../../model/api/administration/adm-center';
import {AdmCenterHttpService} from '../../../../services/http/administration/adm-center.http.service';

@Component({
  selector: 'adm-centers-selection-dialog',
  templateUrl: 'adm-center.selection.dialog.html',
  styleUrls: ['adm-center.selection.dialog.scss']
})
export class AdmCenterSelectionDialog {

  public itemList!: AdmCenterListComponent;
  @ViewChild(AdmCenterListComponent) set setItemList(itemList: AdmCenterListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<AdmCenter> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: AdmCenterHttpService,
    public dialogRef: MatDialogRef<AdmCenterSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<AdmCenter>) {
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
