import { CodeNameEntity } from "../common/code-name-entity";

export class Division {
    id: number;
    code: string;
    name: string;
    state: any; notSync: any; isLocked: any;
    departmentId: number;
    department: CodeNameEntity;

    constructor(id: number, code: string, name: string) {
        this.id = id;
        this.code = code;
        this.name = name;
    }
}