import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Project } from '../../../model/api/assets/project';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'project-list',
    templateUrl: '../../generic/generic.table.list.html',
    styleUrls: ['project.list.scss'],
})
export class ProjectList extends GenericTableList<Project, number> {
    private listName: string = 'PROJECTS';

    constructor() {
        super('code', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
        super.refresh(filters);
    }
}
