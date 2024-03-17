import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Brand } from '../../../model/api/assets/brand';
import { Model } from '../../../model/api/assets/model';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'model-detail',
    templateUrl: 'model.detail.html',
    outputs: ['brandNeeded']
})
export class ModelDetail extends GenericDetail<Model, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    public brandNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedBrand: Brand = null;

    setItemDefaultValues() {
        this.item = new Model(0, '', '', 0, 0, null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        super.saveItem();
    }

    public set brand(brand: Brand) {
        this.selectedBrand = brand;
        this.item.brand = brand != null ? new CodeNameEntity(brand.id, brand.code, brand.name) : null;
    }


    public askForBrand() {
        this.brandNeeded.emit();
    }
}
