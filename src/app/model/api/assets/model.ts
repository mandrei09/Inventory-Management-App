import { CodeNameEntity } from "../common/code-name-entity";

export class Model {
    id: number;
    code: string;
    name: string;
    snLength: number;
    imeiLength: number;
    state: any; notSync: any; isLocked: any;
    brand: CodeNameEntity;

    constructor (id: number, code: string, name: string, snLength: number,
      imeiLength: number, brand: CodeNameEntity) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.snLength = snLength;
        this.imeiLength = imeiLength;
        this.brand = brand;
    }
}
