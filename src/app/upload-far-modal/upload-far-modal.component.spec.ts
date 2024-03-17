import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFarModalComponent } from './upload-far-modal.component';

describe('UploadFarModalComponent', () => {
  let component: UploadFarModalComponent;
  let fixture: ComponentFixture<UploadFarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFarModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadFarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
