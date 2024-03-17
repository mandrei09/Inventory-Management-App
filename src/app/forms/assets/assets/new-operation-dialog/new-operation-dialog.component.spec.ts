import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOperationDialogComponent } from './new-operation-dialog.component';

describe('NewOperationDialogComponent', () => {
  let component: NewOperationDialogComponent;
  let fixture: ComponentFixture<NewOperationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOperationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOperationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
