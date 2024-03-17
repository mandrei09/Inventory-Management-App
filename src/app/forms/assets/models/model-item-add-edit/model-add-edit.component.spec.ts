import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAddEditComponent } from './model-add-edit.component';

describe('DictionaryItemAddEditComponent', () => {
  let component: ModelAddEditComponent;
  let fixture: ComponentFixture<ModelAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
