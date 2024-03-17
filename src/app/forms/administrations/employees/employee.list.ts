import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { Employee } from '../../../model/api/administration/employee';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';

@Component({
    selector: 'app-employee-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class EmployeeListComponent extends GenericTableList<Employee, number> {
    private listName: string = 'EMPLOYEES';

    constructor() {
        super('internalCode', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
        super.refresh(filters);
    }
}
