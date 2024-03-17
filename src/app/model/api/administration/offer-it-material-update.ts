export class OfferITMaterialUpdate {
    id: number;
    quantity: number;
    price: number;
    wip: boolean;
    guid: string;

    constructor (id: number, quantity: number, price: number, wip: boolean, guid: string) {
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.wip = wip;
        this.guid = guid;
    }
}
