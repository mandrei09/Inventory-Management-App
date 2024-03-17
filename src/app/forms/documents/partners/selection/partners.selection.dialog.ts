import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {PartnerListComponent} from '../partner.list';
import {Partner} from '../../../../model/api/documents/partner';
import {PartnerHttpService} from '../../../../services/http/documents/partner.http.service';

@Component({
  selector: 'partners-selection-dialog',
  templateUrl: 'partners.selection.dialog.html',
  styleUrls: ['partners.selection.dialog.scss']
})
export class PartnersSelectionDialog {

  public itemList!: PartnerListComponent;
  @ViewChild(PartnerListComponent) set setItemList(itemList: PartnerListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Partner> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: PartnerHttpService,
    public dialogRef: MatDialogRef<PartnersSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Partner>) {
    this.items = items;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  public refreshItems() {
    this.itemList.resetFilters(this.params);
    this.itemList.refresh(this.params);``
  }
}
