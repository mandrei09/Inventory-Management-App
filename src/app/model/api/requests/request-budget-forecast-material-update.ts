export class RequestBudgetForecastMaterialUpdate {
    id: number;
    quantity: number;
    valueRon: number;

    constructor (id: number, quantity: number, valueRon: number) {
        this.id = id;
        this.quantity = quantity;
        this.valueRon = valueRon;
    }
}
