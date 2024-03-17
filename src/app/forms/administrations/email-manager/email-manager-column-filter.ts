
export class EmailManagerColumnFilter {
  offerIds: number[] = [];
  emailTypeIds: number[] = [];
  appStateIds: number[] = [];
  date: any;
  partnerRegistryNumber: string;
  prCode: string;
  info: string;
  searchedSupplier : string;

  constructor(
    offerIds: number[],
    emailTypeIds: number[],
    appStateIds: number[],
    date: any,
    partnerRegistryNumber: string,
    prCode: string,
    info: string,
    searchedSupplier : string
  ) {

    this.offerIds = offerIds;
    this.emailTypeIds = emailTypeIds;
    this.appStateIds = appStateIds;
    this.partnerRegistryNumber = partnerRegistryNumber;
    this.date = date;
    this.prCode = prCode;
    this.info = info;
    this.searchedSupplier = searchedSupplier;
  }
}
