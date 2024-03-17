import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypeAddEditComponent } from './order-type-add-edit.component';

describe('CountyAddEditComponent', () => {
  let component: OrderTypeAddEditComponent;
  let fixture: ComponentFixture<OrderTypeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTypeAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
