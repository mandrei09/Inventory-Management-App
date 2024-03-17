import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrRequestEditDialogComponent } from './pr-request-edit-dialog.component';

describe('AssetAddEditComponent', () => {
  let component: PrRequestEditDialogComponent;
  let fixture: ComponentFixture<PrRequestEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrRequestEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrRequestEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
