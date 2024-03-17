export class BudgetManager {
    id: number;
    code: string;
    name: string;
    uomId: number;
    state: any; notSync: any; isLocked: any;

    constructor(id: number, code: string, name: string, uomId: number) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.uomId = uomId;
    }
}
