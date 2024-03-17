
import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { InvState } from '../../../model/api/inventory/inv-state';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';
@Component({
    selector: 'inv-state-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class InvStateList extends GenericTableList<InvState, number> {

    public listName: string = 'INVSTATES';

    constructor() {
        super('code', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
        super.refresh(filters);
    }
}
