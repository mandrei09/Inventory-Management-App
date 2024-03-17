import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccMonthAddEditComponent } from './acc-month-add-edit.component';

describe('MonthAddEditComponent', () => {
  let component: AccMonthAddEditComponent;
  let fixture: ComponentFixture<AccMonthAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccMonthAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccMonthAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
