import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { Plant } from '../../../model/api/assets/plant';

@Component({
    selector: 'app-plant-detail',
    templateUrl: 'plant.detail.html'
})
export class PlantDetailComponent extends GenericDetail<Plant, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Plant();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}
