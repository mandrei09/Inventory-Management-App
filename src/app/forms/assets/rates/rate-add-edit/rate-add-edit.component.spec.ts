import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateAddEditComponent } from './rate-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: RateAddEditComponent;
  let fixture: ComponentFixture<RateAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
