import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetEditComponent } from './asset-edit.component';

describe('AssetAddEditComponent', () => {
  let component: AssetEditComponent;
  let fixture: ComponentFixture<AssetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
