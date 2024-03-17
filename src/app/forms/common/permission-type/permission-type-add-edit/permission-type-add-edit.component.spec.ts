import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionTypeAddEditComponent } from './permission-type-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: PermissionTypeAddEditComponent;
  let fixture: ComponentFixture<PermissionTypeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionTypeAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
