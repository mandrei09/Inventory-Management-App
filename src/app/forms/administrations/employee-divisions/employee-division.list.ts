import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { EmployeeDivision } from '../../../model/api/administration/employee-division';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'employee-division-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class EmployeeDivisionList extends GenericTableList<EmployeeDivision, number> {

    private listName: string = 'EMPLOYEEDIVISIONS';

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
