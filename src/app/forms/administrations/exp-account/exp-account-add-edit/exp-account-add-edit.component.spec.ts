import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpAccountAddEditComponent } from './exp-account-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: ExpAccountAddEditComponent;
  let fixture: ComponentFixture<ExpAccountAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpAccountAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpAccountAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
