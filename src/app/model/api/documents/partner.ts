import { PartnerLocation } from "./partner-location";
import { EntityFile } from '../common/entity-file';

export class Partner {
    id: number;
    code: string;
    name: string;
    fiscalCode: string;
    registryNumber: string;
    address: string;
    contactInfo: string;
    bank: string;
    bankAccount: string;
    payingAccount: string;
    erpCode: string;
    partnerId: number;
    headerMsg: string;
    footerMsg: string;
    state: any; notSync: any; isLocked: any;
    isLeftSide: boolean;
    partnerLocation: PartnerLocation;
    filesCount: number;
    entityFiles: Array<EntityFile>;
}
