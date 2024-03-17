export class AccMonth {
    id: number;
    month: number;
    year: number;
    isActive: boolean;
    createDate: Date;
    endDate: Date;
    state: any; notSync: any; isLocked: any;

    constructor(id: number, month: number, year: number, isActive: boolean, createDate: Date, endDate: Date) {
        this.id = id;
        this.month = month;
        this.year = year;
        this.isActive = isActive;
        this.createDate = createDate;
        this.endDate = endDate;
    }
}