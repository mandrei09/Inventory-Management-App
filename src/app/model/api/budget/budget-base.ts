import { CodeNameEntity } from "../common/code-name-entity";

export class BudgetBase {
    id: number;
    code: string;
    name: string;
    project: CodeNameEntity;
    uom: CodeNameEntity;
    admCenter: CodeNameEntity;
    region: CodeNameEntity;
    assetType: CodeNameEntity;
    company: CodeNameEntity;
    quantityRem: number;
    valueFin: number;
    info: string;
    depPeriod: number;
    depPeriodRem: number;

    constructor(id: number, code: string, name: string, uom: CodeNameEntity, quantityRem: number, valueFin: number, project: CodeNameEntity, admCenter: CodeNameEntity,
        region: CodeNameEntity,
        assetType: CodeNameEntity, company: CodeNameEntity) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.uom = uom;
        this.quantityRem = quantityRem;
        this.valueFin = valueFin;
        this.project = project;
        this.admCenter = admCenter;
        this.region = region;
        this.assetType = assetType;
        this.company = company;
    }
}
