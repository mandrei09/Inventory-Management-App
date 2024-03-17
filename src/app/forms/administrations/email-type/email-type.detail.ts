import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { EmailType } from '../../../model/api/administration/email-type';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'email-type-detail',
    templateUrl: 'email-type.detail.html'
})
export class EmailTypeDetail extends GenericDetail<EmailType, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    public enabled  = false;
    setItemDefaultValues() {
        this.item = new EmailType(0, '', '', '', false, null, null, 0, null, '', '', '');
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public edit(item: EmailType) {

        super.edit(item);
        this.enabled = item.notifyEnabled;
    }



    public saveItem() {
        this.item.notifyEnabled = this.enabled;
        if ((AppConfig.EMAIL_TYPE_REQUIRED) ) {
            alert('Tipul este obligatorie!');
        }
        else {
            super.saveItem();
        }
    }

    public setNotifyEnabled(enabled: boolean) {
        this.item.notifyEnabled = enabled;
        this.enabled = enabled;
    }

    public parseDate(dateString: any): Date {
        if (dateString) {
            return new Date(dateString);
        } else {
            return null;
        }
    }
}