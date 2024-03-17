import { CodeNameEntity } from '../common/code-name-entity';
export class AssetAsyncErrors {
    id: number;
    code: string;
    name: string;
    state: any; 
    constructor(id: number, code: string, name: string, state: CodeNameEntity, value: number) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.state = state;
    }
}