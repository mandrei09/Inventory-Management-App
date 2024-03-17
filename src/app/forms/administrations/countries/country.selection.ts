import { Component, EventEmitter, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CountryHttpService } from '../../../services/http/administration/contry.http.service';
import { CountryListComponent } from './country.list';

@Component({
    selector: 'app-country-selection',
    templateUrl: 'country.selection.html',
    providers: [ CountryHttpService ]
})
export class CountrySelectionComponent {

    @Input() itemSelection: string;

    @ViewChild('countryListModal') modal: ModalDirective;
    @ViewChild('countryList') public countryList: CountryListComponent;

    public filter: string = '';

    constructor(public regionHttpService: CountryHttpService) {
    }

    public selectCountries() {
        this.modal.show();
        this.countryList.refresh(null);
    }
}

