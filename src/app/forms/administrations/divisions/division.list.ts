import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { Division } from '../../../model/api/administration/division';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';

@Component({
    selector: 'app-division-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class DivisionListComponent extends GenericTableList<Division, number> {

    public listName: string = 'DIVISIONS';

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
