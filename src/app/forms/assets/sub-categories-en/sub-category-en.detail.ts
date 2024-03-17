import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { CategoryEN } from '../../../model/api/assets/category-en';
import { SubCategoryEN } from '../../../model/api/assets/sub-category-en';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-sub-category-en-detail',
    templateUrl: 'sub-category-en.detail.html',
    outputs: ['categoryENNeeded']
})
export class SubCategoryENDetailComponent extends GenericDetail<SubCategoryEN, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    public categoryENNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedCategoryEN: CategoryEN;

    setItemDefaultValues() {
        this.item = new SubCategoryEN(0, '', '', null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        if ((AppConfig.INTER_COMPANY_EN_REQUIRED) && (this.selectedCategoryEN == null)) {
            alert('Supracategoria EN este obligatorie!');
        } else {
            super.saveItem();
        }

        // super.saveItem();
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