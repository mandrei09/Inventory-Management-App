import { CodeNameEntity } from "../common/code-name-entity";
import { EmployeeResource } from "./employee-resource";

export class EmployeeCompany {
    id: number;
    company: CodeNameEntity;
    employee: EmployeeResource;
    state: any; notSync: any; isLocked: any;

    constructor (id: number, company: CodeNameEntity, employee: EmployeeResource) {
        this.id = id;
        this.company = company;
        this.employee = employee;
    }
}
