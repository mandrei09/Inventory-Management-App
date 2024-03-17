import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetManagerAddEditComponent } from './budget-manager-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: BudgetManagerAddEditComponent;
  let fixture: ComponentFixture<BudgetManagerAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetManagerAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetManagerAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
