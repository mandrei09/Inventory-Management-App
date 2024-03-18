import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { CategoryEN } from '../../../model/api/assets/category-en';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-category-en-detail',
    templateUrl: 'category-en.detail.html',
    outputs: ['interCompanyENNeeded']
})
export class CategoryENDetailComponent extends GenericDetail<CategoryEN, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    public interCompanyENNeeded: EventEmitter<void> = new EventEmitter<void>();

    //public selectedInterCompanyEN: InterCompanyEN;

    setItemDefaultValues() {
        this.item = new CategoryEN(0, '', '', null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    // public saveItem() {
    //     if ((AppConfig.INTER_COMPANY_EN_REQUIRED) && (this.selectedInterCompanyEN == null)) {
    //         alert('Supracategoria EN este obligatorie!');
    //     } else {
    //         super.saveItem();
    //     }

    //     // super.saveItem();
    // }

    // public set interCompanyEN(interCompany: InterCompanyEN) {
    //     this.setInterCompanyEN(interCompany);
    // }

    // public setInterCompanyEN(interCompanyEN: InterCompanyEN) {
    //     this.selectedInterCompanyEN = interCompanyEN;
    //     this.item.interCompanyEN = interCompanyEN != null ? new CodeNameEntity(interCompanyEN.id, interCompanyEN.code, interCompanyEN.name) : null;
    // }

    // public askForInterCompanyEN() {
    //     this.interCompanyENNeeded.emit();
    // }
}