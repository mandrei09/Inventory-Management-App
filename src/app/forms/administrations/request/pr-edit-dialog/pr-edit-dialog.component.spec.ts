import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrEditDialogComponent } from './pr-edit-dialog.component';

describe('AssetAddEditComponent', () => {
  let component: PrEditDialogComponent;
  let fixture: ComponentFixture<PrEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
