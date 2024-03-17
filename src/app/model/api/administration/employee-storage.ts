import { CodeNameEntity } from "../common/code-name-entity";
import { EmployeeResource } from "./employee-resource";

export class EmployeeStorage {
    id: number;
    storage: CodeNameEntity;
    employee: EmployeeResource;
    state: any; notSync: any; isLocked: any;

    constructor (id: number, storage: CodeNameEntity, employee: EmployeeResource) {
        this.id = id;
        this.storage = storage;
        this.employee = employee;
    }
}
