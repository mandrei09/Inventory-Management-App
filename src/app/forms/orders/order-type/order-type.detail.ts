import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderType } from '../../../model/api/order/order-type';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-order-type-detail',
    templateUrl: 'order-type.detail.html'
})
export class OrderTypeDetailComponent extends GenericDetail<OrderType, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new OrderType(0, '', '');
    }

    public resetForm() {
        this.detailForm.reset();
    }



    public saveItem() {
        super.saveItem();
    }
}
