import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AssetNature } from '../../../model/api/assets/asset-nature';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-asset-nature-detail',
    templateUrl: 'asset-nature.detail.html'
})
export class AssetNatureDetailComponent extends GenericDetail<AssetNature, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new AssetNature(0, '', '', null);
    }

    public resetForm() {
        this.detailForm.reset();
    }
}