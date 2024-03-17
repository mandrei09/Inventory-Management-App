import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {OfferList} from '../offer.list';
import {Offer} from '../../../../model/api/administration/offer';
import {OfferHttpService} from '../../../../services/http/administration/offer.http.service';

@Component({
  selector: 'offer-selection-dialog',
  templateUrl: 'offer.selection.dialog.html',
  styleUrls: ['offer.selection.dialog.scss']
})
export class OfferSelectionDialog {

  public itemList!: OfferList;
  @ViewChild(OfferList) set setItemList(itemList: OfferList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<any> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: OfferHttpService,
    public dialogRef: MatDialogRef<OfferSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<any>) {
    this.items = items;
    console.log(items);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  public refreshItems() {
    this.itemList.resetFilters(this.params);
    this.itemList.refresh(this.params);
  }
}
