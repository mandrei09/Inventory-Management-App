import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSapOperationDialogComponent } from './asset-sap-operation-dialog.component';

describe('NewOperationDialogComponent', () => {
  let component: AssetSapOperationDialogComponent;
  let fixture: ComponentFixture<AssetSapOperationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetSapOperationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetSapOperationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
