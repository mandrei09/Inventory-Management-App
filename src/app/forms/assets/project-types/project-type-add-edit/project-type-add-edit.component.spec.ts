import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeAddEditComponent } from './project-type-add-edit.component';

describe('AssetGroupAddEditComponent', () => {
  let component: ProjectTypeAddEditComponent;
  let fixture: ComponentFixture<ProjectTypeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTypeAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
