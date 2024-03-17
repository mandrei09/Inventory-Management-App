import { CodeNameEntity } from "../common/code-name-entity";
import { EmployeeResource } from "./employee-resource";

export class Matrix {
    id: number;
    appState: CodeNameEntity;
    // area: CodeNameEntity;
    // assetType: CodeNameEntity;
    company: CodeNameEntity;
    // costCenter: CodeNameEntity;
    // country: CodeNameEntity;
    // project: CodeNameEntity;
    division: CodeNameEntity;
    employeeB1: EmployeeResource;
    employeeL1: EmployeeResource;
    employeeL2: EmployeeResource;
    employeeL3: EmployeeResource;
    employeeL4: EmployeeResource;
    employeeS1: EmployeeResource;
    employeeS2: EmployeeResource;
    employeeS3: EmployeeResource;
    amountL1: number;
    amountL2: number;
    amountL3: number;
    amountL4: number;
    amountS1: number;
    amountS2: number;
    amountS3: number;
    state: any; notSync: any; isLocked: any;

    constructor(id: number, appState: CodeNameEntity,
        // area: CodeNameEntity,
        // assetType: CodeNameEntity,
        company: CodeNameEntity,
        // costCenter: CodeNameEntity,
        // country: CodeNameEntity,
        // project: CodeNameEntity,
        division: CodeNameEntity,
        employeeB1: EmployeeResource,
        employeeL1: EmployeeResource,
        employeeL2: EmployeeResource,
        employeeL3: EmployeeResource,
        employeeL4: EmployeeResource,
        employeeS1: EmployeeResource,
        employeeS2: EmployeeResource,
        employeeS3: EmployeeResource,
        amountL1: number,
        amountL2: number,
        amountL3: number,
        amountL4: number,
        amountS1: number,
        amountS2: number,
        amountS3: number) {
        this.id = id;
        this.appState = appState;
        //this.area = area;
        //this.assetType = assetType;
        this.company = company;
        //this.costCenter = costCenter;
        //this.country = country;
        //this.project = project;
        this.division = division;
        this.employeeB1 = employeeB1;
        this.employeeL1 = employeeL1;
        this.employeeL2 = employeeL2;
        this.employeeL3 = employeeL3;
        this.employeeL4 = employeeL4;
        this.employeeS1 = employeeS1;
        this.employeeS2 = employeeS2;
        this.employeeS3 = employeeS3;
        this.amountL1 = amountL1;
        this.amountL2 = amountL2;
        this.amountL3 = amountL3;
        this.amountL4 = amountL4;
        this.amountS1 = amountS1;
        this.amountS2 = amountS2;
        this.amountS3 = amountS3;
    }
}
