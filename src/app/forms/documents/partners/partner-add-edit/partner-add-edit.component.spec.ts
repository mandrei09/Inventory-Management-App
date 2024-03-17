import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerAddEditComponent } from './partner-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: PartnerAddEditComponent;
  let fixture: ComponentFixture<PartnerAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
