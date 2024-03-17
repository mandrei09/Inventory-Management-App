import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {AppStateListComponent} from '../app-state.list';
import {AppState} from '../../../../model/api/common/app-state';
import {AppStateHttpService} from '../../../../services/http/common/app-state.http.service';

@Component({
  selector: 'app-states-selection-dialog',
  templateUrl: 'app-state.selection.dialog.html',
  styleUrls: ['app-state.selection.dialog.scss']
})
export class AppStateSelectionDialog {

  public itemList!: AppStateListComponent;
  @ViewChild(AppStateListComponent) set setItemList(itemList: AppStateListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<AppState> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: AppStateHttpService,
    public dialogRef: MatDialogRef<AppStateSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<AppState>) {
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
