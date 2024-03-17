import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCategoryAddEditComponent } from './asset-category-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: AssetCategoryAddEditComponent;
  let fixture: ComponentFixture<AssetCategoryAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetCategoryAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetCategoryAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
