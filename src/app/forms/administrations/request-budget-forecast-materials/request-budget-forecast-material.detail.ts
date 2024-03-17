import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RequestBudgetForecastMaterial } from '../../../model/api/requests/request-budget-forecast-material';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-request-budget-forecast-material-detail',
    templateUrl: 'request-budget-forecast-material.detail.html',
    styleUrls: ['request-budget-forecast-material.detail.scss'],
})
export class RequestBudgetForecastMaterialDetailComponent extends GenericDetail<RequestBudgetForecastMaterial, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new RequestBudgetForecastMaterial(0, null, null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
      super.saveItem();
    }
}
