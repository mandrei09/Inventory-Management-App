import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { Badge } from '../../../model/api/common/badge';
import { RoleEntity } from '../../../model/api/common/role-entity';
import { Route } from '../../../model/api/common/route';
import { RouteChild } from '../../../model/api/common/route-child';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-route-child-detail',
    templateUrl: 'route-child.detail.html',
    outputs: ['roleNeeded', 'routeNeeded', 'badgeNeeded']
})
export class RouteChildDetailComponent extends GenericDetail<RouteChild, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    public roleNeeded: EventEmitter<void> = new EventEmitter<void>();
    public routeNeeded: EventEmitter<void> = new EventEmitter<void>();
    public badgeNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedRole: RoleEntity;
    public selectedRoute: Route;
    public selectedBadge: Badge;

    setItemDefaultValues() {
        this.item = new RouteChild(0, '', '', '', 0);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        if ((this.selectedRole == null) && (this.selectedRoute == null)) {
            alert('Rolul si Routa este obligatoriu!');
        } else {
            super.saveItem();
        }
    }

    public set role(role: RoleEntity) {
        this.setRole(role);
    }

    public setRole(role: RoleEntity) {
        this.selectedRole = role;
        this.item.roleId = role != null ? role.id : '';
    }

    public askForRole() {
        this.roleNeeded.emit();
    }

    public set route(route: Route) {
        this.setRoute(route);
    }

    public setRoute(route: Route) {
        this.selectedRoute = route;
        this.item.routeId = route != null ? route.id : 0;
    }

    public askForRoute() {
        this.routeNeeded.emit();
    }

    public askForBadge() {
        this.badgeNeeded.emit();
    }

    public set badge(badge: Badge) {
        this.setBadge(badge);
    }

    public setBadge(badge: Badge) {
        this.selectedBadge = badge;
        this.item.badge = badge != null ? new Badge(badge.id, badge.text, badge.variant, badge.active) : null;
    }

}
