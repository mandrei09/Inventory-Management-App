import { CodeNameEntity } from '../common/code-name-entity';

export class SubCategoryEN {
    id: number;
    code: string;
    name: string;
    categoryEN: CodeNameEntity;
    state: any; notSync: any; isLocked: any;

    constructor(id: number, code: string, name: string, categoryEN: CodeNameEntity) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.categoryEN = categoryEN;
    }
}
