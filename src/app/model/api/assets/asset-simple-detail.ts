import { EmployeeResource } from "../administration/employee-resource";
import { CodeNameEntity } from "../common/code-name-entity";

export class AssetSimpleDetail {
    id: number;
    invNo: string;
    name: string;
    serialNumber: string;
    purchaseDate: Date;
    partner: string;
    sapCode: string;
    assetType: string;
    assetState: string;
    appStateId: number;
    state: CodeNameEntity;
    orderType: CodeNameEntity;
    company: CodeNameEntity;
    employeeTransfer: EmployeeResource;
    usageStartDate: Date;
    costCenterCode: string;
    roomCode: string;
    employeeId: number;
    employeeTransferId: number;
    costCenterId: number;
    adm: any;
    isInTransfer: boolean;
    isLocked: boolean;
    isPrinted: boolean;
    appState; CodeNameEntity;
    subNo: string;
    storno: boolean;
    cassation: boolean;
    inSapValidation: string;

    constructor(id: number, invNo: string, name: string, serialNumber: string, purchaseDate: Date, partner: string, sapCode: string, assetType: string,
        assetState: string, appStateId: number, company: CodeNameEntity, usageStartDate: Date, costCenterCode: string,
        roomCode: string, employeeId: number, adm: any, isInTransfer: boolean, isPrinted: boolean, subNo: string, inSapValidation: string) {
        this.id = id;
        this.invNo = invNo;
        this.name = name;
        this.serialNumber = serialNumber;
        this.purchaseDate = purchaseDate;
        this.partner = partner;
        this.sapCode = sapCode;
        this.assetType = assetType;
        this.assetState = assetState;
        this.appStateId = appStateId;
        this.company = company;
        this.usageStartDate = usageStartDate;
        this.costCenterCode = costCenterCode;
        this.roomCode = roomCode;
        this.employeeId = employeeId;
        this.adm = adm;
        this.isInTransfer = isInTransfer;
        this.isPrinted = isPrinted;
        this.subNo = subNo;
        this.inSapValidation = inSapValidation;

    }
}
