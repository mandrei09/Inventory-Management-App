import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {ProjectTypeListComponent} from '../project-type.list';
import {ProjectType} from '../../../../model/api/assets/project-type';
import {ProjectTypeHttpService} from '../../../../services/http/assets/project-type.http.service';

@Component({
  selector: 'project-types-selection-dialog',
  templateUrl: 'project-type.selection.dialog.html',
  styleUrls: ['project-type.selection.dialog.scss']
})
export class ProjectTypeSelectionDialog {

  public itemList!: ProjectTypeListComponent;
  @ViewChild(ProjectTypeListComponent) set setItemList(itemList: ProjectTypeListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<ProjectType> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: ProjectTypeHttpService,
    public dialogRef: MatDialogRef<ProjectTypeSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<ProjectType>) {
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
