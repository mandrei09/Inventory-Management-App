import { CodeNameEntity } from "../common/code-name-entity";
import { Partner } from "../documents/partner";
import { Offer } from "./offer";

export class EmailManager {
    id: number;
    code: string;
    name: string;
    state: any; notSync: any; isLocked: any;
    emailType: CodeNameEntity;
    offer: Offer;
    partner: Partner;

    constructor (id: number, code: string, name: string, emailType: CodeNameEntity) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.emailType = emailType;
        this.offer = this.offer;
    }
}
