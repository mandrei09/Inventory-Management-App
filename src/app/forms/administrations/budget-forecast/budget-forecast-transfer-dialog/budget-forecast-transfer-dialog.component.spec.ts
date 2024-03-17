import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetForecastTransferDialogComponent } from './budget-forecast-transfer-dialog.component';

describe('AssetAddEditComponent', () => {
  let component: BudgetForecastTransferDialogComponent;
  let fixture: ComponentFixture<BudgetForecastTransferDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetForecastTransferDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetForecastTransferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
