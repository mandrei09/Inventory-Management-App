import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InterCompanyEN } from '../../../model/api/assets/inter-company-en';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-inter-company-en-detail',
    templateUrl: 'inter-company-en.detail.html'
})
export class InterCompanyENDetailComponent extends GenericDetail<InterCompanyEN, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new InterCompanyEN(0, '', '');
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        super.saveItem();
    }
}