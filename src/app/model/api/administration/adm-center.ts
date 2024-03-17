export class AdmCenter {
    id: number;
    code: string;
    name: string;
    user: string;
    employeeId: number;
    state: any; notSync: any; isLocked: any;

    constructor(id: number, code: string, name: string, user: string, employeeId: number) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.user = user;
        this.employeeId = employeeId;
    }
}
