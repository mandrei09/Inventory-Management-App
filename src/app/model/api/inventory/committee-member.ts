
import { Employee } from "../administration/employee";
import { InvCommittePostion } from "./inv-committee-position";
import { InvCommittee } from "./inv-committtee";

export class InvCommitteMember {
    id: number;
    employeeId: number;
    employee: Employee;
    invCommittee: InvCommittee;
    invCommitteeId: number;
    isDeleted: boolean;
    committeePosition: InvCommittePostion
    invCommitteePositionId: number
    inventoryPlanId : number;
    // constructor(id: number, employee: Employee, committeePosition: InvCommittePostion) {
    //     this.id = id;
    //     this.employee = employee;
    //     this.committeePosition = committeePosition;
    // }
}
