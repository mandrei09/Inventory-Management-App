import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {DivisionListComponent} from '../division.list';
import {Division} from '../../../../model/api/administration/division';
import {DivisionHttpService} from '../../../../services/http/administration/division.http.service';

@Component({
  selector: 'divisions-selection-dialog',
  templateUrl: 'divisions.selection.dialog.html',
  styleUrls: ['divisions.selection.dialog.scss']
})
export class DivisionsSelectionDialog {

  public itemList!: DivisionListComponent;
  @ViewChild(DivisionListComponent) set setItemList(itemList: DivisionListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Division> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: DivisionHttpService,
    public dialogRef: MatDialogRef<DivisionsSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Division>) {
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
