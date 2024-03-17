import { CodeNameEntity } from "../common/code-name-entity";
export class Accountancy {
    id: number;
    account: CodeNameEntity;
    expAccount: CodeNameEntity;
    assetType: CodeNameEntity;
    assetCategory: CodeNameEntity;
    // interCompany: CodeNameEntity;
    subCategory: CodeNameEntity;
    value: number;
    state: any; notSync: any; isLocked: any;

    constructor (id: number,  account: CodeNameEntity,
        expAccount: CodeNameEntity,
        assetType: CodeNameEntity,
        assetCategory: CodeNameEntity,
        // interCompany: CodeNameEntity, 
        subCategory: CodeNameEntity, value: number) {
        this.id = id;
        this.account = account;
        this.expAccount = expAccount;
        this.assetType = assetType;
        this.assetCategory = assetCategory;
        // this.interCompany = interCompany;
        this.subCategory = subCategory;
        this.value = value;
    }
}
