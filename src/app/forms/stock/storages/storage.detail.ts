import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Storage } from '../../../model/api/stock/storage';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-storage-detail',
    templateUrl: 'storage.detail.html',
})
export class StorageDetailComponent extends GenericDetail<Storage, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Storage(0, '', '');
    }

    public resetForm() {
        this.detailForm.reset();
    }
}
