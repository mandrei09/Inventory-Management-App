import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteChildrenDefinitionAddEditComponent } from './route-children-definition-add-edit.component';

describe('AssetPropertyAddEditComponent', () => {
  let component: RouteChildrenDefinitionAddEditComponent;
  let fixture: ComponentFixture<RouteChildrenDefinitionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteChildrenDefinitionAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteChildrenDefinitionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
