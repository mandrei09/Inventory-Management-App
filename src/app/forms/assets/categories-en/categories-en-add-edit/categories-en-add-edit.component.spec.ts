import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesEnAddEditComponent } from './categories-en-add-edit.component';

describe('CategoryAddEditComponent', () => {
  let component: CategoriesEnAddEditComponent;
  let fixture: ComponentFixture<CategoriesEnAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesEnAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesEnAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
