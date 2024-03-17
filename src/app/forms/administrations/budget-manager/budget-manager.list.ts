
import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { BudgetManager } from '../../../model/api/assets/budget-manager';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
@Component({
    selector: 'budget-manager-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class BudgetManagerList extends GenericTableList<BudgetManager, number> {
    private listName: string = 'BUDGETMANAGERS';

    constructor() {
        super('name', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
        super.refresh(filters);
    }
}
