import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import { ProjectTypeDivisionListComponent } from '../project-type-division.list';
import {ProjectTypeDivisionHttpService} from './../../../../services/http/administration/project-type-division.http.service';
import { ProjectTypeDivision } from '../../../../model/api/administration/project-type-division';

@Component({
  selector: 'project-type-divisions-selection-dialog',
  templateUrl: 'project-type-division.selection.dialog.html',
  styleUrls: ['project-type-division.selection.dialog.scss']
})
export class ProjectTypeDivisionSelectionDialog {

  public itemList!: ProjectTypeDivisionListComponent;
  @ViewChild(ProjectTypeDivisionListComponent) set setItemList(itemList: ProjectTypeDivisionListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<ProjectTypeDivision> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: ProjectTypeDivisionHttpService,
    public dialogRef: MatDialogRef<ProjectTypeDivisionSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<ProjectTypeDivision>) {
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
