import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PermissionType } from '../../../model/api/common/permission-type';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'permission-type-detail',
    templateUrl: 'permission-type.detail.html'
})
export class PermissionTypeDetail extends GenericDetail<PermissionType, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    public enabled  = false;
    setItemDefaultValues() {
        this.item = new PermissionType(0, '', '');
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public edit(item: PermissionType) {
        super.edit(item);
    }

    public saveItem() {
        super.saveItem();
    }
}