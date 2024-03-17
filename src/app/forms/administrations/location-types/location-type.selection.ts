import { Component, EventEmitter, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LocationTypeHttpService } from '../../../services/http/administration/location-type.http.service';
import { LocationTypeListComponent } from './location-type.list';

@Component({
    selector: 'app-location-type-selection',
    templateUrl: 'location-type.selection.html',
    providers: [ LocationTypeHttpService ]
})
export class LocationTypeSelectionComponent {

    @Input() itemSelection: string;

    @ViewChild('locationTypeListModal') modal: ModalDirective;
    @ViewChild('locationTypeList') public locationTypeList: LocationTypeListComponent;

    public filter: string = '';

    constructor(public locationTypeHttpService: LocationTypeHttpService) {
    }

    public selectLocationTypes() {
        this.modal.show();
        this.locationTypeList.refresh(null);
    }
}
