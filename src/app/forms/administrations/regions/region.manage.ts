import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Region } from '../../../model/api/administration/region';
import { Param } from '../../../model/common/param';
import { RegionHttpService } from '../../../services/http/administration/region.http.service';
import { GenericManage } from '../../generic/generic.manage';
import {MatDialog} from '@angular/material/dialog';
import {RegionAddEditComponent} from './region-add-edit/region-add-edit.component';
import { saveAs as fileSaveAs } from 'file-saver-es';
import {DialogService} from '../../../services/dialog.service';
import {RegionListComponent} from './region.list';

@Component({
    selector: 'app-region-manage',
    templateUrl: 'region.manage.html',
    providers: [ RegionHttpService ]
})
export class RegionManageComponent extends GenericManage<Region, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;
    @ViewChild('regionList') regionList: RegionListComponent;

     isCollapsed: boolean = true;
    public filter: string = '';

    constructor(public regionHttpService: RegionHttpService,
                public dialog: MatDialog,
                public dialogService: DialogService
    ) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  onItemDelete(item: Region) {
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
          // this.notificationSvc.success('Asset successfully deleted.');
        }
      });
  }

  public deleteItem(item: Region) {
    const filters = new Array<Param>;

    this.regionHttpService.delete(item.id!).subscribe(() => {
      this.regionList.refresh(filters);
    });
  }

  public onAddEditItem(item: Region | null = null) {
    const dialogRef = this.dialog.open(RegionAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: Region) => {
      if (item !== null) {
        const filters = new Array<Param>;
        this.regionList.refresh(filters);
      }
    });
  }

  public onItemEdit(item: Region) {
    this.onAddEditItem(item);
  }

     public detailInitialize() {
        this.modal.show();
    }

    public detailTerminate() {
        this.modal.hide();
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      return params;
  }

    public export() {
      let params: Array<Param> = null;
      params = this.getFilters();
      this.regionHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'tax.xlsx');
      });
  }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
