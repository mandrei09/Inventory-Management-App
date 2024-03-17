import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetPreValidateDialogComponent } from './asset-pre-validate-dialog.component';

describe('AssetAddEditComponent', () => {
  let component: AssetPreValidateDialogComponent;
  let fixture: ComponentFixture<AssetPreValidateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetPreValidateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetPreValidateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
