import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { DeviceTypeHttpService } from '../../../services/http/common/device-type.http.service';
import { DeviceType } from '../../../model/api/common/device-type';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {MatDialog} from '@angular/material/dialog';
import {DictionaryType} from '../../../model/api/administration/dictionary-type';
import {DictionaryTypeAddEditComponent} from '../../administrations/dictionary-type/dictionary-type-add-edit/dictionary-type-add-edit.component';
import {DeviceTypeAddEditComponent} from './device-type-add-edit/device-type-add-edit.component';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'device-type-manage',
    templateUrl: 'device-type.manage.html',
    providers: [ DeviceTypeHttpService ]
})
export class DeviceTypeManage extends GenericManage<DeviceType, number> {

    @ViewChild('itemDetailModal') modal: ModalDirective;

    isCollapsed: boolean = true;
    public filter: string = '';

    constructor(public deviceTypeHttpService: DeviceTypeHttpService,
    public dialog: MatDialog) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: DeviceType | null = null) {
    const dialogRef = this.dialog.open(DeviceTypeAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: DeviceType) => {
      // if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: DeviceType) {
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
      this.deviceTypeHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'tip dispozitive.xlsx');
      });
  }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
