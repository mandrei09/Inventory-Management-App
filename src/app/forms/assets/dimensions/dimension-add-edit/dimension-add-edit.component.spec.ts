import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionAddEditComponent } from './dimension-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: DimensionAddEditComponent;
  let fixture: ComponentFixture<DimensionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DimensionAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DimensionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
