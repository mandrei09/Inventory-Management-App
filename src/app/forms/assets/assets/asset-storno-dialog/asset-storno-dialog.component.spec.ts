import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetStornoDialogComponent } from './asset-storno-dialog.component';

describe('NewOperationDialogComponent', () => {
  let component: AssetStornoDialogComponent;
  let fixture: ComponentFixture<AssetStornoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetStornoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetStornoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
