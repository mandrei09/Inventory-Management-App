import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmReconciliationModalComponent } from './confirm-reconciliation-modal.component';

describe('ConfirmReconciliationModalComponent', () => {
  let component: ConfirmReconciliationModalComponent;
  let fixture: ComponentFixture<ConfirmReconciliationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmReconciliationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmReconciliationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
