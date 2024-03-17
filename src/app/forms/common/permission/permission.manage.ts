import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { PermissionDetail as PermissionDetailUI } from "./permission.detail";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppUtils } from '../../../common/app.utils';
import { Permission } from '../../../model/api/common/permission';
import { PermissionList } from './permission.list';
import { PermissionTypeList } from '../permission-type/permission-type.list';
import { PermissionType } from '../../../model/api/common/permission-type';
import { PermissionTypeHttpService } from '../../../services/http/common/permission-type.http.service';
import { PermissionHttpService } from '../../../services/http/common/permission.http.service';
import {PermissionTypeAddEditComponent} from '../permission-type/permission-type-add-edit/permission-type-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import {PermissionAddEditComponent} from './permission-add-edit/permission-add-edit.component';

@Component({
    selector: 'permission-manage',
    templateUrl: 'permission.manage.html',
    styleUrls: ['permission.manage.scss'],
    providers: []
})
export class PermissionManage extends GenericManage<Permission, number> {

    @ViewChild('permissionDetailModal') permissionDetailModal: ModalDirective;
    @ViewChild('permissionList') permissionList: PermissionList;
    @ViewChild('permissionDetail') permissionDetail: PermissionDetailUI;
    @ViewChild('permissionTypeListModal') permissionTypeListModal: ModalDirective;
    @ViewChild('permissionTypeList') permissionTypeList: PermissionTypeList;

    public filter: string = '';
    public selectedPermissionType: PermissionType = null;
    isCollapsed: boolean = true;

    constructor(
      public permissionTypeHttpService: PermissionTypeHttpService,
      public permissionHttpService: PermissionHttpService,
      public dialog: MatDialog
    ) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: Permission | null = null) {
    const dialogRef = this.dialog.open(PermissionAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: Permission) => {
      if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: Permission) {
    this.onAddEditItem(item);
  }

    public detailInitialize() {
        super.detailInitialize();
        this.permissionDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.permissionDetailModal.hide();
    }

    public onPermissionDetailPermissionTypeNeeded() {
        this.permissionDetailModal.hide();
        this.selectPermissionType();
    }

    public onPermissionTypeListCancel() {
        this.permissionTypeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.permissionDetailModal.show();
        }
    }

    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("permissionTypeIds", AppUtils.getIdsList<PermissionType, number>([ this.selectedPermissionType ])));
        this.permissionList.refresh(params);
    }

    public selectPermissionType() {
        this.permissionTypeListModal.show();
        this.permissionTypeList.refresh(null);
    }

    public setSelectedPermissionType() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedPermissionType = this.permissionTypeList.selectedItem;
                this.permissionTypeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.permissionDetail.permissionType = this.permissionTypeList.selectedItem;
                this.permissionTypeListModal.hide();
                this.permissionDetailModal.show();
                break;
        }
    }


    public unselectPermissionType() {
        this.selectedPermissionType = null;
        this.refresh();
    }

    public exportToExcel() {

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.permissionHttpService.get(1, 1000000, 'id', 'asc', params, null).subscribe(
            (data: PagedResult<Permission>) => {

                let options = {
                    sheetid: 'emailManager',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                // let res = alasql(`SELECT id as [Id]
                //                     INTO XLSX("emailManager.xlsx",?) FROM ?`,[ options, data.items ]);

            });
    }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
