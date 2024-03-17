import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountancyAddEditComponent } from './accountancy-add-edit.component';

describe('CountyAddEditComponent', () => {
  let component: AccountancyAddEditComponent;
  let fixture: ComponentFixture<AccountancyAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountancyAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountancyAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
