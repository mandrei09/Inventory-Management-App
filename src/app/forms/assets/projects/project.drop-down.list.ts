import { Component } from '@angular/core';
import { Project } from '../../../model/api/assets/project';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';

@Component({
    selector: 'project-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class ProjectDropDownList extends GenericDropDownList<Project, number> {
    constructor() {
        super('name', 'asc');
    }
}