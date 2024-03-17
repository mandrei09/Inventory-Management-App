import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryAddEditComponent } from './sub-category-add-edit.component';

describe('CategoryAddEditComponent', () => {
  let component: SubCategoryAddEditComponent;
  let fixture: ComponentFixture<SubCategoryAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoryAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCategoryAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
