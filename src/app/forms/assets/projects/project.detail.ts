import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Project } from '../../../model/api/assets/project';
import { GenericDetail } from '../../generic/generic.detail';


@Component({
    selector: 'project-detail',
    templateUrl: 'project.detail.html'
})
export class ProjectDetail extends GenericDetail<Project, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Project();
    }

    public resetForm() {
        this.detailForm.reset();
    }
}