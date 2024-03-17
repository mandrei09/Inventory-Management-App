import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { Type } from '../../../model/api/administration/type';
import { MasterType } from '../../../model/api/assets/master-type';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'type-detail',
    templateUrl: 'type.detail.html',
    outputs: ['masterTypeNeeded']
})
export class TypeDetail extends GenericDetail<Type, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    public masterTypeNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedMasterType: MasterType;

    setItemDefaultValues() {
        this.item = new Type(0, '', '', null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        if ((AppConfig.LOCATION_REGION_REQUIRED) && (this.selectedMasterType == null)) {
            alert('PC este obligatoriu!');
        }
        else {
            super.saveItem();
        }
    }

    public set masterType(masterType: MasterType) {
        this.setMasterType(masterType);
    }

    public setMasterType(masterType: MasterType) {
        this.selectedMasterType = masterType;
        this.item.masterTypeId = masterType != null ? masterType.id : null;
    }

    public askForMasterType() {
        this.masterTypeNeeded.emit();
    }

}
