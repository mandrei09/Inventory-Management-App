import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProjectTypeDivision } from '../../../model/api/administration/project-type-division';
import { ProjectType } from '../../../model/api/assets/project-type';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'app-project-type-division-detail',
    templateUrl: 'project-type-division.detail.html',
    outputs: ['projectTypeNeeded', 'divisionNeeded']
})
export class ProjectTypeDivisionDetailComponent extends GenericDetail<ProjectTypeDivision, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    public projectTypeNeeded: EventEmitter<void> = new EventEmitter<void>();
    public divisionNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedProjectType: CodeNameEntity = null;
    public selectedDivision: CodeNameEntity = null;

    setItemDefaultValues() {
        this.item = new ProjectTypeDivision(0, null, null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
      super.saveItem();
    }

    public set projectType(projectType: ProjectType) {
        this.selectedProjectType = projectType;
        this.item.projectType = projectType != null ? new CodeNameEntity(projectType.id, projectType.code, projectType.name) : null;
    }

    public askForProjectType() {
        this.projectTypeNeeded.emit();
    }

    public set division(division: CodeNameEntity) {
        this.selectedDivision = division;
        this.item.division = division != null ? new CodeNameEntity(division.id, division.code, division.name) : null;
    }

    public askForDivision() {
        this.divisionNeeded.emit();
    }
}
