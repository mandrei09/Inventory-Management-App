import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryEnAddEditComponent } from './sub-category-en-add-edit.component';

describe('CategoryAddEditComponent', () => {
  let component: SubCategoryEnAddEditComponent;
  let fixture: ComponentFixture<SubCategoryEnAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoryEnAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCategoryEnAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
