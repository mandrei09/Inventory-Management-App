import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OfferType } from '../../../model/api/offer/offer-type';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-offer-type-detail',
    templateUrl: 'offer-type.detail.html'
})
export class OfferTypeDetailComponent extends GenericDetail<OfferType, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new OfferType(0, '', '');
    }

    public resetForm() {
        this.detailForm.reset();
    }



    public saveItem() {
        super.saveItem();
    }
}
