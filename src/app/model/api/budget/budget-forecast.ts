import { CodeNameEntity } from "../common/code-name-entity";
import { MonthEntity } from "../common/month-entity";
import { BudgetBase } from "./budget-base";

export class BudgetForecast {
    id: number;
    code: string;
    name: string;
    project: CodeNameEntity;
    uom: CodeNameEntity;
    admCenter: CodeNameEntity;
    department: CodeNameEntity;
    division: CodeNameEntity;
    projectType: CodeNameEntity;
    region: CodeNameEntity;
    assetType: CodeNameEntity;
    company: CodeNameEntity;
    accMonth: MonthEntity;
    totalRem: number;
    budgetBase: BudgetBase;
    april: number;
    may: number;
    june: number;
    july: number;
    august: number;
    september: number;
    octomber: number;
    november: number;
    december: number;
    january: number;
    february: number;
    march: number;
    total: number;
    importValueOrder: number;
    valueAssetYTD: number;
    valueAssetYTG: number;
    valueOrder: number;

    constructor(id: number, code: string, name: string, uom: CodeNameEntity, totalRem: number, project: CodeNameEntity, admCenter: CodeNameEntity,
        region: CodeNameEntity,
        assetType: CodeNameEntity, company: CodeNameEntity) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.uom = uom;
        this.totalRem = totalRem;
        this.project = project;
        this.admCenter = admCenter;
        this.region = region;
        this.assetType = assetType;
        this.company = company;
    }
}


export class BudgetForecastView {
  id: number;
  code: string;
  name: string;
  project: CodeNameEntity;
  uom: CodeNameEntity;
  admCenter: CodeNameEntity;
  region: CodeNameEntity;
  assetType: CodeNameEntity;
  company: CodeNameEntity;
  totalRem: number;
  budgetBase: BudgetBase;
  needBudgetValue: number;
  needBudget: boolean;
}
