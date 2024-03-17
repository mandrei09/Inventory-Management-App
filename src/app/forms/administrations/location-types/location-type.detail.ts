import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LocationType } from '../../../model/api/administration/location-type';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-location-type-detail',
    templateUrl: 'location-type.detail.html'
})
export class LocationTypeDetailComponent extends GenericDetail<LocationType, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new LocationType();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}
