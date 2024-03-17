import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixAddEditComponent } from './matrix-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: MatrixAddEditComponent;
  let fixture: ComponentFixture<MatrixAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
