import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Country } from '../../../model/api/administration/country';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-country-detail',
    templateUrl: 'country.detail.html'
})
export class CountryDetailComponent extends GenericDetail<Country, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Country();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}
