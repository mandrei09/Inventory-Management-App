import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {PlantListComponent} from '../plant.list';
import {Plant} from '../../../../model/api/assets/plant';
import {PlantHttpService} from '../../../../services/http/assets/plant.http.service';

@Component({
  selector: 'plants-selection-dialog',
  templateUrl: 'plants.selection.dialog.html',
  styleUrls: ['plants.selection.dialog.scss']
})
export class PlantsSelectionDialog {

  public itemList!: PlantListComponent;
  @ViewChild(PlantListComponent) set setItemList(itemList: PlantListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Plant> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: PlantHttpService,
    public dialogRef: MatDialogRef<PlantsSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Plant>) {
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
