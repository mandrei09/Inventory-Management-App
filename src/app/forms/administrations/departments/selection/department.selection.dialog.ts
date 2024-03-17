import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {DepartmentListComponent} from '../department.list';
import {Department} from '../../../../model/api/administration/department';
import {DepartmentHttpService} from '../../../../services/http/administration/department.http.service';

@Component({
  selector: 'departments-selection-dialog',
  templateUrl: 'department.selection.dialog.html',
  styleUrls: ['department.selection.dialog.scss']
})
export class DepartmentSelectionDialog {

  public itemList!: DepartmentListComponent;
  @ViewChild(DepartmentListComponent) set setItemList(itemList: DepartmentListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) 
    { 
      this.refreshItems(); 
    }
  }

  public items: Array<Department> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: DepartmentHttpService,
    public dialogRef: MatDialogRef<DepartmentSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Department>) {
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
