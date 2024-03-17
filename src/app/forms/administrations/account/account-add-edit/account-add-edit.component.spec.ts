import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAddEditComponent } from './account-add-edit.component';

describe('CityAddEditComponent', () => {
  let component: AccountAddEditComponent;
  let fixture: ComponentFixture<AccountAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
