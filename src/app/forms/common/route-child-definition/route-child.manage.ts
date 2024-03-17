import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Route } from '../../../model/api/common/route';
import { RoleList } from '../../auth/role.list';
import { RoleService } from '../../../services/http/identity/role.service';
import { RoleEntity } from '../../../model/api/common/role-entity';
import { RouteHttpService } from '../../../services/http/common/route.http.service';
import { RouteChildHttpService } from '../../../services/http/common/route-child.http.service';
import { RouteChild } from '../../../model/api/common/route-child';
import { RouteChildDetailComponent } from './route-child.detail';
import { RouteChildListComponent } from './route-child.list';
import { RouteListComponent } from '../route-definition/route.list';
import { BadgeList } from '../badge/badge.list';
import { Badge } from '../../../model/api/common/badge';
import { BadgeHttpService } from '../../../services/http/common/badge.http.service';
import {RouteDefinitionAddEditComponent} from '../route-definition/route-definition-add-edit/route-definition-add-edit.component';
import {RouteChildrenDefinitionAddEditComponent} from './route-children-definition-add-edit/route-children-definition-add-edit.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-route-child-manage',
    templateUrl: 'route-child.manage.html',
    styleUrls: ['route-child.manage.scss'],
    providers: [ RouteHttpService, RoleService, RouteChildHttpService ]
})
export class RouteChildManageComponent extends GenericManage<RouteChild, number> {

    @ViewChild('routeChildDetailModal') public routeChildDetailModal: ModalDirective;
    @ViewChild('routeChildList') public routeChildList: RouteChildListComponent;
    @ViewChild('routeChildDetail') public routeChildDetail: RouteChildDetailComponent;
    @ViewChild('roleListModal') public roleListModal: ModalDirective;
    @ViewChild('roleList') public roleList: RoleList;
    @ViewChild('routeListModal') public routeListModal: ModalDirective;
    @ViewChild('routeList') public routeList: RouteListComponent;
    @ViewChild('badgeListModal') public badgeListModal: ModalDirective;
    @ViewChild('badgeList') public badgeList: BadgeList;
    @ViewChild('roleCloneListModal') roleCloneListModal: ModalDirective;
    @ViewChild('roleCloneList') roleCloneList: RoleList;

    public filter: string = '';
    public selectedRole: RoleEntity = null;
    public selectedRoute: Route = null;
    public selectedBadge: Badge = null;
    public selectedRoleClone: RoleEntity = null;
    isCollapsed: boolean = true;
    constructor(
        public dialog: MatDialog,
        public routeHttpService: RouteHttpService,
        public badgeHttpService: BadgeHttpService,
        public routeChildHttpService: RouteChildHttpService,
        public roleHttpService: RoleService) {
        super();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: RouteChild | null = null) {
      let dialogRef = this.dialog.open(RouteChildrenDefinitionAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: RouteChild) => {
        if (item !== null) this.refresh();
      });
    }

    public onItemEdit(item: RouteChild) {
      this.onAddEditItem(item);
    }

    public editItem() {
        super.editItem();

        const routeChild: RouteChild = this.selectedItem as RouteChild;

        this.routeChildDetail.role = null;

        if ((routeChild != null) && (routeChild.roleId != null)) {
            this.roleHttpService
                .getById(routeChild.roleId)
                .subscribe((role: RoleEntity) => {
                    this.routeChildDetail.role = role;
                });
        }

        this.routeChildDetail.route = null;

        if ((routeChild != null) && (routeChild.routeId != null)) {
            this.routeHttpService
                .getById(routeChild.routeId)
                .subscribe((route: Route) => {
                    this.routeChildDetail.route = route;
                });
        }

        this.routeChildDetail.badge = null;

        if ((routeChild != null) && (routeChild.badge != null)) {
            this.badgeHttpService
                .getById(routeChild.badge.id)
                .subscribe((badge: Badge) => {
                    this.routeChildDetail.badge = badge;
                });
        }
    }

    public detailInitialize() {
        super.detailInitialize();
        this.routeChildDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.routeChildDetailModal.hide();
    }

    public onRouteDetailRoleNeeded() {
        this.routeChildDetailModal.hide();
        this.selectRole();
    }

    public onRoleListCancel() {
        this.roleListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.routeChildDetailModal.show();
        }
    }

    public onRouteChildDetailRouteNeeded() {
        this.routeChildDetailModal.hide();
        this.selectRoute();
    }

    public onRouteListCancel() {
        this.routeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.routeChildDetailModal.show();
        }
    }

    public onRouteChildDetailBadgeNeeded() {
        this.routeChildDetailModal.hide();
        this.selectBadge();
    }

    public onBadgeListCancel() {
        this.badgeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.routeChildDetailModal.show();
        }
    }


    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('roleIds', this.selectedRole != null ? this.selectedRole.id : ''));
        params.push(new Param('routeIds', this.selectedRoute != null ? this.selectedRoute.id.toString() : ''));
        params.push(new Param('badgeIds', this.selectedBadge != null ? this.selectedBadge.id.toString() : ''));
        this.routeChildList.refresh(params);
    }

    public selectRole() {
        this.roleListModal.show();
        this.roleList.refresh(null);
    }

    public setSelectedRole() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedRole = this.roleList.selectedItem;
                this.roleListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.routeChildDetail.role = this.roleList.selectedItem;
                this.roleListModal.hide();
                this.routeChildDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectRole() {
        this.selectedRole = null;
        this.refresh();
    }

    public selectRoute() {
        this.routeListModal.show();
        this.routeList.refresh(null);
    }

    public setSelectedRoute() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedRoute = this.routeList.selectedItem;
                this.routeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.routeChildDetail.route = this.routeList.selectedItem;
                this.routeListModal.hide();
                this.routeChildDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectRoute() {
        this.selectedRoute = null;
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
                this.routeChildDetail.badge = this.badgeList.selectedItem;
                this.badgeListModal.hide();
                this.routeChildDetailModal.show();
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
        params.push(new Param('routeIds', this.selectedRoute != null ? this.selectedRoute.id.toString() : ''));
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

        this.routeChildHttpService.clone(this.selectedRoute.id, this.roleList.selectedItems[0].id, this.roleCloneList.selectedItems[0].id, cloneAll).subscribe( (result) => {
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
