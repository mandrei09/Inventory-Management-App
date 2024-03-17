import { Component, Input, Output, EventEmitter } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {DateRange, MonthDate} from '../event-emitter';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import {MonthpickerDateAdapter} from '../../model/common/month-datepicker-adapter';
import {Platform} from '@angular/cdk/platform';

@Component({
  selector: 'app-common-header',
  templateUrl: 'common-header.component.html',
  styleUrls: ['./common-header.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MonthpickerDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
  ],
})

export class CommonHeaderComponent {

  public startDate: Date | null = null;
  public endDate: Date | null = null;

  @Input() public pageCode: string = '';
  @Input() public itemList: any = null;
  @Input() public showAddNewButton: string = 'true';
  @Input() public showExportStatus: string = 'false';
  @Input() public showExport: string = 'false';
  @Input() public showImport: string = 'false';
  @Input() public showDataMenu: string = 'false';
  @Input() public showSecondFilter: boolean = false;
  @Input() public showDatepicker: boolean = false;
  @Input() public showMonthDatepicker: boolean = false;
  @Input() public datepickerPlaceholder: string = '';
  @Output() public filterChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() public secondFilterChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() public addNew: EventEmitter<void> = new EventEmitter<void>();
  @Output() public onDaterangeChange: EventEmitter<MatDatepickerInputEvent<Date>> = new EventEmitter<any>();
  @Output() public importData: EventEmitter<void> = new EventEmitter<void>();
  @Output() public exportData: EventEmitter<void> = new EventEmitter<void>();
  @Output() public exportDataPOStatus: EventEmitter<void> = new EventEmitter<void>();
  @Output() public refreshFilters: EventEmitter<void> = new EventEmitter<void>();
  @Output() public onColumnConfiguration: EventEmitter<void> = new EventEmitter<void>();
  @Output() public dateRangeChanged: EventEmitter<DateRange> = new EventEmitter<DateRange>();
  @Output() public monthDatePickerChanged: EventEmitter<MonthDate> = new EventEmitter<MonthDate>();

  @Input()
  public monthAndYear: Date | null = null;

  @Output()
  public monthAndYearChange = new EventEmitter<Date | null>();

  public emitDateChange(event: MatDatepickerInputEvent<Date | null, unknown>): void {
    this.monthAndYearChange.emit(event.value);
  }

  public monthChanged(value: any, widget: any): void {
    this.monthAndYear = value;
    widget.close();
    this.notifyMonthDatepickerChange();
  }

  public _filter: string = '';
  public get filter(): string { return this._filter; }
  public set filter(value: string) {
    this._filter = value;
  }

  public _secondFilter: string = '';
  public get secondFilter(): string { return this._secondFilter; }
  public set secondFilter(value: string) {
    this._secondFilter = value;
  }

  constructor() {
  }

  public resetDateRange() {
    this.startDate = null;
    this.endDate = null;

    this.notifyDateChange();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    // if (this.dateRangeReset) {
    //   this.dateRangeReset.subscribe(() => {
    //     this.resetDateRange()
    //   });
    // }
  }

  public reset() {
    this.filter = '';
    this.resetDateRange();
  }

  public notifyDateChange() {
    this.dateRangeChanged.emit(new DateRange(this.startDate, this.endDate));
  }

  public notifyMonthDatepickerChange() {
    this.monthDatePickerChanged.emit(new MonthDate(this.monthAndYear));
  }
}
