import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {InvStateList} from '../inv-state.list';
import {InvState} from '../../../../model/api/inventory/inv-state';
import {InvStateHttpService} from '../../../../services/http/inventory/inv-state.http.service';
import {Param} from '../../../../model/common/param';

@Component({
  selector: 'inv-states-selection-dialog',
  templateUrl: 'inv-state.selection.dialog.html',
  styleUrls: ['inv-state.selection.dialog.scss']
})
export class InvStateSelectionDialog {

  public itemList!: InvStateList;
  
  @ViewChild(InvStateList) set setItemList(itemList: InvStateList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<InvState> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: InvStateHttpService,
    public dialogRef: MatDialogRef<InvStateSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<InvState>) {
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
