export class RequestBudgetForecastMaterialCostCenterStorno {
    id: number;
    storno: boolean;
    stornoValue: number;

    constructor (id: number, storno: boolean, stornoValue: number) {
        this.id = id;
        this.storno = storno;
        this.stornoValue = stornoValue;
    }
}
;
