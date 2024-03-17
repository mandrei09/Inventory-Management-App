import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCloneDialogComponent } from './asset-clone-dialog.component';

describe('NewOperationDialogComponent', () => {
  let component: AssetCloneDialogComponent;
  let fixture: ComponentFixture<AssetCloneDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetCloneDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetCloneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
