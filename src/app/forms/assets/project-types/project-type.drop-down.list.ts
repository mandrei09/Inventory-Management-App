import { Component } from '@angular/core';
import { ProjectType } from '../../../model/api/assets/project-type';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';

@Component({
    selector: 'app-project-type-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class ProjectTypeDropDownListComponent extends GenericDropDownList<ProjectType, number> {
    constructor() {
        super('name', 'asc');
    }
}