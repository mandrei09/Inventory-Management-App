import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {EmployeeListComponent} from '../employee.list';
import {Employee} from '../../../../model/api/administration/employee';
import {EmployeeHttpService} from '../../../../services/http/administration/employee.http.service';

@Component({
  selector: 'map-substitute-employee-dialog',
  templateUrl: 'map-substitute-employee.selection.dialog.html',
  styleUrls: ['map-substitute-employee.selection.dialog.scss']
})
export class MapSubstituteEmployeeSelectionDialog {

  public startDate: Date | null = null;
  public endDate: Date | null = null;

  public itemList!: EmployeeListComponent;
  @ViewChild(EmployeeListComponent) set setItemList(itemList: EmployeeListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Employee> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: EmployeeHttpService,
    public dialogRef: MatDialogRef<MapSubstituteEmployeeSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Employee>) {
    this.items = items;
  }

  onCancel(): void {
    this.dialogRef.close({'startDate': 'ds', 'endDate': 'da'});
  }

  public refreshItems() {
    this.itemList.resetFilters(this.params);
    this.itemList.refresh(this.params);
  }
}
