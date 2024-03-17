import { Component, EventEmitter, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AdmCenterHttpService } from '../../../services/http/administration/adm-center.http.service';
import { AdmCenterListComponent } from './adm-center.list';

@Component({
    selector: 'app-adm-center-selection',
    templateUrl: 'adm-center.selection.html',
    providers: [ AdmCenterHttpService ]
})
export class AdmCenterSelectionComponent {

    @Input() itemSelection: string;

    @ViewChild('admCenterListModal') modal: ModalDirective;
    @ViewChild('admCenterList') public admCenterList: AdmCenterListComponent;

    public filter: string = '';

    constructor(public admCenterHttpService: AdmCenterHttpService) {
    }

    public selectAdmCenters() {
        this.modal.show();
        this.admCenterList.refresh(null);
    }
}
