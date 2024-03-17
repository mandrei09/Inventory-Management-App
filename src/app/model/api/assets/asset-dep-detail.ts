import { CodeNameEntity } from "../common/code-name-entity";

export class AssetDepDetail {
    id: number;
    invNo: string;
    name: string;
    usageStartDate: Date;
    assetTypeId: number;
    assetType: string;
    assetStateId: number;
    assetState: string;
    costCenterId: number;
    costCenter: string;
    assetClassId: number;
    assetClassCode: string;
    assetClassName: string;
    documentId: number;
    docNo1: string;
    docNo2: string;
    partnerId: number;
    partner: string;
    valueInv: number;
    depPeriod: number;
    valueRem: number;
    depPeriodRem: number;
    valueDepPU: number;
    depPeriodMonth: number;
    valueDep: number;
    valueDepYTD: number;
    sapCode: string;
    company: CodeNameEntity;
    subNo: string;
}
