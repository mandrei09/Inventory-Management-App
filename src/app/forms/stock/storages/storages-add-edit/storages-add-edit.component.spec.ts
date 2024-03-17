import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragesAddEditComponent } from './storages-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: StoragesAddEditComponent;
  let fixture: ComponentFixture<StoragesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoragesAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoragesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
