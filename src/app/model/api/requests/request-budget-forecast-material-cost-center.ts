import { CostCenter } from '../administration/cost-center';
import { RequestBudgetForecastMaterial } from "./request-budget-forecast-material";

export class RequestBudgetForecastMaterialCostCenter {
    id: number;
    costCenter: CostCenter;
    requestBudgetForecastMaterial: RequestBudgetForecastMaterial;


    constructor (id: number, costCenter: CostCenter, requestBudgetForecastMaterial: RequestBudgetForecastMaterial) {
        this.id = id;
        this.costCenter = costCenter;
        this.requestBudgetForecastMaterial = requestBudgetForecastMaterial;
    }
}
