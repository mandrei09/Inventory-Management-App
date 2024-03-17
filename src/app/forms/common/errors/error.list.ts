import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Error } from '../../../model/api/common/error';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
@Component({
    selector: 'app-error-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class ErrorListComponent extends GenericTableList<Error, number> {
    private listName: string = 'ERRORS';

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
