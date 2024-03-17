import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Stock } from '../../../model/api/administration/stock';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-stock-detail',
    templateUrl: 'stock.detail.html',
})
export class StockDetailComponent extends GenericDetail<Stock, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Stock(0, '', '', null, null, null, null, null, null, null, '', '', '' , '', 0, 0);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        super.saveItem();
    }
}