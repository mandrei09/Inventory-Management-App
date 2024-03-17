import { CodeNameEntity } from '../common/code-name-entity';

export class SubCategory {
    id: number;
    code: string;
    name: string;
    category: CodeNameEntity;
    categoryEN: CodeNameEntity;
    state: any; notSync: any; isLocked: any;

    constructor(id: number, code: string, name: string, category: CodeNameEntity, categoryEN: CodeNameEntity) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.category = category;
        this.categoryEN = categoryEN;
    }
}
