import { Request } from "../administration/request";
import { BudgetForecast } from "../budget/budget-forecast";
import { CodeNameEntity } from "../common/code-name-entity";

export class RequestBudgetForecast {
    id: number;
    request: Request;
    budgetForecast: BudgetForecast;
    needBudgetValue: number;
    project: CodeNameEntity;
    info: string;

    constructor (id: number, request: Request, budgetForecast: BudgetForecast) {
        this.id = id;
        this.request = request;
        this.budgetForecast = budgetForecast;
    }
}
