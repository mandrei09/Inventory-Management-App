import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { Permission } from '../../../model/api/common/permission';
import { PermissionRole } from '../../../model/api/common/permission-role';
import { PermissionType } from '../../../model/api/common/permission-type';
import { RoleEntity } from '../../../model/api/common/role-entity';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'permission-role-detail',
    templateUrl: 'permission-role.detail.html',
    outputs: ['permissionNeeded', 'permissionTypeNeeded', 'roleNeeded']
})
export class PermissionRoleDetail extends GenericDetail<PermissionRole, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    public permissionRoleRequired: boolean = AppConfig.PERMISSION_ROLE_REQUIRED;
    public permissionRequired: boolean = AppConfig.PERMISSION_REQUIRED;
    public permissionTypeRequired: boolean = AppConfig.PERMISSION_TYPE_REQUIRED;
    public permissionNeeded: EventEmitter<void> = new EventEmitter<void>();
    public permissionTypeNeeded: EventEmitter<void> = new EventEmitter<void>();
    public roleNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedPermission: Permission = null;
    public selectedPermissionType: PermissionType = null;
    public selectedRole: RoleEntity = null;
    setItemDefaultValues() {
        this.item = new PermissionRole(0, '', '', null, null, null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public set permission(permission: Permission) {
        this.selectedPermission = permission;
        this.item.permission = permission != null ? new CodeNameEntity(permission.id, permission.code, permission.name) : null;
    }


    public askForPermission() {
        this.permissionNeeded.emit();
    }

    public set permissionType(permissionType: PermissionType) {
        this.selectedPermissionType = permissionType;
        this.item.permissionType = permissionType != null ? new CodeNameEntity(permissionType.id, permissionType.code, permissionType.name) : null;
    }


    public askForPermissionType() {
        this.permissionTypeNeeded.emit();
    }

    public set role(role: RoleEntity) {
        this.selectedRole = role;
        this.item.role = role != null ? new RoleEntity(role.id, role.name) : null;
    }

    public askForRole() {
        this.roleNeeded.emit();
    }


    public saveItem() {
        if ((this.permissionRequired) && (this.selectedPermission == null) && (this.selectedPermissionType == null)) {
            alert('Ecranul , permisiunea si rolul sunt obligatorii!');
        }
        else {
            super.saveItem();
        }
    }
}
