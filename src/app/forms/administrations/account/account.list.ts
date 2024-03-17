
import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
import { Account } from '../../../model/api/administration/account';

@Component({
    selector: 'account-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class AccountList extends GenericTableList<Account, number> {
    private listName: string = 'ACCOUNTS';

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
