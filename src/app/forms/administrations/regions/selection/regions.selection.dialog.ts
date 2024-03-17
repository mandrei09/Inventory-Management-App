import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {RegionListComponent} from '../region.list';
import {Region} from '../../../../model/api/administration/region';
import {RegionHttpService} from '../../../../services/http/administration/region.http.service';

@Component({
  selector: 'divisions-selection-dialog',
  templateUrl: 'regions.selection.dialog.html',
  styleUrls: ['regions.selection.dialog.scss']
})
export class RegionsSelectionDialog {

  public itemList!: RegionListComponent;
  @ViewChild(RegionListComponent) set setItemList(itemList: RegionListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Region> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: RegionHttpService,
    public dialogRef: MatDialogRef<RegionsSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Region>) {
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
