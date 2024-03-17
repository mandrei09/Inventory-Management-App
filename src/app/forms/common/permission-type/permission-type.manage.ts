import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PermissionType } from '../../../model/api/common/permission-type';
import { PermissionTypeList } from './permission-type.list';
import { PermissionTypeDetail } from './permission-type.detail';
import { PermissionTypeHttpService } from '../../../services/http/common/permission-type.http.service';
import {MatDialog} from '@angular/material/dialog';
import {TableDefinition} from '../../../model/common/table-definition';
import {TableDefinitionAddEditComponent} from '../table-definition/table-definition-add-edit/table-definition-add-edit.component';
import {PermissionTypeAddEditComponent} from './permission-type-add-edit/permission-type-add-edit.component';

@Component({
    selector: 'permission-type-manage',
    templateUrl: 'permission-type.manage.html',
    styleUrls: ['permission-type.manage.scss'],
    providers: [ ]
})
export class PermissionTypeManage extends GenericManage<PermissionType, number> {

    @ViewChild('permissionTypeDetailModal') permissionTypeDetailModal: ModalDirective;
    @ViewChild('permissionTypeList') permissionTypeList: PermissionTypeList;
    @ViewChild('permissionTypeDetail') permissionTypeDetail: PermissionTypeDetail;

    public filter: string = '';
    isCollapsed: boolean = true;

    constructor(public permissionTypeHttpService: PermissionTypeHttpService,
    public dialog: MatDialog) {
        super();
    }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: PermissionType | null = null) {
    const dialogRef = this.dialog.open(PermissionTypeAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: PermissionType) => {
      if (item !== null) this.refresh();
    });
  }

  public onItemEdit(item: PermissionType) {
    this.onAddEditItem(item);
  }

    public detailInitialize() {
        super.detailInitialize();
        this.permissionTypeDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.permissionTypeDetailModal.hide();
    }

    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));

        this.permissionTypeList.refresh(params);
    }

    public exportToExcel(){

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.permissionTypeHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<PermissionType>) => {

                let options = {
                    sheetid: 'email-type',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                // alasql(`SELECT id as [Id],
                //     code as [Code],
                //     name as [Type]
                //     INTO XLSX("email-type.xlsx",?) FROM ?`, [ options, data.items ]);

            });

    }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
