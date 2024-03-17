import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { Country } from '../../../model/api/administration/country';
import { County } from '../../../model/api/administration/county';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-county-detail',
    templateUrl: 'county.detail.html',
    outputs: ['countryNeeded']
})
export class CountyDetailComponent extends GenericDetail<County, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    public countryNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedCountry: Country;

    setItemDefaultValues() {
        this.item = new County(0, '', '', 0);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        if ((AppConfig.COUNTY_COUNTRY_REQUIRED) && (this.selectedCountry == null)) {
            alert('Tara este obligatorie!');
        } else {
            super.saveItem();
        }
    }

    public set country(country: Country) {
        this.setCountry(country);
    }

    public setCountry(country: Country) {
        this.selectedCountry = country;
        this.item.countryId = country != null ? country.id : null;
    }

    public askForCountry() {
        this.countryNeeded.emit();
    }

}
