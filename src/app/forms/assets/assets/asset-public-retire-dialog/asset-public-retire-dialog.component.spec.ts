import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetPublicRetireDialogComponent } from './asset-public-retire-dialog.component';

describe('NewOperationDialogComponent', () => {
  let component: AssetPublicRetireDialogComponent;
  let fixture: ComponentFixture<AssetPublicRetireDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetPublicRetireDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetPublicRetireDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
