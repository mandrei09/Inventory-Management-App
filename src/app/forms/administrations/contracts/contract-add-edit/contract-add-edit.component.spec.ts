import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAddEditComponent } from './contract-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: ContractAddEditComponent;
  let fixture: ComponentFixture<ContractAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
