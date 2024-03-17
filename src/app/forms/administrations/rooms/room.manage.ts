import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';

import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { Location } from '../../../model/api/administration/location';
import { Room } from '../../../model/api/administration/room';
import { RoomHttpService } from '../../../services/http/administration/room.http.service';
import { RoomDetailHttpService } from '../../../services/http/administration/room-detail.http.service';
import { RoomDetailComponent as RoomDetailUI } from './room.detail';
import { LocationHttpService } from '../../../services/http/administration/location.http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { RoomListComponent } from './room.list';
import { LocationListComponent } from '../locations/location.list';
import { AppUtils } from '../../../common/app.utils';
import {RoomAddEditComponent} from './room-add-edit/room-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../../../services/dialog.service';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'app-room-manage',
    templateUrl: 'room.manage.html',
    styleUrls: ['room.manage.scss'],
    providers: [ LocationHttpService, RoomHttpService, RoomDetailHttpService ]
})
export class RoomManageComponent extends GenericManage<Room, number> {

    @ViewChild('roomDetailModal') roomDetailModal: ModalDirective;
    @ViewChild('roomList') roomList: RoomListComponent;
    @ViewChild('roomDetail') roomDetail: RoomDetailUI;
    @ViewChild('locationListModal') locationListModal: ModalDirective;
    @ViewChild('locationList') locationList: LocationListComponent;

    public filter: string = '';
    public selectedLocation: Location = null;
    isCollapsed: boolean = true;

    constructor(
      public dialog: MatDialog,
      public locationHttpService: LocationHttpService,
      public roomHttpService: RoomHttpService,
      public roomDetailHttpService: RoomDetailHttpService,
      private dialogService: DialogService,
    ) {
        super();
    }

    public onAddNew() {
      this.onAddEditItem();
    }
    public onAddEditItem(item: Room | null = null) {
      let dialogRef = this.dialog.open(RoomAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: Room) => {
        if (item !== null) this.refresh();
      });
    }

    public onItemEdit(item: Room) {
      this.onAddEditItem(item);
  }

    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        // params.push(new Param("locationIds", AppUtils.getIdsList<Location, number>([ this.selectedLocation ])));

        this.roomList.refresh(params);
    }

    public selectLocation() {
        this.locationListModal.show();
        this.locationList.refresh(null);
    }

    public setSelectedLocation() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedLocation = this.locationList.selectedItem;
                this.locationListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.roomDetail.location = this.locationList.selectedItem;
                this.locationListModal.hide();
                this.roomDetailModal.show();
                break;
        }
    }

    public unselectLocation() {
        this.selectedLocation = null;
        this.refresh();
    }

    // public exportToExcel() {

    //      let params: Array<Param> = null;

    //     if ((this.filter != null) && (this.filter.length > 0)) {
    //         params = new Array<Param>();
    //         params.push(new Param('filter', this.filter));
    //     }

    //     this.roomDetailHttpService.get(1, 1000000, 'code', 'asc', params, null).subscribe(
    //         (data: PagedResult<Room>) => {

    //             let options = {
    //                 sheetid: 'Adrese',
    //                 headers: true,
    //                 column: { style: { Font: { Bold: '1' } } },
    //                 rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //                 cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //             };

    //             let res = alasql(`SELECT id as [Id],
    //                                 code as [Cod],
    //                                 name as [Denumire],
    //                                 location->name as [Oras],
    //                                 region->name as [Judet]
    //                                 INTO XLSX("Adrese.xlsx",?) FROM ?`,[ options, data.items ]);

    //         });
    // }

    public getFilters(): Array<Param> {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        params.push(new Param('locationIds', AppUtils.getIdsList<Location, number>([this.selectedLocation])));

        return params;
    }

    public export() {
      let params: Array<Param> = null;
      params = this.getFilters();
      this.roomHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'tax.xlsx');
      });
  }

  public onItemDelete(item: Room) {
    this.dialogService
      .confirmDialog({
        title: 'Confirm Action',
        message: 'Do you want to confirm this action?',
        confirmCaption: 'Confirm',
        cancelCaption: 'Cancel',
      })
      .subscribe((confirmed: any) => {
        if (confirmed) {
          this.deleteItem(item);
          // this.notificationSvc.success('Location successfully deleted.');
        }
      });
  }

  public deleteItem(item: Room) {
    // this.dataSource.delete(item.id!).subscribe(() => {
    //   this.refreshItems();
    // });
  }

}
