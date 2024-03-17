
import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';
import { TableDefinition } from '../../../model/common/table-definition';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-table-definition-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class TableDefinitionListComponent extends GenericTableList<TableDefinition, number> {
    public listName: string = 'TABLEDEFINITIONS';

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
