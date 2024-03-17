import { CodeNameEntity } from '../common/code-name-entity';

export class Material {
    id: number;
    code: string;
    name: string;
    account: CodeNameEntity;
    expAccount: CodeNameEntity;
    assetCategory: CodeNameEntity;
    subCategory: CodeNameEntity;
    subCategoryEN: CodeNameEntity;
    subType: CodeNameEntity;
    price: number;
    quantity: number;
    ean: string;
    partNumber: string;
    state: any; notSync: any; isLocked: any;

    constructor (id: number, code: string, name: string, account: CodeNameEntity,
        expAccount: CodeNameEntity,
        assetCategory: CodeNameEntity,
        subCategory: CodeNameEntity,
        subCategoryEN: CodeNameEntity,
        subType: CodeNameEntity, price: number,
        quantity: number, ean: string,
        partNumber: string) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.account = account;
        this.expAccount = expAccount;
        this.assetCategory = assetCategory;
        this.subCategory = subCategory;
        this.subCategoryEN = subCategoryEN;
        this.subType = subType;
        this.quantity = quantity;
        this.price = price;
        this.ean = ean;
        this.partNumber = partNumber;
    }
}
