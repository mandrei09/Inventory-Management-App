import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTypeAddEditComponent } from './device-type-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: DeviceTypeAddEditComponent;
  let fixture: ComponentFixture<DeviceTypeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceTypeAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
