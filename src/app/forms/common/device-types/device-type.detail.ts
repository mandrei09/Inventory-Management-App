import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeviceType } from '../../../model/api/common/device-type';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'device-type-detail',
    templateUrl: 'device-type.detail.html'
})
export class DeviceTypeDetail extends GenericDetail<DeviceType, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new DeviceType();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}