import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteDefinitionAddEditComponent } from './route-definition-add-edit.component';

describe('AssetPropertyAddEditComponent', () => {
  let component: RouteDefinitionAddEditComponent;
  let fixture: ComponentFixture<RouteDefinitionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteDefinitionAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteDefinitionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
