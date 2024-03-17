import { CodeNameEntity } from "../common/code-name-entity";

export class Dimension {
    id: number;
    length: string; //code
    width: string; //um
    height: string;
    assetCategory: CodeNameEntity;
    state: any; notSync: any; isLocked: any;

    constructor (id: number, length: string, width: string, height: string, assetCategory: CodeNameEntity) {
        this.id = id;
        this.length = length;
        this.width = width;
        this.height = height;
        this.assetCategory = assetCategory;
    }
}
