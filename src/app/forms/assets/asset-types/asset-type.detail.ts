import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { AssetType } from '../../../model/api/assets/asset-type';

@Component({
    selector: 'app-asset-type-detail',
    templateUrl: 'asset-type.detail.html'
})
export class AssetTypeDetailComponent extends GenericDetail<AssetType, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new AssetType();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}