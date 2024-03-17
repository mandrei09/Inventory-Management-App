export class AssetNature {
    id: number;
    code: string;
    name: string;
    assetTypeId: number;
    state: any; notSync: any; isLocked: any;
    constructor(id: number, code: string, name: string, assetTypeId: number) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.assetTypeId = assetTypeId;
    }
}
