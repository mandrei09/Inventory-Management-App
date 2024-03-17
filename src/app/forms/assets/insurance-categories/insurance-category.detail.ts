import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InsuranceCategory } from '../../../model/api/assets/insurance-category';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'insurance-category-detail',
    templateUrl: 'insurance-category.detail.html'
})
export class InsuranceCategoryDetail extends GenericDetail<InsuranceCategory, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new InsuranceCategory();
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        super.saveItem();
    }
}