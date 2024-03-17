import { Material } from "../administration/material";
import { RequestBudgetForecast } from "./request-budget-forecast";

export class RequestBudgetForecastMaterial {
    id: number;
    material: Material;
    requestBudgetForecast: RequestBudgetForecast;


    constructor (id: number, material: Material, requestBudgetForecast: RequestBudgetForecast) {
        this.id = id;
        this.material = material;
        this.requestBudgetForecast = requestBudgetForecast;
    }
}
