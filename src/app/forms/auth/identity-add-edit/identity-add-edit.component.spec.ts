import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityAddEditComponent } from './identity-add-edit.component';

describe('IdentityAddEditComponent', () => {
  let component: IdentityAddEditComponent;
  let fixture: ComponentFixture<IdentityAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentityAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentityAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
