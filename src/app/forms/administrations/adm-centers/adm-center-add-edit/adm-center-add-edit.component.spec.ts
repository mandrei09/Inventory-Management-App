import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmCenterAddEditComponent } from './adm-center-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: AdmCenterAddEditComponent;
  let fixture: ComponentFixture<AdmCenterAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmCenterAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmCenterAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
