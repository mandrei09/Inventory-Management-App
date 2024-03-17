import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../model/common/param';
import {EmployeeHttpService} from '../../../services/http/administration/employee.http.service';
import { InvCommittePostion } from '../../../model/api/inventory/inv-committee-position';
import { CommitteePositionsListComponent } from './committee-position.list';
import { CommitteePositionHttpService } from '../../../services/http/inventory/committee-position-detail.http.service';

@Component({
  selector: 'committee-position-selection-dialog',
  templateUrl: 'committee-position.selection.dialog.html',
  styleUrls: ['committee-position.selection.dialog.scss']
})
export class CommitteePostionSelectionDialog {

  public itemList!: CommitteePositionsListComponent;
  @ViewChild(CommitteePositionsListComponent) set setItemList(itemList: CommitteePositionsListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<InvCommittePostion> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: CommitteePositionHttpService,
    public dialogRef: MatDialogRef<CommitteePostionSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<InvCommittePostion>) {
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
