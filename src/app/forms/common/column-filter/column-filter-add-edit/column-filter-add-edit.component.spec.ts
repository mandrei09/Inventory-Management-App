import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnFilterAddEditComponent } from './column-filter-add-edit.component';

describe('TableAddEditComponent', () => {
  let component: ColumnFilterAddEditComponent;
  let fixture: ComponentFixture<ColumnFilterAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnFilterAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnFilterAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
