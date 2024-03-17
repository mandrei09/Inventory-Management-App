import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryItemAddEditComponent } from './dictionary-item-add-edit.component';

describe('DictionaryItemAddEditComponent', () => {
  let component: DictionaryItemAddEditComponent;
  let fixture: ComponentFixture<DictionaryItemAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictionaryItemAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictionaryItemAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
