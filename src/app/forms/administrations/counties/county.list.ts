import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { County } from '../../../model/api/administration/county';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-county-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class CountyListComponent extends GenericTableList<County, number> {
    public listName: string = 'COUNTIES';

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
