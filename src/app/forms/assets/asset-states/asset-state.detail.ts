import { AssetState } from '../../../model/api/assets/asset-state';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';


@Component({
    selector: 'app-asset-state-detail',
    templateUrl: 'asset-state.detail.html'
})
export class AssetStateDetailComponent extends GenericDetail<AssetState, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new AssetState();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}