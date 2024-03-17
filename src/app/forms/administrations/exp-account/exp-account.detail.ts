import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ExpAccount } from '../../../model/api/administration/exp-account';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'exp-account-detail',
    templateUrl: 'exp-account.detail.html'
})
export class ExpAccountDetail extends GenericDetail<ExpAccount, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new ExpAccount();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}
