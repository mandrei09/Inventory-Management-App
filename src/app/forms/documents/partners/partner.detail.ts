import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { Partner } from '../../../model/api/documents/partner';

@Component({
    selector: 'app-partner-detail',
    templateUrl: 'partner.detail.html'
})
export class PartnerDetailComponent extends GenericDetail<Partner, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Partner();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}