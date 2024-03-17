import {Component, Inject, Injectable, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../model/common/param';
import {UserListComponent} from '../user.list';
import {IdentityService} from '../../../services/identity.service';

@Component({
  selector: 'identity-selection-dialog',
  templateUrl: 'identity.selection.dialog.html',
  styleUrls: ['identity.selection.dialog.scss']
})
export class IdentitySelectionDialog {

  public itemList!: UserListComponent;
  @ViewChild(UserListComponent) set setItemList(itemList: UserListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<any> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: IdentityService,
    public dialogRef: MatDialogRef<IdentitySelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<any>) {
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
