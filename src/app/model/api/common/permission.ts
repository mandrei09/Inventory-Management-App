import { CodeNameEntity } from "../common/code-name-entity";
export class Permission {
    id: number;
    code: string;
    name: string;
    permissionType: CodeNameEntity;
    state: any; notSync: any; isLocked: any;

    constructor (id: number, code: string, name: string, permissionType: CodeNameEntity) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.permissionType = permissionType;
    }
}
