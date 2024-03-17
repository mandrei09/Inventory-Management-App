export class AssetTransferSAP {
    id: number;

    accountId: number;
    expAccountId: number;
    assetCategoryId: number;
    partnerId: number;

    articleId: number;
    costCenterId: number;
    divisionId: number;
    departmentId: number;

    roomId: number;
    budgetManagerId: number;
    assetNatureId: number;
    typeId: number;

    employeeId: number;
    materialId: number;
    interCompanyId: number;
    subTypeId: number;

    assetClassId: number;
    admCenterId: number;
    regionId: number;
    insuranceCategoryId: number;

    assetTypeId: number;
    projectId: number;
    orderId: number;
    dictionaryItemId: number;


    invNo: string;
    subNo: string;
    quantity: number;
    erpCode: string;
    license: string;
    docNo1: string;

    serialNumber: string;
    agreement: string;
    manufacturer: string;
    sapCode: string;

    depPeriodMonth: number;
    depPeriod: number;
    depPeriodIn: number;
    depPeriodRem: number;

    valueInvIn: number;
    valueDepIn: number;
    valueDepPU: number;
    valueDepYTDIn: number;

    valueDepYTD: number;
    valueRet: number;
    valueRetIn: number;
    valueDepPUIn: number;

    valueTr: number;
    valueTrIn: number;
    valueRem: number;
    valueRemIn: number;

    investSupport: number;
    writeUps: number;
    valueInv: number;
    valueDep: number;

    purchaseDate: Date;
    invoiceDate: Date;
    removalDate: Date;
    headerText: string;
    taxId: number;
    rateId: number;
    totalAmount: number;
    postCap: boolean;
    inConservation: boolean;
    capitalizationDate: Date;
    validated: boolean;
    name: string;
    assetValueDate: Date;
    valueInvRon: number;
    rateValue: number;
    uomId: number;

}


export class SaveAssetTransfer {
    itemText: string;
    refDocNo: string;
    completeTransfer: boolean;
    priorYearAcquisitions: boolean;
    currentYearAcquisitions: boolean;
    amount: number;
    percent: number;
    quantity: number;
    uomId: number;
    fromAssetId: number;
    toAssetId: number;
}

export class SaveAssetCloneTransfer {
    itemText: string;
    refDocNo: string;
    // completeTransfer: boolean;
    priorYearAcquisitions: boolean;
    currentYearAcquisitions: boolean;
    // amount: number;
    // percent: number;
    // quantity: number;
    uomId: number;
    fromAssetId: number;
    toAssetId: number;
    toAssetInvNo: string;
    toAssetSubNo: string;
    toAssetQuantity: number;
    toAssetName: string;
    toAssetExpAccountId: number;
    toAssetCompanyId: number;
    toAssetSerialNumber: string;
    toAssetCostCenterId: number;
    toAssetEmployeeId: number;
    toAssetPlantId: number;
    toAssetLocationId: number;
    toAssetRoomId: number;
    toAssetAssetCategoryId: number;
    toAssetPartnerId: number;
    toAssetInvoice: string;
}
