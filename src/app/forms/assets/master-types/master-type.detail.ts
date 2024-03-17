import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MasterType } from '../../../model/api/assets/master-type';
import { GenericDetail } from '../../generic/generic.detail';


@Component({
    selector: 'app-master-type-detail',
    templateUrl: 'master-type.detail.html'
})
export class MasterTypeDetailComponent extends GenericDetail<MasterType, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new MasterType();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}