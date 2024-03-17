import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { Permission } from '../../../model/api/common/permission';
import { PermissionType } from '../../../model/api/common/permission-type';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'permission-detail',
    templateUrl: 'permission.detail.html',
    outputs: ['permissionTypeNeeded']
})
export class PermissionDetail extends GenericDetail<Permission, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    public permissionTypeRequired: boolean = AppConfig.PERMISSION_REQUIRED;
    public permissionTypeNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedPermissionType: PermissionType = null;

    setItemDefaultValues() {
        this.item = new Permission(0, '', '', null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public set permissionType(permissionType: PermissionType) {
        this.selectedPermissionType = permissionType;
        this.item.permissionType = permissionType != null ? new CodeNameEntity(permissionType.id, permissionType.code, permissionType.name) : null;
    }


    public askForPermissionType() {
        this.permissionTypeNeeded.emit();
    }


    public saveItem() {
        // if ((this.permissionTypeRequired) && (this.selectedPermissionType == null)) {
        //     alert('Tipul de permisiune este obligatoriu!');
        // }
        // else {
        //     super.saveItem();
        // }

        super.saveItem();
    }
}
