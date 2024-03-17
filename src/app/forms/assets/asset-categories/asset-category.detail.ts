import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { AssetCategory } from '../../../model/api/assets/asset-category';

@Component({
    selector: 'app-asset-category-detail',
    templateUrl: 'asset-category.detail.html'
})
export class AssetCategoryDetailComponent extends GenericDetail<AssetCategory, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new AssetCategory();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}