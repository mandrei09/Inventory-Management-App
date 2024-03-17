import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Account } from '../../../model/api/administration/account';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'account-detail',
    templateUrl: 'account.detail.html'
})
export class AccountDetail extends GenericDetail<Account, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Account();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}