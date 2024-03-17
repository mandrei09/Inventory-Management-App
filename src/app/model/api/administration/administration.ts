import { CodeNameEntity } from "../common/code-name-entity";

export class Administration {
    id: number;
    code: string;
    name: string;
    costCenter: CodeNameEntity;
    division: CodeNameEntity;
    state: any; notSync: any; isLocked: any;

    constructor (id: number, code: string, name: string, costCenter: CodeNameEntity, division: CodeNameEntity) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.costCenter = costCenter;
        this.division = division;
    }
}
