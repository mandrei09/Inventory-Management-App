import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneValidationDialogComponent } from './phone-validation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: PhoneValidationDialogComponent;
  let fixture: ComponentFixture<PhoneValidationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneValidationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneValidationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
