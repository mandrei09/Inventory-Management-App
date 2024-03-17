import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconciliationModalComponent } from './reconciliation-modal.component';

describe('ReconciliationModalComponent', () => {
  let component: ReconciliationModalComponent;
  let fixture: ComponentFixture<ReconciliationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconciliationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReconciliationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
