import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {ActivityList} from '../activity.list';
import {Activity} from '../../../../model/api/assets/activity';
import {ActivityHttpService} from '../../../../services/http/assets/activity.http.service';

@Component({
  selector: 'activities-selection-dialog',
  templateUrl: 'activity.selection.dialog.html',
  styleUrls: ['activity.selection.dialog.scss']
})
export class ActivitySelectionDialog {

  public itemList!: ActivityList;
  @ViewChild(ActivityList) set setItemList(itemList: ActivityList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Activity> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: ActivityHttpService,
    public dialogRef: MatDialogRef<ActivitySelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Activity>) {
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
