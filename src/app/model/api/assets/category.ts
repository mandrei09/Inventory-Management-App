import { CodeNameEntity } from '../common/code-name-entity';

export class Category {
    id: number;
    code: string;
    name: string;
    interCompany: CodeNameEntity;
    categoryEN: CodeNameEntity;
    state: any; notSync: any; isLocked: any;

    constructor(id: number, code: string, name: string, interCompany: CodeNameEntity, category: CodeNameEntity) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.interCompany = interCompany;
        this.categoryEN = this.categoryEN;
    }
}
