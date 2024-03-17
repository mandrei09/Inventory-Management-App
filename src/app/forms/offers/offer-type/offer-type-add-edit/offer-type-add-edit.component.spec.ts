import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferTypeAddEditComponent } from './offer-type-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: OfferTypeAddEditComponent;
  let fixture: ComponentFixture<OfferTypeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferTypeAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
