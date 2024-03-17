export class AssetClass {
    id: number;
    code: string;
    name: string;

    assetClassTypeId: number;
    parentAssetClassId: number;

    depPeriodMin: number;
    depPeriodMax: number;
    depPeriodDefault: number;
    state: any; notSync: any; isLocked: any;
}