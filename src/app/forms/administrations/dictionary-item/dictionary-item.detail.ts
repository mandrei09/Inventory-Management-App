import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { DictionaryItem } from '../../../model/api/administration/dictionary-item';
import { DictionaryType } from '../../../model/api/administration/dictionary-type';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { GenericDetail } from '../../generic/generic.detail';
@Component({
    selector: 'app-dictionary-item-detail',
    templateUrl: 'dictionary-item.detail.html',
    inputs: [ 'dictionaryTypeLink', 'dictionaryTypeSelectedEvent', 'assetCategoryLink', 'assetCategorySelectedEvent' ],
    outputs: ['dictionaryTypeNeeded', 'assetCategoryNeeded']
})
export class DictionaryItemDetailComponent extends GenericDetail<DictionaryItem, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    //@ViewChild('detailForm') detailForm: any;

    public dictionaryTypeRequired: boolean = AppConfig.ROOM_LOCATION_REQUIRED;
    public dictionaryTypeSelectedEvent: EventEmitter<DictionaryType>;
    public dictionaryTypeNeeded: EventEmitter<void> = new EventEmitter<void>();
    public assetCategorySelectedEvent: EventEmitter<AssetCategory>;
    public assetCategoryNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedDictionaryType: DictionaryType = null;
    public selectedAssetCategory: AssetCategory = null;
    public dictionaryTypeLink: boolean = false;
    public assetCategoryLink: boolean = false;

    setItemDefaultValues() {
        this.item = new DictionaryItem(0, '', '', null, null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public set dictionaryType(dictionaryType: DictionaryType) {
        this.selectedDictionaryType = dictionaryType;
        this.item.dictionaryType = dictionaryType != null ? new CodeNameEntity(dictionaryType.id, dictionaryType.code, dictionaryType.name) : null;
    }

    public set assetCategory(assetCategory: AssetCategory) {
        this.selectedAssetCategory = assetCategory;
        this.item.assetCategory = assetCategory != null ? new CodeNameEntity(assetCategory.id, assetCategory.code, assetCategory.name) : null;
    }

    public askForDictionaryType() {
        this.dictionaryTypeNeeded.emit();
    }

    public askForAssetCategory() {
        this.assetCategoryNeeded.emit();
    }

    public saveItem() {
        if ((this.dictionaryTypeRequired) && (this.selectedDictionaryType == null)) {
            alert('Directia este obligatorie!');
        }
        else {
            super.saveItem();
        }
    }

    //public get allowSaving(): boolean { return ((this.detailForm != null) && (this.detailForm.form.valid) && (location != null)); }
}