 export class PartnerRequest {
    cui: string;
    data: string;
    partnerId: number;

    constructor (cui: string, data: string, partnerId: number) {
        this.cui = cui;
        this.data = data;
        this.partnerId = partnerId;
    }
}