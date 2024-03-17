import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetClassAddEditComponent } from './asset-class-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: AssetClassAddEditComponent;
  let fixture: ComponentFixture<AssetClassAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetClassAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetClassAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
