import { CodeNameEntity } from "../common/code-name-entity";
import { RoleEntity } from "./role-entity";

export class PermissionRole {
    id: number;
    code: string;
    name: string;
    permission: CodeNameEntity;
    permissionType: CodeNameEntity;
    role: RoleEntity;
    state: any; notSync: any; isLocked: any;

    constructor (id: number, code: string, name: string, permission: CodeNameEntity, permissionType: CodeNameEntity, role: RoleEntity) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.permission = permission;
        this.permissionType = permissionType;
        this.role = role;
    }
}
