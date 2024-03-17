import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { SubType } from '../../../model/api/administration/sub-type';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'sub-type-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class SubTypeList extends GenericTableList<SubType, number> {
    private listName: string = 'SUBTYPES';

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
