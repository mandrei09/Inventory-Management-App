import { BudgetBase } from "../budget/budget-base";
import { BudgetForecast } from "../budget/budget-forecast";
import { CodeNameEntity } from "../common/code-name-entity";
import { CodePartnerEntity } from "../common/code-partner-entity";
import { Budget } from "./budget";
import { Request } from "./request";

export class Offer {
    id: number;
    code: string;
    name: string;
    partner: CodePartnerEntity;
    company: CodeNameEntity;
    admCenter: CodeNameEntity;
    assetType: CodeNameEntity;
    request: Request;
    // budget: Budget;
    // budgetBase: BudgetBase;
    budgetForecast: BudgetForecast;
    uom: CodeNameEntity;
    offerType: CodeNameEntity;

    constructor(id: number, code: string, name: string, partner: CodePartnerEntity, company: CodeNameEntity, admCenter: CodeNameEntity,
        assetType: CodeNameEntity, request: Request,
        // budgetBase: BudgetBase,
        budgetForecast: BudgetForecast,
        uom: CodeNameEntity, offerType: CodeNameEntity) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.partner = partner;
        this.company = company;
        this.admCenter = admCenter;
        this.assetType = assetType;
        this.request = request;
        // this.budgetBase = budgetBase;
        this.budgetForecast = budgetForecast;
        this.uom = uom;
        this.offerType = offerType;
    }
}
