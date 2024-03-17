export class DateRange {
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor (startDate: Date | null, endDate: Date | null) {
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

export class MonthDate {
  monthAndYear: Date | null = null;

  constructor (monthAndYear: Date | null) {
    this.monthAndYear = monthAndYear;
  }
}
