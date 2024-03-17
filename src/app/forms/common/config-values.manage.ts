import { ConfigValuesHttpService } from './../../services/http/common/config-values.service';
import { PagedResult } from './../../model/common/paged-result';
import { Param } from './../../model/common/param';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../generic/generic.manage';
import { ConfigValue } from '../../model/api/common/config-value';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CostCenterListComponent } from '../administrations/cost-centers/cost-center.list';
import { RoleList } from '../auth/role.list';
import { RoleEntity } from '../../model/api/common/role-entity';
import { RoleService } from '../../services/http/identity/role.service';
import { ConfigValuesDetail } from './config-values.detail';
import {ConfigValuesAddEditComponent} from './config-values-add-edit/config-values-add-edit.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'config-values-manage',
    templateUrl: 'config-values.manage.html',
    providers: [ ConfigValuesHttpService],

})
export class ConfigValuesManage extends GenericManage<ConfigValue, number> {

    @ViewChild('configValueDetail') public configValueDetail: ConfigValuesDetail;
    @ViewChild('configValueList') public configValueList: CostCenterListComponent;
    @ViewChild('configValueDetailModal') configValueDetailModal: ModalDirective;
    @ViewChild('roleListModal') roleListModal: ModalDirective;
    @ViewChild('roleList') roleList: RoleList;


    @ViewChild('fileInput') fileInput: ElementRef;

    public filter: string = '';
    public selectedRole: RoleEntity = null;
    isCollapsed: boolean = true;

    constructor(
      public dialog: MatDialog,
      public configValuesHttpService: ConfigValuesHttpService,
      public roleHttpService: RoleService
    ) {
        super();
    }

    public download() {
        // this.configValuesHttpService.download().subscribe((blob) => {
        //     fileSaveAs(blob, 'config_values.json');
        // });
    }

    upload() {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            this.configValuesHttpService
                .upload(fileToUpload)
                .subscribe(res => {
                    //this.uploadFinished.emit(null);
                });
        }
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: ConfigValue | null = null) {
      let dialogRef = this.dialog.open(ConfigValuesAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: ConfigValue) => {
        if (item !== null) this.refresh();
      });
    }

    public onItemEdit(item: ConfigValue) {
      this.onAddEditItem(item);
    }

    public detailInitialize() {
        super.detailInitialize();
        this.configValueDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.configValueDetailModal.hide();
    }

    public onConfigValueDetailRoleNeeded() {
        this.configValueDetailModal.hide();
        this.selectRole();
    }

    public onRoleListCancel() {
        this.roleListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.configValueDetailModal.show();
        }
    }

    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("roleIds", this.selectedRole != null ? this.selectedRole.id : null ));
        this.configValueList.refresh(params);
    }

    public selectRole() {
        this.roleListModal.show();
        this.roleList.refresh(null);
    }

    public setSelectedRole() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedRole = this.roleList.selectedItem;
                this.roleListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.configValueDetail.role = this.roleList.selectedItem;
                this.roleListModal.hide();
                this.configValueDetailModal.show();
                break;
        }
    }

    public unselectRole() {
        this.selectedRole = null;
        this.refresh();
    }

    public exportToExcel() {

        let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.configValuesHttpService.get(1, 1000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<ConfigValue>) => {

                let options = {
                    sheetid: 'CostCenters',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                // alasql(`SELECT id as [Id],
                //     code as [Cod],
                //     description as [Descriere],
                //     [valueType] as [Tip],
                //     numericValue as [Valoare numerica],
                //     textValue as [Valoare text],
                //     dateValue as [Valoare data],
                //     boolValue as [Valoare bool]

                //     INTO XLSX("configValues.xlsx",?) FROM ?`, [ options,  data.items ]);

            });
    }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
