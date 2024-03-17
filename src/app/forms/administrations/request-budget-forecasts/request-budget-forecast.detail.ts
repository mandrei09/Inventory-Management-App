import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Request } from '../../../model/api/administration/request';
import { BudgetForecast } from '../../../model/api/budget/budget-forecast';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { RequestBudgetForecast } from '../../../model/api/requests/request-budget-forecast';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-request-budget-forecast-detail',
    templateUrl: 'request-budget-forecast.detail.html',
    styleUrls: ['request-budget-forecast.detail.scss'],
})
export class RequestBudgetForecastDetailComponent extends GenericDetail<RequestBudgetForecast, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new RequestBudgetForecast(0, null, null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
      super.saveItem();
    }
}
