import { MonthEntity } from "../common/month-entity";
import { CodeNameEntity } from '../common/code-name-entity';
import { ApplicationUser } from "../identity/inventory-user";
import { EmployeeResource } from "../administration/employee-resource";
import { RequestBudgetForecastSave } from "../administration/request-save";
import { Offer } from "../administration/offer";
import { Contract } from '../administration/contract';

export class OrderEdit {
    id: number;
    code: string;
    info: string;
    createdAt: Date;
    modifiedAt: Date;
    user: ApplicationUser;
    accMonth: MonthEntity;
    appState: CodeNameEntity;
    startExecution: Date;
    endExecution: Date;
    owner: EmployeeResource;
    division: CodeNameEntity;
    projectType: CodeNameEntity;
    assetType: CodeNameEntity;
    // budgetBaseId: number;
    // budgetForecastId: number;
    // costCenterId: number;
    assetTypeId: number;
    projectTypeId: number;
    divisionId: number;
    employeeId: number;
    validated: boolean;
    endDate: Date;
    budgetValueNeed: number;
    startAccMonthId: number;
    budgetForecastIds: RequestBudgetForecastSave[];
    rangeDates: Date[];
    offer: Offer;
    contract: Contract;
    // quantity: number;

}
