import { CodePartnerEntity } from "../common/code-partner-entity";
import { ContractAmountEntity } from "../common/contract-amount-entity";

export class Contract {
    id: number;
    contractID: string;
    contractAmount: ContractAmountEntity;
    partner: CodePartnerEntity;
    code: string;
    title: string;

    constructor(id: number, contractID: string, contractAmount: ContractAmountEntity, partner: CodePartnerEntity, code: string, title: string) {
        this.id = id;
        this.contractID = contractID;
        this.contractAmount = contractAmount;
        this.partner = partner;
        this.code = code;
        this.title = title;
    }
}
