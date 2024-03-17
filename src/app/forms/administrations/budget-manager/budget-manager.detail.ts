import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BudgetManager } from '../../../model/api/assets/budget-manager';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'budget-manager-detail',
    templateUrl: 'budget-manager.detail.html'
})
export class BudgetManagerDetail extends GenericDetail<BudgetManager, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new BudgetManager(0, '', '', null);
    }

    public resetForm() {
        this.detailForm.reset();
    }
}