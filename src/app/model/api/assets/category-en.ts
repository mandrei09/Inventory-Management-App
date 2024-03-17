import { CodeNameEntity } from '../common/code-name-entity';

export class CategoryEN {
    id: number;
    code: string;
    name: string;
    interCompanyEN: CodeNameEntity;
    state: any; notSync: any; isLocked: any;

    constructor(id: number, code: string, name: string, interCompanyEN: CodeNameEntity) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.interCompanyEN = interCompanyEN;
    }
}
