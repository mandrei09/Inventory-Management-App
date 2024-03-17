import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvStateAddEditComponent } from './inv-state-add-edit.component';

describe('InvStateAddEditComponent', () => {
  let component: InvStateAddEditComponent;
  let fixture: ComponentFixture<InvStateAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvStateAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvStateAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
