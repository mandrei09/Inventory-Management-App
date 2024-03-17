import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { Location } from '../../../model/api/administration/location';
import { Region } from '../../../model/api/administration/region';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { City } from '../../../model/api/administration/city';
import { AppConfig } from '../../../config';

@Component({
    selector: 'app-location-detail',
    templateUrl: 'location.detail.html',
    outputs: ['regionNeeded', 'admCenterNeeded', 'cityNeeded']
})
export class LocationDetailComponent extends GenericDetail<Location, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    public regionNeeded: EventEmitter<void> = new EventEmitter<void>();
    public admCenterNeeded: EventEmitter<void> = new EventEmitter<void>();
    public cityNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedRegion: Region;
    public selectedAdmCenter: AdmCenter;
    public selectedCity: City;

    setItemDefaultValues() {
        this.item = new Location(0, '', '',0, 0, 0, 0, 0, '','','');
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        if ((AppConfig.LOCATION_REGION_REQUIRED) && (this.selectedCity == null) && (this.selectedRegion == null) && (this.selectedAdmCenter == null)) {
            alert('Regiunea si Judetul sunt obligatorii!');
        }
        else {
            super.saveItem();
        }
    }

    public set city(city: City) {
        this.setCity(city);
    }

    public setCity(city: City) {
        this.selectedCity = city;
        this.item.cityId = city != null ? city.id : null;
    }

    public askForCity() {
        this.cityNeeded.emit();
    }

    public set region(region: Region) {
        this.setRegion(region);
    }

    public setRegion(region: Region) {
        this.selectedRegion = region;
        this.item.regionId = region != null ? region.id : null;
    }

    public askForRegion() {
        this.regionNeeded.emit();
    }

    public set admCenter(admCenter: AdmCenter) {
        this.setAdmCenter(admCenter);
    }

    public setAdmCenter(admCenter: AdmCenter) {
        this.selectedAdmCenter = admCenter;
        this.item.admCenterId = admCenter != null ? admCenter.id : null;
    }

    public askForAdmCenter() {
        this.admCenterNeeded.emit();
    }
}
