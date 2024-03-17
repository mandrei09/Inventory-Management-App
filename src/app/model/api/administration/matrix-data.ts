import { EmployeeResource } from './employee-resource';

export class MatrixData {
    name: string | undefined;
    children: MatrixChildrenBase[] | undefined;
}

export class MatrixChildrenBase {
    amount: number | undefined;
    employee: EmployeeResource | undefined;
}
