import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceCategoryAddEditComponent } from './insurance-category-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: InsuranceCategoryAddEditComponent;
  let fixture: ComponentFixture<InsuranceCategoryAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceCategoryAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceCategoryAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
