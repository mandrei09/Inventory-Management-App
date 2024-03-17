import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTypeAddEditComponent } from './asset-type-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: AssetTypeAddEditComponent;
  let fixture: ComponentFixture<AssetTypeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetTypeAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
