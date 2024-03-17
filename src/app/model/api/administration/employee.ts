import { CostCenter } from "./cost-center";

export class Employee {
    id: number;
    internalCode: string;
    firstName: string;
    lastName: string;
    departmentId: number;
    email: string;
    erpCode: string;
    isDeleted: boolean;
    state: any; notSync: any; isLocked: any;
    costCenters: CostCenter[];
    costCenter: CostCenter;
    validate: boolean;
    isConfirmed : boolean; 

    constructor(id: number, internalCode: string, firstName: string, lastName: string, departmentId: number, email: string, erpCode: string, isDeleted: boolean,isConfirmed? : boolean) {
        this.id = id;
        this.internalCode = internalCode;
        this.firstName = firstName;
        this.lastName = lastName;
        this.departmentId = departmentId;
        this.email = email;
        this.erpCode = erpCode;
        this.isDeleted = isDeleted;
        this.isConfirmed = isConfirmed;
    }
}