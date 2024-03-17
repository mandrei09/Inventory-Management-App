export class OfferMaterialUpdate {
    id: number;
    quantity: number;
    price: number;
    wip: boolean;
    rateValue: number;
    rateDate: Date;
    uomId: number;

    constructor (id: number, quantity: number, price: number, wip: boolean, rateValue: number, rateDate: Date, uomId: number) {
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.wip = wip;
        this.rateValue = rateValue;
        this.rateDate = rateDate;
        this.uomId = uomId;
    }
}
