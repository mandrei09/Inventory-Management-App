import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {CountryListComponent} from '../country.list';
import {Country} from '../../../../model/api/administration/country';
import {CountryHttpService} from '../../../../services/http/administration/contry.http.service';

@Component({
  selector: 'divisions-selection-dialog',
  templateUrl: 'countries.selection.dialog.html',
  styleUrls: ['countries.selection.dialog.scss']
})
export class CountriesSelectionDialog {

  public itemList!: CountryListComponent;
  @ViewChild(CountryListComponent) set setItemList(itemList: CountryListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Country> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: CountryHttpService,
    public dialogRef: MatDialogRef<CountriesSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Country>) {
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
