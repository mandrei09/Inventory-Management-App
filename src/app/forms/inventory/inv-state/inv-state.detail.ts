import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InvState } from '../../../model/api/inventory/inv-state';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'inv-state-detail',
    templateUrl: 'inv-state.detail.html'
})
export class InvStateDetail extends GenericDetail<InvState, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new InvState();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}