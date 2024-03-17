import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeAddEditComponent } from './badge-add-edit.component';

describe('AssetPropertyAddEditComponent', () => {
  let component: BadgeAddEditComponent;
  let fixture: ComponentFixture<BadgeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgeAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
