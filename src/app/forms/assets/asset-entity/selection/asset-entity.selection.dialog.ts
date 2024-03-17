import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {AssetEntityListComponent} from '../../assets/asset-entity.list';
import {AssetEntity} from '../../../../model/api/common/asset-entity';
import {AssetHttpService} from '../../../../services/http/assets/asset.http.service';
import {MapTempsFilter} from '../../../../model/api/assets/map-temps-filter';
import {AssetFilter} from '../../../../model/api/assets/asset.filter';

@Component({
  selector: 'asset-entity-selection-dialog',
  templateUrl: 'asset-entity.selection.dialog.html',
  styleUrls: ['asset-entity.selection.dialog.scss']
})
export class AssetEntitySelectionDialog {

  public itemList!: AssetEntityListComponent;

  private _showAsignedTemp: boolean | undefined;
  public get showAsignedTemp(): boolean | undefined { return this._showAsignedTemp; }
  public set showAsignedTemp(value: boolean | undefined) {
    this._showAsignedTemp = value;

    // if (value === true) {
    //   this.onshowAsignedTemp(true);
    // } else {
    //   this.onshowAsignedTemp(false);
    // }
    this.refreshItems();
  }
  @ViewChild(AssetEntityListComponent) set setItemList(itemList: AssetEntityListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<AssetEntity> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: AssetHttpService,
    public dialogRef: MatDialogRef<AssetEntitySelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onshowAsignedTemp(filter: boolean) {
    this.showAsignedTemp = filter;
    this.refreshItems();
  }

  public getMapTempFilter(): MapTempsFilter {
    let filter: string | undefined;
    let showAsignedTemp: boolean | undefined;

    let mapTempsFilter: MapTempsFilter;

    showAsignedTemp = this.showAsignedTemp;

    mapTempsFilter = new MapTempsFilter(
      filter,
      showAsignedTemp,
    );

    return mapTempsFilter;
  }

  public onSelectionChanged(items: Array<AssetEntity>) {
    this.items = items;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  public refreshItems() {
    // const mapTempsFilter: MapTempsFilter = this.getMapTempFilter();
    //
    // this.params.push(new Param('jsonFilter', JSON.stringify(mapTempsFilter)));

    this.itemList.resetFilters(this.params);
    this.itemList.refresh(this.params);
  }
}
