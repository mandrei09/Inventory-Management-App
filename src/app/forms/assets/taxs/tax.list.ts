import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Tax } from '../../../model/api/assets/tax';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-tax-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class TaxListComponent extends GenericTableList<Tax, number> {
    private listName: string = 'TAXS';

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
