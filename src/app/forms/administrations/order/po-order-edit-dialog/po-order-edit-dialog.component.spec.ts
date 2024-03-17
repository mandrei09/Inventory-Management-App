import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoOrderEditDialogComponent } from './po-order-edit-dialog.component';

describe('AssetAddEditComponent', () => {
  let component: PoOrderEditDialogComponent;
  let fixture: ComponentFixture<PoOrderEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoOrderEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoOrderEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
