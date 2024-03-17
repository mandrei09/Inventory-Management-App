import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAddFromStockDialogComponent } from './asset-add-from-stock-dialog.component';

describe('NewOperationDialogComponent', () => {
  let component: AssetAddFromStockDialogComponent;
  let fixture: ComponentFixture<AssetAddFromStockDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetAddFromStockDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetAddFromStockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
