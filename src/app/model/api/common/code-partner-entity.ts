import { EntityFile } from "./entity-file";

export class CodePartnerEntity {
    id: number;
    name: string;
    registryNumber: string;
    contactInfo: string;
    bank: string;
    bankAccount: string;
    entityFiles: Array<EntityFile>;

    constructor (id: number, name: string, contactInfo: string,
        bank: string,
        bankAccount: string, entityFiles: Array<EntityFile>) {
        this.id = id;
        this.name = name;
        this.registryNumber = this.registryNumber;
        this.contactInfo = contactInfo;
        this.bank = bank;
        this.bankAccount = bankAccount;
        this.entityFiles = entityFiles
    }
}
