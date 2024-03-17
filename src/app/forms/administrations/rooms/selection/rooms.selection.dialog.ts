import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import { RoomListComponent } from '../room.list';
import { RoomHttpService} from '../../../../services/http/administration/room.http.service';
import {Room} from '../../../../model/api/administration/room';

@Component({
  selector: 'rooms-selection-dialog',
  templateUrl: 'rooms.selection.dialog.html',
  styleUrls: ['rooms.selection.dialog.scss']
})
export class RoomsSelectionDialog {

  public itemList!: RoomListComponent;
  @ViewChild(RoomListComponent) set setItemList(itemList: RoomListComponent) {
    this.itemList = itemList;
    if (itemList !== null && itemList !== undefined) { this.refreshItems(); }
  }

  public items: Array<Room> = [];
  public filter: string = '';
  public params: Array<Param> = [];

  constructor(
    public dataSource: RoomHttpService,
    public dialogRef: MatDialogRef<RoomsSelectionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.params = data?.params;
  }

  public onSelectionChanged(items: Array<Room>) {
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

