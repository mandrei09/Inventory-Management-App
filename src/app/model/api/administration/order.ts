import { CodeNameEntity } from '../common/code-name-entity';
import { Contract } from './contract';
import { Employee } from './employee';
import { Offer } from './offer';

export class Order {
    id: number;
    code: string;
    name: string;
    offer: Offer;
    budget: CodeNameEntity;
    costCenter: CodeNameEntity;
    division: CodeNameEntity;
    admCenter: CodeNameEntity;
    department: CodeNameEntity;
    assetType: CodeNameEntity;
    projectType: CodeNameEntity;
    project: CodeNameEntity;
    activity: CodeNameEntity;
    country: CodeNameEntity;
    appState: CodeNameEntity;
    employee: Employee;
    info: string;
    budgetValueNeed: number;
    contract: Contract;

    constructor(id: number, code: string, name: string, offer: Offer, budget: CodeNameEntity, costCenter: CodeNameEntity,
        division: CodeNameEntity,
        admCenter: CodeNameEntity,
        department: CodeNameEntity,
        assetType: CodeNameEntity,
        projectType: CodeNameEntity,
        project: CodeNameEntity,
        activity: CodeNameEntity,
        country: CodeNameEntity,
        appState: CodeNameEntity,
        employee: Employee,  info: string) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.offer = offer;
        this.budget = budget;
        this.costCenter = costCenter;
        this.division = division;
        this.admCenter = admCenter;
        this.department = department;
        this.assetType = assetType;
        this.projectType = projectType;
        this.project = project;
        this.activity = activity;
        this.country = country;
        this.appState = appState;
        this.employee = employee;
        this.info = info;
    }
}
