import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { Dimension } from '../../../model/api/administration/dimension';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-dimension-detail',
    templateUrl: 'dimension.detail.html',
    inputs: [ 'assetCategoryLink', 'assetCategorySelectedEvent'],
    outputs: ['assetCategoryNeeded']
})
export class DimensionDetailComponent extends GenericDetail<Dimension, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    // @ViewChild('detailForm') detailForm: any;

    public assetCategoryRequired: boolean = AppConfig.ASSET_CATEGORY_REQUIRED;
    public assetCategorySelectedEvent: EventEmitter<AssetCategory>;
    public assetCategoryNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedAssetCategory: AssetCategory = null;
    public assetCategoryLink: boolean = false;

    setItemDefaultValues() {
        this.item = new Dimension(0, '', '', '', null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        // if ((this.assetCategoryRequired) && (this.selectedAssetCategory == null)) {
        //     alert('Tipul de inventariere este obligatoriu!');
        // } else {
        //     super.saveItem();
        // }

        super.saveItem();
    }

    public set assetCategory(assetCategory: AssetCategory) {
        this.selectedAssetCategory = assetCategory;
        this.item.assetCategory = assetCategory != null ? new CodeNameEntity(assetCategory.id, assetCategory.code, assetCategory.name) : null;
    }

    public askFCitysetCategory() {
        this.assetCategoryNeeded.emit();
    }

}
