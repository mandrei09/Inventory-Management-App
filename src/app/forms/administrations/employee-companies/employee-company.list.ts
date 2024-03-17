import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
import { EmployeeCompany } from '../../../model/api/administration/employee-company';

@Component({
    selector: 'employee-company-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class EmployeeCompanyList extends GenericTableList<EmployeeCompany, number> {

    private listName: string = 'EMPLOYEECOMPANIES';

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
