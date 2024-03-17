import { Component, EventEmitter, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { RegionHttpService } from '../../../services/http/administration/region.http.service';
import { RegionListComponent } from './region.list';

@Component({
    selector: 'app-region-selection',
    templateUrl: 'region.selection.html',
    providers: [ RegionHttpService ]
})
export class RegionSelectionComponent {

    @Input() itemSelection: string;

    @ViewChild('regionListModal') modal: ModalDirective;
    @ViewChild('regionList') public regionList: RegionListComponent;

    public filter: string = '';

    constructor(public regionHttpService: RegionHttpService) {
    }

    public selectRegions() {
        this.modal.show();
        this.regionList.refresh(null);
    }
}

