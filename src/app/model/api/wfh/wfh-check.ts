import { CodeNameEntity } from "../common/code-name-entity";

export class WFHCheck {
    id: number;
    imei: string;
    serialNumber: string;
    inventoryNumber: string;
    dictionaryItemId: number;
    dictionaryItem: CodeNameEntity;
    brandId: number;
    brand: CodeNameEntity;
    modelId: number;
    model: CodeNameEntity;
    budgetManagerId: number;
    budgetManager: CodeNameEntity;
    state: any; notSync: any; isLocked: any;

    constructor(id: number, imei: string, serialNumber: string, inventoryNumber: string) {
        this.id = id;
        this.imei = imei;
        this.serialNumber = serialNumber;
        this.inventoryNumber = inventoryNumber;
    }
}
