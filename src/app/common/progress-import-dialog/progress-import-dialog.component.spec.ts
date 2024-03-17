import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressImportDialogComponent } from './progress-import-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: ProgressImportDialogComponent;
  let fixture: ComponentFixture<ProgressImportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressImportDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressImportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
