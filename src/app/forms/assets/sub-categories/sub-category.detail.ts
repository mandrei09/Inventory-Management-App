import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { Category } from '../../../model/api/assets/category';
import { CategoryEN } from '../../../model/api/assets/category-en';
import { SubCategory } from '../../../model/api/assets/sub-category';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-sub-category-detail',
    templateUrl: 'sub-category.detail.html',
    outputs: ['categoryNeeded', 'categoryENNeeded']
})
export class SubCategoryDetailComponent extends GenericDetail<SubCategory, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    public categoryNeeded: EventEmitter<void> = new EventEmitter<void>();
    public categoryENNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedCategory: Category;
    public selectedCategoryEN: CategoryEN;

    setItemDefaultValues() {
        this.item = new SubCategory(0, '', '', null, null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        if ((AppConfig.INTER_COMPANY_REQUIRED) && (this.selectedCategory == null) && (this.selectedCategoryEN == null)) {
            alert('Supracategoria este obligatorie!');
        } else {
            super.saveItem();
        }

        // super.saveItem();
    }

    public set category(category: Category) {
        this.setCategory(category);
    }

    public setCategory(category: Category) {
        this.selectedCategory = category;
        this.item.category = category != null ? new CodeNameEntity(category.id, category.code, category.name) : null;
    }

    public askForCategory() {
        this.categoryNeeded.emit();
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