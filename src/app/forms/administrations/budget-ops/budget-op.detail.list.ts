import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { AppConfig } from '../../../config';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
@Component({
    selector: 'budget-op-detail-list',
    templateUrl: '../../generic/generic.table.list.html',
    inputs: [ 'listTemplate' ],
})
export class BudgetOpDetailList extends GenericTableList<any, number> {

    private showEmployeeDetails: boolean = AppConfig.SHOW_EMPLOYEE_DETAILS;
    private listTemplate: string = 'BUDGETOPERATIONS';

    constructor() {
        super('modifiedAt', 'desc', 'details');

        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        // this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        // this.initializeTable();
        super.refresh(filters);
    }
}
