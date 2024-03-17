import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryTypeAddEditComponent } from './dictionary-type-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: DictionaryTypeAddEditComponent;
  let fixture: ComponentFixture<DictionaryTypeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictionaryTypeAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictionaryTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
