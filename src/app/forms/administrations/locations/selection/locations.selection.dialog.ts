import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {LocationListComponent} from '../location.list';
import {LocationHttpService} from '../../../../services/http/administration/location.http.service';
import {Location} from '../../../../model/api/administration/location';

@Component({
  selector: 'divisions-selection-dialog',
  templateUrl: 'locations.selection.dialog.html',
  styleUrls: ['locations.selection.dialog.scss']
})
export class LocationsSelectionDialog {

  public itemList!: LocationListComponent;
  @ViewChild(LocationListComponent) set setItemList(itemList: LocationListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Location> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: LocationHttpService,
    public dialogRef: MatDialogRef<LocationsSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Location>) {
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
