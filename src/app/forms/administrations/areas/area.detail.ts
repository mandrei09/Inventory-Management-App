import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Area } from '../../../model/api/administration/area';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-area-detail',
    templateUrl: 'area.detail.html',
})
export class AreaDetailComponent extends GenericDetail<Area, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Area(0, '', '');
    }

    public resetForm() {
        this.detailForm.reset();
    }
}
