import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { Category } from '../../../model/api/assets/category';
import { CategoryEN } from '../../../model/api/assets/category-en';
import { InterCompany } from '../../../model/api/assets/inter-company';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-category-detail',
    templateUrl: 'category.detail.html',
    outputs: ['interCompanyNeeded', 'categoryENNeeded']
})
export class CategoryDetailComponent extends GenericDetail<Category, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    public interCompanyNeeded: EventEmitter<void> = new EventEmitter<void>();
    public categoryENNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedInterCompany: InterCompany;
    public selectedCategoryEN: CategoryEN;

    setItemDefaultValues() {
        this.item = new Category(0, '', '', null, null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        if ((AppConfig.INTER_COMPANY_REQUIRED) && (this.selectedInterCompany == null) && (this.selectedCategoryEN == null)) {
            alert('Supracategoria este obligatorie!');
        } else {
            super.saveItem();
        }

        // super.saveItem();
    }

    public set interCompany(interCompany: InterCompany) {
        this.setPartner(interCompany);
    }

    public setPartner(interCompany: InterCompany) {
        this.selectedInterCompany = interCompany;
        this.item.interCompany = interCompany != null ? new CodeNameEntity(interCompany.id, interCompany.code, interCompany.name) : null;
    }

    public askForInterCompany() {
        this.interCompanyNeeded.emit();
    }


    public set categoryEN(categoryEN: CategoryEN) {
        this.setCategoryEN(categoryEN);
    }

    public setCategoryEN(categoryEN: CategoryEN) {
        this.selectedCategoryEN = categoryEN;
        this.item.categoryEN = categoryEN != null ? new CodeNameEntity(categoryEN.id, categoryEN.code, categoryEN.name) : null;
    }

    public askForCategoryEN() {
        this.categoryENNeeded.emit();
    }
}