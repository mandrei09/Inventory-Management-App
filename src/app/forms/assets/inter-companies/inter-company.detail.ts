import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { InterCompany } from '../../../model/api/assets/inter-company';
import { InterCompanyEN } from '../../../model/api/assets/inter-company-en';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-inter-company-detail',
    templateUrl: 'inter-company.detail.html',
    outputs: ['interCompanyENNeeded']
})
export class InterCompanyDetailComponent extends GenericDetail<InterCompany, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    public interCompanyENNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedInterCompanyEN: InterCompanyEN;

    setItemDefaultValues() {
        this.item = new InterCompany(0, '', '', null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        if ((AppConfig.INTER_COMPANY_EN_REQUIRED) && (this.selectedInterCompanyEN == null)) {
            alert('Supracategoria EN este obligatoriu!');
        } else {
            super.saveItem();
        }
    }

    public set interCompanyEN(interCompanyEN: InterCompanyEN) {
        this.setInterCompanyEN(interCompanyEN);
    }

    public setInterCompanyEN(interCompanyEN: InterCompanyEN) {
        this.selectedInterCompanyEN = interCompanyEN;
        this.item.interCompanyEN = interCompanyEN != null ? new CodeNameEntity(interCompanyEN.id, interCompanyEN.code, interCompanyEN.name) : null;
    }

    public askForInterCompanyEN() {
        this.interCompanyENNeeded.emit();
    }
}