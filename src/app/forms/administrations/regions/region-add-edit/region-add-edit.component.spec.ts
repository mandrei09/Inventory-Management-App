import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionAddEditComponent } from './region-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: RegionAddEditComponent;
  let fixture: ComponentFixture<RegionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
