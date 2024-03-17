import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { DictionaryType } from '../../../model/api/administration/dictionary-type';
import { EmailManager } from '../../../model/api/administration/email-manager';
import { EmailType } from '../../../model/api/administration/email-type';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'email-manager-detail',
    templateUrl: 'email-manager.detail.html',
    inputs: [ 'emailTypeLink', 'emailTypeSelectedEvent'],
    outputs: ['emailTypeNeeded']
})
export class EmailManagerDetail extends GenericDetail<EmailManager, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    //@ViewChild('detailForm') detailForm: any;

    public emailTypeRequired: boolean = AppConfig.EMAIL_MANAGER_REQUIRED;
    public emailTypeSelectedEvent: EventEmitter<DictionaryType>;
    public emailTypeNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedEmailType: EmailType = null;
    public emailTypeLink: boolean = false;

    setItemDefaultValues() {
        this.item = new EmailManager(0, '', '', null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public set emailType(emailType: EmailType) {
        this.selectedEmailType = emailType;
        this.item.emailType = emailType != null ? new CodeNameEntity(emailType.id, emailType.code, emailType.name) : null;
    }


    public askForEmailType() {
        this.emailTypeNeeded.emit();
    }


    public saveItem() {
        if ((this.emailTypeRequired) && (this.selectedEmailType == null)) {
            alert('Tipul este obligatoriu!');
        }
        else {
            super.saveItem();
        }
    }

    //public get allowSaving(): boolean { return ((this.detailForm != null) && (this.detailForm.form.valid) && (location != null)); }
}
