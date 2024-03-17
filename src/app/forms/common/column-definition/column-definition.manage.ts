import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppUtils } from '../../../common/app.utils';
import { TableDefinitionListComponent } from '../table-definition/table-definition.list';
import { ColumnDefinitionDetail } from './column-definition.detail';
import { ColumnDefinitionListComponent } from './column-definition.list';
import { ColumnDefinitionHttpService } from '../../../services/http/common/column-definition.http.service';
import { TableDefinitionHttpService } from '../../../services/http/common/table-definition.http.service';
import { TableDefinition } from '../../../model/common/table-definition';
import { ColumnDefinition } from '../../../model/common/column-definition';
import { RoleList } from '../../auth/role.list';
import { RoleEntity } from '../../../model/api/common/role-entity';
import { RoleService } from '../../../services/http/identity/role.service';
import {ColumnDefinitionAddEditComponent} from './column-definition-add-edit/column-definition-add-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-column-definition',
    templateUrl: 'column-definition.manage.html',
    styleUrls: ['column-definition.manage.scss']
})
export class ColumnDefinitionManageComponent extends GenericManage<ColumnDefinition, number> {

    public _tableDefinition: TableDefinition = null;
    public get tableDefinition(): TableDefinition { return this._tableDefinition; }
    public set tableDefinition(value: TableDefinition) {
      this._tableDefinition = value;

      this.setSelectedTableDefinition(value);
    }

    public _roles: RoleEntity = null;
    public get roles(): RoleEntity { return this._roles; }
    public set roles(value: RoleEntity) {
      this._roles = value;

      this.setSelectedRole(value);
    }

    @ViewChild('columnDefinitionDetailModal') public columnDefinitionDetailModal: ModalDirective;
    @ViewChild('columnDefinitionList') public columnDefinitionList: ColumnDefinitionListComponent;
    @ViewChild('columnDefinitionDetail') public columnDefinitionDetail: ColumnDefinitionDetail;
    @ViewChild('tableDefinitionListModal') public tableDefinitionListModal: ModalDirective;
    @ViewChild('tableDefinitionList') public tableDefinitionList: TableDefinitionListComponent;
    @ViewChild('roleListModal') roleListModal: ModalDirective;
    @ViewChild('roleList') roleList: RoleList;
    @ViewChild('roleCloneListModal') roleCloneListModal: ModalDirective;
    @ViewChild('roleCloneList') roleCloneList: RoleList;

    public filter: string = '';
    public selectedTableDefinition: TableDefinition = null;
    public selectedRole: RoleEntity = null;
    public selectedRoleClone: RoleEntity = null;
    isCollapsed: boolean = true;

    constructor(
        public dialog: MatDialog,
        public columnDefinitionHttpService: ColumnDefinitionHttpService,
        public roleHttpService: RoleService,
        public tableDefinitionHttpService: TableDefinitionHttpService) {
        super();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: ColumnDefinition | null = null) {
      let dialogRef = this.dialog.open(ColumnDefinitionAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: ColumnDefinition) => {
        if (item !== null) this.refresh();
      });
    }

    public onItemEdit(item: ColumnDefinition) {
      // this.roles = item?.roleId;
      this.onAddEditItem(item);
    }

    // public addNewItem() {
    //     super.addNewItem();
    //
    //     this.columnDefinitionDetail.tableDefinition = null;
    //     this.columnDefinitionDetail.role = null;
    // }
    //
    // public editItem() {
    //     super.editItem();
    //
    //     const columnDefinition: ColumnDefinition = this.selectedItem as ColumnDefinition;
    //
    //     this.columnDefinitionDetail.tableDefinition = null;
    //     if ((columnDefinition != null) && (columnDefinition.tableDefinitionId != null)) {
    //         this.tableDefinitionHttpService
    //             .getById(columnDefinition.tableDefinitionId)
    //             .subscribe((tableDefinition: TableDefinition) => {
    //                 this.columnDefinitionDetail.tableDefinition = tableDefinition;
    //             });
    //     }
    //
    //     this.columnDefinitionDetail.role = null;
    //     if (columnDefinition != null && columnDefinition.roleId != null) {
    //         this.roleHttpService
    //             .getDetailById(columnDefinition.roleId)
    //             .subscribe((role: RoleEntity) => {
    //                 this.columnDefinitionDetail.role = role;
    //             });
    //     }
    // }

    public detailInitialize() {
        super.detailInitialize();
        this.columnDefinitionDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.columnDefinitionDetailModal.hide();
    }

    public onColumnDefinitionDetailTableDefinitionNeeded() {
        this.columnDefinitionDetailModal.hide();
        this.selectTableDefinition();
    }

    public onTableDefinitionListCancel() {
        this.tableDefinitionListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.columnDefinitionDetailModal.show();
        }
    }

    public onColumnDefinitionDetailRoleNeeded() {
        this.columnDefinitionDetailModal.hide();
        this.selectRole();
    }

    public onRoleListCancel() {
        this.roleListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.columnDefinitionDetailModal.show();
        }
    }


    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('tableDefinitionIds', AppUtils.getIdsList<TableDefinition, number>([ this.selectedTableDefinition ])));
        params.push(new Param("roleIds", this.selectedRole != null ? this.selectedRole.id : null ));
        this.columnDefinitionList.refresh(params);
    }

    public selectTableDefinition() {
        this.tableDefinitionListModal.show();
        this.tableDefinitionList.refresh(null);
    }

    public setSelectedTableDefinition(value) {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                // this.selectedTableDefinition = this.tableDefinitionList.selectedItem;
                this.selectedTableDefinition = value;
                this.tableDefinitionListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                // this.columnDefinitionDetail.tableDefinition = this.tableDefinitionList.selectedItem;
                this.columnDefinitionDetail.tableDefinition = value;
                this.tableDefinitionListModal.hide();
                this.columnDefinitionDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectTableDefinition() {
        this.selectedTableDefinition = null;
        this.refresh();
    }

    public selectRole() {
        this.roleListModal.show();
        this.roleList.refresh(null);
    }

    public setSelectedRole(value) {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                // this.selectedRole = this.roleList.selectedItem;
                this.selectedRole = value;
                this.roleListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                // this.columnDefinitionDetail.role = this.roleList.selectedItem;
                this.columnDefinitionDetail.role = value;
                this.roleListModal.hide();
                this.columnDefinitionDetailModal.show();
                break;
        }
    }

    public unselectRole() {
        this.selectedRole = null;
        this.refresh();
    }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }


    public getFilters(): Array<Param> {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        params.push(new Param('tableDefinitionIds', AppUtils.getIdsList<TableDefinition, number>([this.selectedTableDefinition])));
        params.push(new Param("roleIds", this.selectedRole != null ? this.selectedRole.id : null ));

        return params;
    }

    public exportToExcel() {

        let params: Array<Param> = null;

        // params = this.getFilters();
        // this.cityHttpService
        //     .export(params)
        //     .subscribe((blob) => {
        //         fileSaveAs(blob, 'Cities.xlsx');
        //     });
    }

    clone (){
        this.selectColumnDefinitionClone();
      }

      public selectColumnDefinitionClone() {
        this.roleCloneListModal.show();
        this.roleCloneList.refresh(null);
    }

    public setSelectedColumnDefinitionClone() {
      let cloneAll = false;
      if(this.selectedTableDefinition == null){
        if(confirm('Esti sigur ca vrei sa clonezi toate tabelele?')){
          cloneAll = true;
          this.selectedTableDefinition = new TableDefinition();
          this.selectedTableDefinition.id = 0;
        }
      }

        this.columnDefinitionHttpService.clone(this.selectedTableDefinition.id, this.roleList.selectedItems[0].id, this.roleCloneList.selectedItems[0].id, cloneAll).subscribe( (result) => {
            if (result){
                this.roleCloneListModal.hide();
                this.refresh();
            }
        });
    }


    public unselectColumnDefinitionClone() {
        this.roleCloneListModal.hide();
        this.selectedRoleClone = null;
        this.refresh();
    }
}
