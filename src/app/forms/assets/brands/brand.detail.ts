import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DictionaryItem } from '../../../model/api/administration/dictionary-item';
import { Brand } from '../../../model/api/assets/brand';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'brand-detail',
    templateUrl: 'brand.detail.html',
    outputs: ['dictionaryItemNeeded']
})
export class BrandDetail extends GenericDetail<Brand, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    public dictionaryItemNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedDictionaryItem: DictionaryItem = null;

    setItemDefaultValues() {
        this.item = new Brand(0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public set dictionaryItem(dictionaryItem: DictionaryItem) {
        this.selectedDictionaryItem = dictionaryItem;
        this.item.dictionaryItem = dictionaryItem != null ? new CodeNameEntity(dictionaryItem.id, dictionaryItem.code, dictionaryItem.name) : null;
    }


    public askForDictionaryItem() {
        this.dictionaryItemNeeded.emit();
    }

    public saveItem() {
        super.saveItem();
    }
}
