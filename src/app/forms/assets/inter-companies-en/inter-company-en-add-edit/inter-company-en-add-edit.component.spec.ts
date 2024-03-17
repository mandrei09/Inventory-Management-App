import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterCompanyEnAddEditComponent } from './inter-company-en-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: InterCompanyEnAddEditComponent;
  let fixture: ComponentFixture<InterCompanyEnAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterCompanyEnAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterCompanyEnAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
