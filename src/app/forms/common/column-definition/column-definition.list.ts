import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { ColumnDefinition } from '../../../model/common/column-definition';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
@Component({
    selector: 'app-column-definition-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class ColumnDefinitionListComponent extends GenericTableList<ColumnDefinition, number> {
    public listName: string = 'COLUMNDEFINITIONS';

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
