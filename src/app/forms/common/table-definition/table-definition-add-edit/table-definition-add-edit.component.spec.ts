import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDefinitionAddEditComponent } from './table-definition-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: TableDefinitionAddEditComponent;
  let fixture: ComponentFixture<TableDefinitionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDefinitionAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDefinitionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
