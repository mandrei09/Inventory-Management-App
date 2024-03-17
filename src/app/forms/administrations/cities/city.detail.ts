import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { City } from '../../../model/api/administration/city';
import { County } from '../../../model/api/administration/county';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-city-detail',
    templateUrl: 'city.detail.html',
    outputs: ['countyNeeded']
})
export class CityDetailComponent extends GenericDetail<City, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    public countyNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedCounty: County;

    setItemDefaultValues() {
        this.item = new City(0, '', '', 0);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        if ((AppConfig.CITY_COUNTY_REQUIRED) && (this.selectedCounty == null)) {
            alert('Cityul este obligatorie!');
        } else {
            super.saveItem();
        }
    }

    public set county(county: County) {
        this.setCounty(county);
    }

    public setCounty(county: County) {
        this.selectedCounty = county;
        this.item.countyId = county != null ? county.id : null;
    }

    public askForCounty() {
        this.countyNeeded.emit();
    }

}
