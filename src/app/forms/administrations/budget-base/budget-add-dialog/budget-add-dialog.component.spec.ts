import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAddDialogComponent } from './budget-add-dialog.component';

describe('AssetAddEditComponent', () => {
  let component: BudgetAddDialogComponent;
  let fixture: ComponentFixture<BudgetAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
