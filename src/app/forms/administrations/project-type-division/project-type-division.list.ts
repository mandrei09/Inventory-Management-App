import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { ProjectTypeDivision } from '../../../model/api/administration/project-type-division';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-project-type-division-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class ProjectTypeDivisionListComponent extends GenericTableList<ProjectTypeDivision, number> {

    private listName: string = 'PROJECTTYPEDIVISIONS';

    constructor() {
        super('id', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
        super.refresh(filters);
    }
}
