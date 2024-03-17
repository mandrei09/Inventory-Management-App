import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrAddDialogComponent } from './pr-add-dialog.component';

describe('AssetAddEditComponent', () => {
  let component: PrAddDialogComponent;
  let fixture: ComponentFixture<PrAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
