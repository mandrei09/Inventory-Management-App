import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAddEditComponent } from './type-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: TypeAddEditComponent;
  let fixture: ComponentFixture<TypeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
