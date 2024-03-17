import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { Pocket } from '../../../model/api/common/device';
import { DeviceType } from '../../../model/api/common/device-type';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'device-detail',
    templateUrl: 'device.detail.html',
    outputs: ['deviceTypeNeeded']
})
export class DeviceDetail extends GenericDetail<Pocket, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    public deviceTypeNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedDeviceType: DeviceType;

    setItemDefaultValues() {
        this.item = new Pocket(0, '', '', '', '', '', '', '', '', null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        if (this.selectedDeviceType == null) {
            alert('Tipul este obligatorie!');
        }
        else {
            super.saveItem();
        }
    }

    public edit(item: Pocket) {

        super.edit(item);
    }

    public set deviceType(deviceType: DeviceType) {
        this.setDeviceType(deviceType);
    }

    public setDeviceType(deviceType: DeviceType) {
        this.selectedDeviceType = deviceType;
        this.item.deviceType = deviceType != null ? new CodeNameEntity(deviceType.id, deviceType.code, deviceType.name) : null;
    }

    public askForDeviceType() {
        this.deviceTypeNeeded.emit();
    }
}