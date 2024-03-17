import { RoleEntity } from "./role-entity";

export class ConfigValue {
    id: number;
    group: string;
    code: string;
    description: string;
    valueType: string;
    textValue: string;
    boolValue: boolean;
    dateValue: Date;
    numericValue: number;
    companyId: number;
    isDeleted: boolean;
    roleId: string;
    role: RoleEntity;
    state: any; notSync: any; isLocked: any;
}