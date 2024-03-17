import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';
import { RequestBudgetForecastMaterialCostCenter } from '../../../model/api/requests/request-budget-forecast-material-cost-center';

@Component({
    selector: 'app-request-budget-forecast-material-cost-center-detail',
    templateUrl: 'request-budget-forecast-material-cost-center.detail.html',
    styleUrls: ['request-budget-forecast-material-cost-center.detail.scss'],
})
export class RequestBFMaterialCostCenterDetailComponent extends GenericDetail<RequestBudgetForecastMaterialCostCenter, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new RequestBudgetForecastMaterialCostCenter(0, null, null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
      super.saveItem();
    }
}
