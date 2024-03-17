import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Type } from '../../../model/api/administration/type';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'type-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class TypeList extends GenericTableList<Type, number> {
    private listName: string = 'TYPES';

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
