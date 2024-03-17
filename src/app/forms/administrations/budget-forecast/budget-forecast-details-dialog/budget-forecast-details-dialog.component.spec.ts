import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetForecastDetailsDialogComponent } from './budget-forecast-details-dialog.component';

describe('AssetAddEditComponent', () => {
  let component: BudgetForecastDetailsDialogComponent;
  let fixture: ComponentFixture<BudgetForecastDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetForecastDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetForecastDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
