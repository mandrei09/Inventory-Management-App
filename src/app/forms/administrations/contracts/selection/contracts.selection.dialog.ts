import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {ContractListComponent} from '../contract.list';
import {ContractHttpService} from '../../../../services/http/administration/contract.http.service';
import {Contract} from '../../../../model/api/administration/contract';

@Component({
  selector: 'contracts-selection-dialog',
  templateUrl: 'contracts.selection.dialog.html',
  styleUrls: ['contracts.selection.dialog.scss']
})
export class ContractsSelectionDialog {

  public itemList!: ContractListComponent;
  @ViewChild(ContractListComponent) set setItemList(itemList: ContractListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Contract> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: ContractHttpService,
    public dialogRef: MatDialogRef<ContractsSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Contract>) {
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
