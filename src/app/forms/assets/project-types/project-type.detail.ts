import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProjectType } from '../../../model/api/assets/project-type';
import { GenericDetail } from '../../generic/generic.detail';


@Component({
    selector: 'app-project-type-detail',
    templateUrl: 'project-type.detail.html'
})
export class ProjectTypeDetailComponent extends GenericDetail<ProjectType, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new ProjectType();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}