import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigValuesAddEditComponent } from './config-values-add-edit.component';

describe('GlobalAddEditComponent', () => {
  let component: ConfigValuesAddEditComponent;
  let fixture: ComponentFixture<ConfigValuesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigValuesAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigValuesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
