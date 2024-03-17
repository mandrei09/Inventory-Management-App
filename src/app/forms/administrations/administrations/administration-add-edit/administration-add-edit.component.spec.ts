import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationAddEditComponent } from './administration-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: AdministrationAddEditComponent;
  let fixture: ComponentFixture<AdministrationAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
