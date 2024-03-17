export class OrderMaterialUpdate {
    id: number;
    quantity: number;
    price: number;
    priceRon: number;
    value: number;
    valueRon: number;
    preAmount: number;

    constructor (id: number, quantity: number, price: number, priceRon: number, value: number, valueRon: number, preAmount: number) {
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.priceRon = priceRon;
        this.value = value;
        this.valueRon = valueRon;
        this.preAmount = preAmount;
    }
}


export class StockMaterialUpdate {
    id: number;
    quantity: number;
    price: number;
    priceRon: number;
    value: number;
    valueRon: number;
    preAmount: number;

    constructor (id: number, quantity: number, price: number, priceRon: number, value: number, valueRon: number, preAmount: number) {
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.priceRon = priceRon;
        this.value = value;
        this.valueRon = valueRon;
        this.preAmount = preAmount;
    }
}
