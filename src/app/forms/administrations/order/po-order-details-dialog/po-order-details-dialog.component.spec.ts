import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoOrderDetailsDialogComponent } from './po-order-details-dialog.component';

describe('AssetAddEditComponent', () => {
  let component: PoOrderDetailsDialogComponent;
  let fixture: ComponentFixture<PoOrderDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoOrderDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoOrderDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
