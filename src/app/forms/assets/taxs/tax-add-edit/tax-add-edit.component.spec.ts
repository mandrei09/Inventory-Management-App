import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxAddEditComponent } from './tax-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: TaxAddEditComponent;
  let fixture: ComponentFixture<TaxAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
