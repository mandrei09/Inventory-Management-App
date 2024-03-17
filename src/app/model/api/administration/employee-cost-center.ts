import { CodeNameEntity } from "../common/code-name-entity";
import { EmployeeResource } from "./employee-resource";

export class EmployeeCostCenter {
    id: number;
    costCenter: CodeNameEntity;
    employee: EmployeeResource;
    state: any; notSync: any; isLocked: any;

    constructor (id: number, costCenter: CodeNameEntity, employee: EmployeeResource) {
        this.id = id;
        this.costCenter = costCenter;
        this.employee = employee;
    }
}
