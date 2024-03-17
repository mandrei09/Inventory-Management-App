import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import { CityHttpService } from '../../../../services/http/administration/city.http.service';
import {CityListComponent} from '../city.list';
import {City} from '../../../../model/api/administration/city';

@Component({
  selector: 'cities-selection-dialog',
  templateUrl: 'cities.selection.dialog.html',
  styleUrls: ['cities.selection.dialog.scss']
})
export class CitiesSelectionDialog {

  public itemList!: CityListComponent;
  @ViewChild(CityListComponent) set setItemList(itemList: CityListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<City> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: CityHttpService,
    public dialogRef: MatDialogRef<CitiesSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<City>) {
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
