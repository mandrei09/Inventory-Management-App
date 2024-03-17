
import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Rate } from '../../../model/api/administration/rate';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-rate-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class RateListComponent extends GenericTableList<Rate, number> {
    private listName: string = 'RATES';

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
