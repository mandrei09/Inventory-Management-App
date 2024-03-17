import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountyAddEditComponent } from './county-add-edit.component';

describe('CountyAddEditComponent', () => {
  let component: CountyAddEditComponent;
  let fixture: ComponentFixture<CountyAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountyAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountyAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
