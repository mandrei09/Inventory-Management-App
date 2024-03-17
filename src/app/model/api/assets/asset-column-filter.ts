
export class AssetColumnFilter {
  invStateIds: number[] = [];
  materialIds: number[] = [];
  locationIds: number[] = [];
  costCenterIds: number[] = [];
  accountIds: number[] = [];
  partnerIds: number[] = [];
  admAccountCode: string;
  admExpAccountCode: string;
  admAssetCode: string;
  description: string;
  emailTransfer: string;
  invNo: string;
  internalCode: string;
  serialNumber: string;
  quantity: string;
  subNumber: string;
  inventoryNumber: string;

  constructor(
    invStateIds: number[],
    materialIds: number[],
    locationIds: number[],
    costCenterIds: number[],
    accountIds: number[],
    partnersIds : number[],
    admAccountCode: string | undefined,
    admExpAccountCode: string | undefined,
    admAssetCode: string | undefined,
    description: string | undefined,
    emailTransfer: string | undefined,
    invNo: string | undefined,
    internalCode: string | undefined,
    serialNumber: string | undefined,
    quantity: string | undefined,
    subNumber: string | undefined,
    inventoryNumber: string | undefined,
  ) {

    this.invStateIds = invStateIds;
    this.materialIds = materialIds;
    this.locationIds = locationIds;
    this.costCenterIds = costCenterIds;
    this.accountIds = accountIds;
    this.partnerIds = partnersIds;
    this.admAccountCode = admAccountCode;
    this.admExpAccountCode = admExpAccountCode;
    this.admAssetCode = admAssetCode;
    this.description = description;
    this.emailTransfer = emailTransfer;
    this.invNo = invNo;
    this.internalCode = internalCode;
    this.serialNumber = serialNumber;
    this.quantity = quantity;
    this.subNumber = subNumber;
    this.inventoryNumber = inventoryNumber;
  }
}
