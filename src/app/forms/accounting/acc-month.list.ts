import { Component } from '@angular/core';
import { AppData } from '../../app-data';
import { AccMonth } from '../../model/api/accounting/acc-month';
import { Param } from '../../model/common/param';
import { GenericTableList } from '../generic/generic.table.list';

@Component({
    selector: 'app-acc-month-list',
    templateUrl: '../generic/generic.table.list.html'
})
export class AccMonthListComponent extends GenericTableList<AccMonth, number> {
    public listName: string = 'ACCMONTHS';

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
