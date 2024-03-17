import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {ProjectList} from '../project.list';
import {Project} from '../../../../model/api/assets/project';
import {ProjectHttpService} from '../../../../services/http/assets/project.http.service';

@Component({
  selector: 'projects-selection-dialog',
  templateUrl: 'project.selection.dialog.html',
  styleUrls: ['project.selection.dialog.scss']
})
export class ProjectSelectionDialog {

  public itemList!: ProjectList;
  @ViewChild(ProjectList) set setItemList(itemList: ProjectList) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Project> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: ProjectHttpService,
    public dialogRef: MatDialogRef<ProjectSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Project>) {
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
