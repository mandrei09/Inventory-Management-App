export class SubTypePartner {
    id: number;
    subTypeId: number;
    partnerId: number;
    constructor(id: number, subTypeId: number, partnerId: number) {
        this.id = id;
        this.subTypeId = subTypeId;
        this.partnerId = partnerId;
    }
}
