import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Route } from '../../../model/api/common/route';
import { RouteListComponent } from './route.list';
import { RouteDetailComponent } from './route.detail';
import { RoleList } from '../../auth/role.list';
import { RoleService } from '../../../services/http/identity/role.service';
import { RoleEntity } from '../../../model/api/common/role-entity';
import { RouteHttpService } from '../../../services/http/common/route.http.service';
import { BadgeList } from '../badge/badge.list';
import { Badge } from '../../../model/api/common/badge';
import { BadgeHttpService } from '../../../services/http/common/badge.http.service';
import {Division} from '../../../model/api/administration/division';
import {MatDialog} from '@angular/material/dialog';
import {RouteDefinitionAddEditComponent} from './route-definition-add-edit/route-definition-add-edit.component';
// import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'app-route-manage',
    templateUrl: 'route.manage.html',
    styleUrls: ['route.manage.scss'],
    providers: [ RouteHttpService, RoleService ]
})
export class RouteManageComponent extends GenericManage<Route, number> {

    @ViewChild('routeDetailModal') public routeDetailModal: ModalDirective;
    @ViewChild('routeList') public routeList: RouteListComponent;
    @ViewChild('routeDetail') public routeDetail: RouteDetailComponent;
    @ViewChild('roleListModal') public roleListModal: ModalDirective;
    @ViewChild('roleList') public roleList: RoleList;
    @ViewChild('badgeListModal') public badgeListModal: ModalDirective;
    @ViewChild('badgeList') public badgeList: BadgeList;
    @ViewChild('roleCloneListModal') roleCloneListModal: ModalDirective;
    @ViewChild('roleCloneList') roleCloneList: RoleList;

    public filter: string = '';
    public selectedRole: RoleEntity = null;
    public selectedBadge: Badge = null;
    public selectedRoleClone: RoleEntity = null;
    public selectedRoute: Route = null;

    isCollapsed: boolean = true;

  public _roles: RoleEntity[] = [];
  public get roles(): RoleEntity[] { return this._roles; }
  public set roles(value: RoleEntity[]) {
    this._roles = value;
    this.selectedRole = value[0];

    this.refresh();
  }
    constructor(
        public dialog: MatDialog,
        public routeHttpService: RouteHttpService,
        public badgeHttpService: BadgeHttpService,
        public roleHttpService: RoleService) {
        super();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: Route | null = null) {
      let dialogRef = this.dialog.open(RouteDefinitionAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: Route) => {
        if (item !== null) this.refresh();
      });
    }

    public onItemEdit(item: Route) {
      this.onAddEditItem(item);
    }

    public editItem() {
        super.editItem();

        const route: Route = this.selectedItem as Route;

        this.routeDetail.role = null;
        if ((route != null) && (route.roleId != null)) {
            this.roleHttpService
                .getById(route.roleId)
                .subscribe((role: RoleEntity) => {
                    this.routeDetail.role = role;
                });
        }

        this.routeDetail.badge = null;

        if ((route != null) && (route.badge != null)) {
            this.badgeHttpService
                .getById(route.badge.id)
                .subscribe((badge: Badge) => {
                    this.routeDetail.badge = badge;
                });
        }
    }

    public detailInitialize() {
        super.detailInitialize();
        this.routeDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.routeDetailModal.hide();
    }

    public onRouteDetailRoleNeeded() {
        this.routeDetailModal.hide();
        this.selectRole();
    }

    public onRoleListCancel() {
        this.roleListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.routeDetailModal.show();
        }
    }

    public onRouteDetailBadgeNeeded() {
        this.routeDetailModal.hide();
        this.selectBadge();
    }

    public onBadgeListCancel() {
        this.badgeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.routeDetailModal.show();
        }
    }


    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('roleIds', this.selectedRole != null ? this.selectedRole.id : ''));
        params.push(new Param('badgeIds', this.selectedBadge != null ? this.selectedBadge.id.toString() : ''));
        this.routeList.refresh(params);
    }

    public selectRole() {
        this.roleListModal.show();
        this.roleList.refresh(null);
    }

    public setSelectedRole(value) {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedRole = value[0];
                // this.roleListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.routeDetail.role = value[0];
                // this.roleListModal.hide();
                // this.routeDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectRole() {
        this.selectedRole = null;
        this.refresh();
    }

    public selectBadge() {
        this.badgeListModal.show();
        this.badgeList.refresh(null);
    }

    public setSelectedBadge() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedBadge = this.badgeList.selectedItem;
                this.badgeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.routeDetail.badge = this.badgeList.selectedItem;
                this.badgeListModal.hide();
                this.routeDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectBadge() {
        this.selectedBadge = null;
        this.refresh();
    }


    public getFilters(): Array<Param> {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        params.push(new Param('roleIds', this.selectedRole != null ? this.selectedRole.id : ''));
        params.push(new Param('badgeIds', this.selectedBadge != null ? this.selectedBadge.id.toString() : ''));

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

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }


      clone (){
        this.selectRouteClone();
      }

      public selectRouteClone() {
        this.roleCloneListModal.show();
        this.roleCloneList.refresh(null);
    }

    public setSelectedRouteClone() {
      let cloneAll = false;
      if(this.selectedRoute == null){
        if(confirm('Esti sigur ca vrei sa clonezi toate meniurile?')){
          cloneAll = true;
          this.selectedRoute = new Route(0, '', '', '');
        }
      }

        this.routeHttpService.clone(this.selectedRoute.id, this.roleList.selectedItems[0].id, this.roleCloneList.selectedItems[0].id, cloneAll).subscribe( (result) => {
            if (result){
                this.roleCloneListModal.hide();
                this.refresh();
            }
        });
    }


    public unselectRouteClone() {
        this.roleCloneListModal.hide();
        this.selectedRoleClone = null;
        this.refresh();
    }
}
