import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTypeAddEditComponent } from './sub-type-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: SubTypeAddEditComponent;
  let fixture: ComponentFixture<SubTypeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubTypeAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
