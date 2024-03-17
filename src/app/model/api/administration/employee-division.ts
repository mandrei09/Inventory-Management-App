import { CodeNameEntity } from "../common/code-name-entity";
import { EmployeeResource } from "./employee-resource";

export class EmployeeDivision {
    id: number;
    division: CodeNameEntity;
    department: CodeNameEntity;
    employee: EmployeeResource;
    state: any; notSync: any; isLocked: any;
    constructor (id: number, division: CodeNameEntity, department: CodeNameEntity, employee: EmployeeResource) {
        this.id = id;
        this.division = division;
        this.department = department;
        this.employee = employee;
    }
}
