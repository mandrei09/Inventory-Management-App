import { PagingInfo } from "../../common/paging-info";
import { CodeNameEntity } from "./code-name-entity";

export class AssetStatusDashboard {
    items: Array<AssetStatusItems>;
    pagingInfo: PagingInfo;
    totals: number;
}


export class AssetStatusItems {
    isPrinted: boolean;
    isDuplicate: boolean;
    invNo: string;
    name: string;
    serialNumber: string;
    purchaseDate: string;
    modifiedAt: string;
    departmentInitial: CodeNameEntity;
}

export class AssetStatusTotal {
    count: number;
    valueInv: number;
    valueRem: number;
}

