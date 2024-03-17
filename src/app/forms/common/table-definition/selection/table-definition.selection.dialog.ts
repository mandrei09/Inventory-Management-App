import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {TableDefinitionListComponent} from '../table-definition.list';
import {TableDefinition} from '../../../../model/common/table-definition';
import {TableDefinitionHttpService} from '../../../../services/http/common/table-definition.http.service';

@Component({
  selector: 'table-definitions-selection-dialog',
  templateUrl: 'table-definition.selection.dialog.html',
  styleUrls: ['table-definition.selection.dialog.scss']
})
export class TableDefinitionSelectionDialog {

  public itemList!: TableDefinitionListComponent;
  @ViewChild(TableDefinitionListComponent) set setItemList(itemList: TableDefinitionListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<TableDefinition> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: TableDefinitionHttpService,
    public dialogRef: MatDialogRef<TableDefinitionSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<TableDefinition>) {
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
