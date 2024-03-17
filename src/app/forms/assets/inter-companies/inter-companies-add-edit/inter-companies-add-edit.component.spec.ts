import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterCompaniesAddEditComponent } from './inter-companies-add-edit.component';

describe('CategoryAddEditComponent', () => {
  let component: InterCompaniesAddEditComponent;
  let fixture: ComponentFixture<InterCompaniesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterCompaniesAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterCompaniesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
