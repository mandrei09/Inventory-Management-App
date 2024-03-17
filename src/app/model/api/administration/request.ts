import { AccMonth } from "../accounting/acc-month";
import { BudgetBase } from "../budget/budget-base";
import { BudgetForecast } from "../budget/budget-forecast";
import { CodeNameEntity } from "../common/code-name-entity";
import { Employee } from "./employee";
export class Request {
    id: number;
    code: string;
    name: string;
    info: string;
    budgetForecast: BudgetForecast;
    // budgetBase: BudgetBase;
    costCenter: CodeNameEntity;
    division: CodeNameEntity;
    admCenter: CodeNameEntity;
    department: CodeNameEntity;
    assetType: CodeNameEntity;
    projectType: CodeNameEntity;
    employee: Employee;
    endDate: Date;
    budgetValueNeed: number;
    startAccMonth: AccMonth;

    constructor(id: number, code: string, name: string, info: string, budgetForecast: BudgetForecast,
        // budgetBase: BudgetBase,
        costCenter: CodeNameEntity, division: CodeNameEntity, admCenter: CodeNameEntity,
        department: CodeNameEntity, assetType: CodeNameEntity, projectType: CodeNameEntity, employee: Employee, endDate: Date, budgetValueNeed: number, startAccMonth: AccMonth) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.info = info;
        this.budgetForecast = budgetForecast;
        // this.budgetBase = budgetBase;
        this.costCenter = costCenter;
        this.division = division;
        this.admCenter = admCenter;
        this.department = department;
        this.assetType = assetType;
        this.projectType = projectType;
        this.employee = employee;
        this.endDate = endDate;
        this.budgetValueNeed = budgetValueNeed;
        this.startAccMonth = startAccMonth;
    }
}
