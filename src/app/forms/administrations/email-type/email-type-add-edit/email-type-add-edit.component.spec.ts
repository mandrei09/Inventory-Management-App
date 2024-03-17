import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTypeAddEditComponent } from './email-type-add-edit.component';

describe('SettingAddEditComponent', () => {
  let component: EmailTypeAddEditComponent;
  let fixture: ComponentFixture<EmailTypeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailTypeAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
