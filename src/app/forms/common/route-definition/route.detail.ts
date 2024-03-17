import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { Badge } from '../../../model/api/common/badge';
import { RoleEntity } from '../../../model/api/common/role-entity';
import { Route } from '../../../model/api/common/route';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-route-detail',
    templateUrl: 'route.detail.html',
    outputs: ['roleNeeded', 'badgeNeeded']
})
export class RouteDetailComponent extends GenericDetail<Route, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    public roleNeeded: EventEmitter<void> = new EventEmitter<void>();
    public badgeNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedRole: RoleEntity;
    public selectedBadge: Badge;

    setItemDefaultValues() {
        this.item = new Route(0, '', '', '');
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        if ((AppConfig.CITY_COUNTY_REQUIRED) && (this.selectedRole == null)) {
            alert('Rolul este obligatoriu!');
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
