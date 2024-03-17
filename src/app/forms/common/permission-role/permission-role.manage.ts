import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { PermissionRoleDetail as PermissionRoleDetailUI } from './permission-role.detail';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppUtils } from '../../../common/app.utils';
import { Permission } from '../../../model/api/common/permission';
import { PermissionHttpService } from '../../../services/http/common/permission.http.service';
import { RoleList } from '../../auth/role.list';
import { RoleEntity } from '../../../model/api/common/role-entity';
import { RoleService } from '../../../services/http/identity/role.service';
import { PermissionRole } from '../../../model/api/common/permission-role';
import { PermissionRoleList } from './permission-role.list';
import { PermissionRoleHttpService } from '../../../services/http/common/permission-role.http.service';
import { PermissionList } from '../permission/permission.list';
import { PermissionTypeList } from '../permission-type/permission-type.list';
import { PermissionType } from '../../../model/api/common/permission-type';
import { PermissionTypeHttpService } from '../../../services/http/common/permission-type.http.service';
import {PermissionRoleAddEditDialog} from './permission-role-add-edit/permission-role.add-edit.dialog';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../../../services/dialog.service';

@Component({
    selector: 'permission-role-manage',
    templateUrl: 'permission-role.manage.html',
    styleUrls: ['permission-role.manage.scss'],
})
export class PermissionRoleManage extends GenericManage<PermissionRole, number> {

  public _roles: RoleEntity = null;
  public get roles(): RoleEntity { return this._roles; }
  public set roles(value: RoleEntity) {
    this._roles = value;

    this.setSelectedRole(value);
  }

  public _permissionTypes: PermissionType | null = null;
  public get permissionTypes(): PermissionType | null { return this._permissionTypes; }
  public set permissionTypes(value: PermissionType | null) {
    this._permissionTypes = value;
    this.setSelectedPermissionType(value);
  }

  public _permissions: Permission | null = null;
  public get permissions(): Permission | null { return this._permissions; }
  public set permissions(value: Permission | null) {
    this._permissions = value;
    this.setSelectedPermission(value);
  }

    @ViewChild('permissionRoleDetailModal') permissionRoleDetailModal: ModalDirective;
    @ViewChild('permissionRoleList') permissionRoleList: PermissionRoleList;
    @ViewChild('permissionRoleDetail') permissionRoleDetail: PermissionRoleDetailUI;
    @ViewChild('permissionListModal') permissionListModal: ModalDirective;
    @ViewChild('permissionList') permissionList: PermissionList;
    @ViewChild('permissionTypeListModal') permissionTypeListModal: ModalDirective;
    @ViewChild('permissionTypeList') permissionTypeList: PermissionTypeList;
    @ViewChild('permissionTypeCloneListModal') permissionTypeCloneListModal: ModalDirective;
    @ViewChild('permissionTypeCloneList') permissionTypeCloneList: PermissionTypeList;
    @ViewChild('roleListModal') roleListModal: ModalDirective;
    @ViewChild('roleList') roleList: RoleList;

    @ViewChild('roleCloneListModal') roleCloneListModal: ModalDirective;
    @ViewChild('roleCloneList') roleCloneList: RoleList;

    public filter: string = '';
    public selectedPermission: Permission = null;
    public selectedPermissionType: PermissionType = null;
    public selectedPermissionTypeClone: PermissionType = null;
    public selectedRole: RoleEntity = null;

    public selectedRoleClone: RoleEntity = null;
    isCollapsed: boolean = true;

    constructor(
                public dialog: MatDialog,
                public permissionHttpService: PermissionHttpService,
                public permissionTypeHttpService: PermissionTypeHttpService,
                public roleHttpService: RoleService,
                public permissionRoleHttpService: PermissionRoleHttpService,
                public dialogService: DialogService) {

        super();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: PermissionRole | null = null) {
      let dialogRef = this.dialog.open(PermissionRoleAddEditDialog, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: PermissionRole) => {
        if (item !== null) this.refresh();
      });
    }

    public onItemEdit(item: PermissionRole) {
      this.onAddEditItem(item);
    }

    // public addNewItem() {
    //     super.addNewItem();
    //
    //     this.permissionRoleDetail.permission = null;
    //     this.permissionRoleDetail.permissionType = null;
    //     this.permissionRoleDetail.role = null;
    // }

    // public editItem() {
    //     super.editItem();
    //
    //     let permissionRole: PermissionRole = this.selectedItem as PermissionRole;
    //
    //     this.permissionRoleDetail.permission = null;
    //
    //     if (permissionRole != null && permissionRole.permission != null) {
    //         this.permissionHttpService
    //             .getById(permissionRole.permission.id)
    //             .subscribe((permission: Permission) => {
    //                 this.permissionRoleDetail.permission = permission;
    //             });
    //     }
    //
    //     this.permissionRoleDetail.permissionType = null;
    //
    //     if (permissionRole != null && permissionRole.permissionType != null) {
    //         this.permissionTypeHttpService
    //             .getById(permissionRole.permissionType.id)
    //             .subscribe((permissionType: PermissionType) => {
    //                 this.permissionRoleDetail.permissionType = permissionType;
    //             });
    //     }
    //
    //     this.permissionRoleDetail.role = null;
    //
    //     if (permissionRole != null && permissionRole.role != null) {
    //         this.roleHttpService
    //             .getById(permissionRole.role.id)
    //             .subscribe((role: RoleEntity) => {
    //                 this.permissionRoleDetail.role = role;
    //             });
    //     }
    // }

    public detailInitialize() {
        super.detailInitialize();
        this.permissionRoleDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.permissionRoleDetailModal.hide();
    }

    public onPermissionRoleDetailPermissionNeeded() {
        this.permissionRoleDetailModal.hide();
        this.selectPermission();
    }

    public onPermissionListCancel() {
        this.permissionListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.permissionRoleDetailModal.show();
        }
    }


    public onPermissionRoleDetailPermissionTypeNeeded() {
        this.permissionRoleDetailModal.hide();
        this.selectPermissionType();
    }

    public onPermissionTypeListCancel() {
        this.permissionTypeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.permissionRoleDetailModal.show();
        }
    }


    public onPermissionTypeCloneListCancel() {
        this.permissionTypeCloneListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.permissionRoleDetailModal.show();
        }
    }

    public onPermissionRoleDetailRoleNeeded() {
        this.permissionRoleDetailModal.hide();
        this.selectRole();
    }

    public onRoleListCancel() {
        this.roleListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.permissionRoleDetailModal.show();
        }
    }

    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("permissionIds", AppUtils.getIdsList<Permission, number>([ this.selectedPermission ])));
        params.push(new Param("permissionTypeIds", AppUtils.getIdsList<PermissionType, number>([ this.selectedPermissionType ])));
        params.push(new Param("roleIds", this.selectedRole != null ? this.selectedRole.id : null ));
        this.permissionRoleList.refresh(params);
    }

    public selectPermission() {
        this.permissionListModal.show();
        this.permissionList.refresh(null);
    }

    public setSelectedPermission(value) {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedPermission = value;
                this.permissionListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.permissionRoleDetail.permission = value;
                this.permissionListModal.hide();
                this.permissionRoleDetailModal.show();
                break;
        }
    }


    public unselectPermission() {
        this.selectedPermission = null;
        this.refresh();
    }

    public selectPermissionType() {
        this.permissionTypeListModal.show();
        this.permissionTypeList.refresh(null);
    }

    public setSelectedPermissionType(value) {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedPermissionType = value;
                this.permissionTypeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.permissionRoleDetail.permissionType = value;
                this.permissionTypeListModal.hide();
                this.permissionRoleDetailModal.show();
                break;
        }
    }


    public unselectPermissionType() {
        this.selectedPermissionType = null;
        this.refresh();
    }


    public selectPermissionTypeClone() {
        this.permissionTypeCloneListModal.show();
        this.permissionTypeCloneList.refresh(null);
    }

    public setSelectedPermissionTypeClone() {
        this.permissionRoleHttpService.clone(this.selectedPermissionType.id, this.permissionTypeCloneList.selectedItems[0].id).subscribe( (result) => {
            if (result){
                this.permissionTypeCloneListModal.hide();
                this.refresh();
            }
        });
    }


    public unselectPermissionTypecLONE() {
        this.setSelectedPermissionTypeClone = null;
        this.refresh();
    }


    public selectRole() {
        this.roleListModal.show();
        this.roleList.refresh(null);
    }

    public setSelectedRole(value) {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedRole = value;
                this.roleListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.permissionRoleDetail.role = value;
                this.roleListModal.hide();
                this.permissionRoleDetailModal.show();
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

      clone (){
        this.selectPermissionTypeClone();
      }


      cloneAll (){
        this.selectRouteCloneAll();
      }

      public selectRouteCloneAll() {
        this.roleCloneListModal.show();
        this.roleCloneList.refresh(null);
    }

    public setSelectedRouteCloneAll() {
      let cloneAll = false;
      if(this.selectedPermissionType == null){
        if(confirm('Esti sigur ca vrei sa clonezi toate permisiunile?')){
          cloneAll = true;
          this.selectedPermissionType = new PermissionType(0, '', '');
        }
      }

        this.permissionRoleHttpService.cloneAll(this.selectedPermissionType.id, this.roleList.selectedItems[0].id, this.roleCloneList.selectedItems[0].id, cloneAll).subscribe( (result) => {
            if (result){
                this.roleCloneListModal.hide();
                this.refresh();
            }
        });
    }


    public unselectRouteCloneAll() {
        this.roleCloneListModal.hide();
        this.selectedRoleClone = null;
        this.refresh();
    }

    onClearFilters() {
      this._roles = null;
      this._permissionTypes = null;
      this.refresh();
    }

    onClearSelections() {
      this.permissionList.selectedItems = new Array<Permission>();
      this.refresh();
    }

    onItemDelete(item: PermissionRole) {
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

    public deleteItem(item: PermissionRole) {
      const filters = new Array<Param>;

      this.permissionRoleHttpService.delete(item.id!).subscribe(() => {
        this.refresh();
      });
    }
}
