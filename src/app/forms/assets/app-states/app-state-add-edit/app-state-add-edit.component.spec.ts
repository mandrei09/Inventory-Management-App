import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStateAddEditComponent } from './app-state-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: AppStateAddEditComponent;
  let fixture: ComponentFixture<AppStateAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppStateAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppStateAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
