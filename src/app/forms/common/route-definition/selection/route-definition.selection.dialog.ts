import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {TableDefinition} from '../../../../model/common/table-definition';
import {TableDefinitionHttpService} from '../../../../services/http/common/table-definition.http.service';
import {RouteListComponent} from '../route.list';
import {Route} from '../../../../model/api/common/route';
import {RouteHttpService} from '../../../../services/http/common/route.http.service';

@Component({
  selector: 'route-definition-selection-dialog',
  templateUrl: 'route-definition.selection.dialog.html',
  styleUrls: ['route-definition.selection.dialog.scss']
})
export class RouteDefinitionSelectionDialog {

  public itemList!: RouteListComponent;
  @ViewChild(RouteListComponent) set setItemList(itemList: RouteListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Route> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: RouteHttpService,
    public dialogRef: MatDialogRef<RouteDefinitionSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Route>) {
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
