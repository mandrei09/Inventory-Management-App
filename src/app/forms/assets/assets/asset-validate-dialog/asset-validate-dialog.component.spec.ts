import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetValidateDialogComponent } from './asset-validate-dialog.component';

describe('AssetAddEditComponent', () => {
  let component: AssetValidateDialogComponent;
  let fixture: ComponentFixture<AssetValidateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetValidateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetValidateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
