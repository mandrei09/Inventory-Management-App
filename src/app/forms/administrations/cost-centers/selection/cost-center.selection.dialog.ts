import { Component, Inject, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {CostCenterListComponent} from '../cost-center.list';
import {CostCenter} from '../../../../model/api/administration/cost-center';
import {CostCenterHttpService} from '../../../../services/http/administration/cost-center.http.service';

@Component({
  selector: 'cost-centers-selection-dialog',
  templateUrl: 'cost-center.selection.dialog.html',
  styleUrls: ['cost-center.selection.dialog.scss']
})
export class CostCenterSelectionDialog {

  public itemList!: CostCenterListComponent;

  @ViewChild(CostCenterListComponent) set setItemList(itemList: CostCenterListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<CostCenter> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: CostCenterHttpService,
    public dialogRef: MatDialogRef<CostCenterSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<CostCenter>) {
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
