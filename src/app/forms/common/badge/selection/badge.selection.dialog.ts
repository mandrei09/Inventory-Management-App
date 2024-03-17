import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {Badge} from '../../../../model/api/common/badge';
import {BadgeHttpService} from '../../../../services/http/common/badge.http.service';
import {BadgeList} from '../badge.list';

@Component({
  selector: 'badge-selection-dialog',
  templateUrl: 'badge.selection.dialog.html',
  styleUrls: ['badge.selection.dialog.scss']
})
export class BadgeSelectionDialog {

  public itemList!: BadgeList;
  @ViewChild(BadgeList) set setItemList(itemList: BadgeList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Badge> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: BadgeHttpService,
    public dialogRef: MatDialogRef<BadgeSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Badge>) {
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
