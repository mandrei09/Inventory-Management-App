import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {EmployeeListComponent} from '../employee.list';
import {Employee} from '../../../../model/api/administration/employee';
import {EmployeeHttpService} from '../../../../services/http/administration/employee.http.service';

@Component({
  selector: 'employee-selection-dialog',
  templateUrl: 'employees.selection.dialog.html',
  styleUrls: ['employees.selection.dialog.scss']
})
export class EmployeesSelectionDialog {

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
    public dialogRef: MatDialogRef<EmployeesSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Employee>) {
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
