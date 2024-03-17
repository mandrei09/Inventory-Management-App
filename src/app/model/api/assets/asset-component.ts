import { AssetEntity } from '../common/asset-entity';
import { Employee } from '../administration/employee';
import { EmployeeResource } from '../administration/employee-resource';
import { CodeNameEntity } from '../common/code-name-entity';

export class AssetComponent {
    id: number;
    code: string;
    name: string;
    asset: AssetEntity;
    employee: EmployeeResource;
    subType: CodeNameEntity;
    state; any; notSync: any; isLocked: any;

    constructor (id: number, code: string, name: string, asset: AssetEntity, employee: EmployeeResource, subType: CodeNameEntity) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.asset = asset;
        this.employee = employee;
        this.subType = subType;
    }
}