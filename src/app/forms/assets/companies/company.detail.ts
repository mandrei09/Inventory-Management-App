import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Company } from '../../../model/api/assets/company';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-company-detail',
    templateUrl: 'company.detail.html'
})
export class CompanyDetailComponent extends GenericDetail<Company, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Company();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}