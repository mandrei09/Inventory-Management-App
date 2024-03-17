import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { ColumnFilter } from '../../../model/common/column-filter';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
@Component({
    selector: 'app-column-filters-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class ColumnFilterListComponent extends GenericTableList<ColumnFilter, number> {
    public listName: string = 'COLUMNFILTERS';

    constructor() {
        super('property', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
        super.refresh(filters);
    }
}
