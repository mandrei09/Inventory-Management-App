import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Rate } from '../../../model/api/administration/rate';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-rate-detail',
    templateUrl: 'rate.detail.html'
})
export class RateDetailComponent extends GenericDetail<Rate, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Rate(0, '', '', null, 0);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        super.saveItem();
    }
}