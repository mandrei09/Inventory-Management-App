import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { ProjectType } from '../../../model/api/assets/project-type';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-project-type-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class ProjectTypeListComponent extends GenericTableList<ProjectType, number> {
    private listName: string = 'PROJECTTYPES';

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
