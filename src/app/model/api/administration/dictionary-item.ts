import { CodeNameEntity } from "../common/code-name-entity";

export class DictionaryItem {
    id: number;
    code: string;
    name: string;
    state: any; notSync: any; isLocked: any;
    dictionaryType: CodeNameEntity;
    assetCategory: CodeNameEntity;

    constructor (id: number, code: string, name: string, dictionaryType: CodeNameEntity, assetCategory: CodeNameEntity) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.dictionaryType = dictionaryType;
        this.assetCategory = assetCategory;
    }
}