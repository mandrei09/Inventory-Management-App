import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetRetireDialogComponent } from './asset-retire-dialog.component';

describe('NewOperationDialogComponent', () => {
  let component: AssetRetireDialogComponent;
  let fixture: ComponentFixture<AssetRetireDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetRetireDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetRetireDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
