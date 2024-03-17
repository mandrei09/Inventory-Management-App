import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Tax } from '../../../model/api/assets/tax';
import { GenericDetail } from '../../generic/generic.detail';


@Component({
    selector: 'app-tax-detail',
    templateUrl: 'tax.detail.html'
})
export class TaxDetailComponent extends GenericDetail<Tax, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Tax();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}
