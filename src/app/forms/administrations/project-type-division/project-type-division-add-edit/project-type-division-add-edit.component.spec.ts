import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTypeDivisionAddEditComponent } from './project-type-division-add-edit.component';

describe('CountyAddEditComponent', () => {
  let component: ProjectTypeDivisionAddEditComponent;
  let fixture: ComponentFixture<ProjectTypeDivisionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTypeDivisionAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTypeDivisionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
