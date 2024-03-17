import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Region } from '../../../model/api/administration/region';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-region-detail',
    templateUrl: 'region.detail.html'
})
export class RegionDetailComponent extends GenericDetail<Region, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Region();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}
