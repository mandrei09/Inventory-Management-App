import { CodeNameEntity } from '../common/code-name-entity';

export class Rate {
    id: number;
    code: string;
    name: string;
    uom: CodeNameEntity;
    value: number;
    state: any; notSync: any; isLocked: any;

    constructor(id: number, code: string, name: string, uom: CodeNameEntity, value: number) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.uom = uom;
    }
}
