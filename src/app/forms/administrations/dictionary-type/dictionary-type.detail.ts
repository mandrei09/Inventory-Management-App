import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { DictionaryType } from '../../../model/api/administration/dictionary-type';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-dictionary-type-detail',
    templateUrl: 'dictionary-type.detail.html'
})
export class DictionaryTypeDetailComponent extends GenericDetail<DictionaryType, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new DictionaryType(0, '', '');
    }

    public resetForm() {
        this.detailForm.reset();
    }



    public saveItem() {
        if ((AppConfig.LOCATION_REGION_REQUIRED) ) {
            alert('Regiunea este obligatorie!');
        }
        else {
            super.saveItem();
        }
    }
}