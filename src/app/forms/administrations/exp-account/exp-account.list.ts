
import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
import { ExpAccount } from '../../../model/api/administration/exp-account';

@Component({
    selector: 'exp-account-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class ExpAccountList extends GenericTableList<ExpAccount, number> {
    private listName: string = 'EXPACCOUNTS';

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
