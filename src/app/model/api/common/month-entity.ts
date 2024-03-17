export class MonthEntity {
    id: number;
    month: number;
    year: number;
    fiscalMonth: number;
    fiscalYear: number;

    constructor (id: number, month: number,
      year: number,
      fiscalMonth: number,
      fiscalYear: number) {
        this.id = id;
        this.month = month;
        this.year = year;
        this.fiscalMonth = fiscalMonth;
        this.fiscalYear = fiscalYear;
    }
}
