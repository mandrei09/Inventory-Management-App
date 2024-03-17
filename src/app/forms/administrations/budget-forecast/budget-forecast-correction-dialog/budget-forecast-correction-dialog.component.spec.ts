import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetForecastCorrectionDialogComponent } from './budget-forecast-correction-dialog.component';

describe('AssetAddEditComponent', () => {
  let component: BudgetForecastCorrectionDialogComponent;
  let fixture: ComponentFixture<BudgetForecastCorrectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetForecastCorrectionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetForecastCorrectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
