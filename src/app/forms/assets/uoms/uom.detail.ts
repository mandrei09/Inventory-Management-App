import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Uom } from '../../../model/api/assets/uom';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-uom-detail',
    templateUrl: 'uom.detail.html'
})
export class UomDetailComponent extends GenericDetail<Uom, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Uom();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}