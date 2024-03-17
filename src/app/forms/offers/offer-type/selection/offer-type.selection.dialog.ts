import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {OfferTypeListComponent} from '../offer-type.list';
import {OfferType} from '../../../../model/api/offer/offer-type';
import {OfferTypeHttpService} from '../../../../services/http/offfers/offer-type.http.service';

@Component({
  selector: 'offer-type-selection-dialog',
  templateUrl: 'offer-type.selection.dialog.html',
  styleUrls: ['offer-type.selection.dialog.scss']
})
export class OfferTypeSelectionDialog {

  public itemList!: OfferTypeListComponent;
  @ViewChild(OfferTypeListComponent) set setItemList(itemList: OfferTypeListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<OfferType> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: OfferTypeHttpService,
    public dialogRef: MatDialogRef<OfferTypeSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<OfferType>) {
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
