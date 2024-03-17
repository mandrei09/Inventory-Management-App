import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSupplierOperationComponent } from './new-supplier-operation.component';

describe('NewSupplierOperationComponent', () => {
  let component: NewSupplierOperationComponent;
  let fixture: ComponentFixture<NewSupplierOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSupplierOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSupplierOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
