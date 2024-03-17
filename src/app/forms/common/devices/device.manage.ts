import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { DeviceList } from './device.list';
import { DeviceTypeHttpService } from '../../../services/http/common/device-type.http.service';
import { DeviceHttpService } from '../../../services/http/common/device.http.service';
import { DeviceDetailHttpService } from '../../../services/http/common/device-detail.http.service';
import { Pocket } from '../../../model/api/common/device';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DeviceType } from '../../../model/api/common/device-type';
import { AppUtils } from '../../../common/app.utils';
import {MatDialog} from '@angular/material/dialog';
import {DeviceAddEditComponent} from './device-add-edit/device-add-edit.component';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'device-manage',
    templateUrl: 'device.manage.html',
    providers: [ DeviceTypeHttpService, DeviceHttpService, DeviceDetailHttpService ]
})
export class DeviceManage extends GenericManage<Pocket, number> {

    @ViewChild('deviceDetailModal') deviceDetailModal: ModalDirective;
    @ViewChild('deviceList') deviceList: DeviceList;

    public filter: string = '';
    public selectedDeviceType: DeviceType = null;
    isCollapsed: boolean = true;

    constructor(
        public deviceTypeHttpService: DeviceTypeHttpService,
        public deviceHttpService: DeviceHttpService,
        public deviceDetailHttpService: DeviceDetailHttpService,
        public dialog: MatDialog) {
      super();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: Pocket | null = null) {
      const dialogRef = this.dialog.open(DeviceAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: Pocket) => {
        if (item !== null) this.refresh();
      });
    }

    public onItemEdit(item: Pocket) {
      this.onAddEditItem(item);
    }

    public detailTerminate() {
        super.detailTerminate();
        this.deviceDetailModal.hide();
    }

    public onDeviceDetailDeviceTypeNeeded() {
        this.deviceDetailModal.hide();
        // this.selectDeviceType();
    }

    public onDeviceTypeListCancel() {
        // this.deviceTypeListModal.hide();
        // if (this.viewMode === GenericManageViewMode.ItemDetail) {
        //     this.deviceDetailModal.show();
        // }
    }

    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('deviceTypeIds', AppUtils.getIdsList<DeviceType, number>([ this.selectedDeviceType ])));

        this.deviceList.refresh(params);
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      // params.push(new Param('filter', this.filter));
      // params.push(new Param('accountIds', AppUtils.getIdsList<Account, number>([ this.selectedAccount ])));
      // params.push(new Param('expAccountIds', AppUtils.getIdsList<ExpAccount, number>([ this.selectedExpAccount ])));
      // params.push(new Param('assetCategoryIds', AppUtils.getIdsList<AssetCategory, number>([ this.selectedAssetCategory ])));
      // params.push(new Param('subCategoryIds', AppUtils.getIdsList<SubCategory, number>([ this.selectedSubCategory ])));
      // params.push(new Param('subCategoryENIds', AppUtils.getIdsList<SubCategoryEN, number>([ this.selectedSubCategoryEN ])));
      // params.push(new Param('subTypeIds', AppUtils.getIdsList<SubType, number>([ this.selectedSubType ])));

      return params;
  }

    public export() {
      let params: Array<Param> = null;
      params = this.getFilters();
      this.deviceHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'dispozitive.xlsx');
      });
  }
}
