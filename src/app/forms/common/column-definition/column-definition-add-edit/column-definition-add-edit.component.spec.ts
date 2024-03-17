import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnDefinitionAddEditComponent } from './column-definition-add-edit.component';

describe('TableAddEditComponent', () => {
  let component: ColumnDefinitionAddEditComponent;
  let fixture: ComponentFixture<ColumnDefinitionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnDefinitionAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnDefinitionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
