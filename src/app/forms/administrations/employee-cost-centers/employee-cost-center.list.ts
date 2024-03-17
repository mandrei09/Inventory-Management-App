import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { EmployeeCostCenter } from '../../../model/api/administration/employee-cost-center';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'employee-cost-center-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class EmployeeCostCenterList extends GenericTableList<EmployeeCostCenter, number> {

    private listName: string = 'EMPLOYEECOSTCENTERS';

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
