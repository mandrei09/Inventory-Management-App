import { CodeNameEntity } from "../common/code-name-entity";
import { EmployeeResource } from "./employee-resource";
import { Matrix } from "./matrix";

export class MatrixLevel {
    id: number;
    amount: number;
    level: CodeNameEntity;
    matrix: Matrix;
    uom: CodeNameEntity;
    employee: EmployeeResource;
    state: any; notSync: any; isLocked: any;

    constructor(id: number,
        amount: number,
        level: CodeNameEntity,
        matrix: Matrix,
        uom: CodeNameEntity,
        employee: EmployeeResource) {
        this.id = id;
        this.amount = amount;
        this.level = level;
        this.matrix = matrix;
        this.uom = uom;
        this.employee = employee;
    }
}
