import { CodeNameEntity } from "./code-name-entity";
import { RateEntity } from "./rate-entity";

export class ContractAmountEntity {
    id: number;
    amount: number;
    amountRon: number;
    amountRem: number;
    amountRonRem: number;
    amountUsed: number;
    amountRonUsed: number;
    uom: CodeNameEntity;
    rate: RateEntity;
    name: string;

    constructor (id: number, amount: number,
        amountRon: number,
        amountRem: number,
        amountRonRem: number,
        amountUsed: number,
        amountRonUsed: number, uom: CodeNameEntity, rate: RateEntity) {
        this.id = id;
        this.amount = amount;
        this.amountRon = amountRon;
        this.amountRem = amountRem;
        this.amountRonRem = amountRonRem;
        this.amountUsed = amountUsed;
        this.amountRonUsed = amountRonUsed;
        this.uom = uom;
        this.rate = rate;
    }
}