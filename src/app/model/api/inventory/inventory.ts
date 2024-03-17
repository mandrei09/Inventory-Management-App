import { AccMonth } from "../accounting/acc-month";

export class Inventory {
    id: number;
    description: string;
    start: Date;
    end: Date;
    active: boolean;
    accMonth: AccMonth;
    accMonthBudget: AccMonth;
    state: any; notSync: any; isLocked: any;

    constructor (id: number, description: string, start: Date, end: Date, active: boolean, accMonth: AccMonth, accMonthBudget: AccMonth) {
        this.id = id;
        this.description = description;
        this.start = start;
        this.end = end;
        this.active = active;
        this.accMonth = accMonth;
        this.accMonthBudget = accMonthBudget;
    }
}
