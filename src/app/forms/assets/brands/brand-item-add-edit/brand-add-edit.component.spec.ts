import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandAddEditComponent } from './brand-add-edit.component';

describe('DictionaryItemAddEditComponent', () => {
  let component: BrandAddEditComponent;
  let fixture: ComponentFixture<BrandAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
