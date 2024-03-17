
import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';
import { Area } from '../../../model/api/administration/area';


@Component({
    selector: 'app-area-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class AreaListComponent extends GenericTableList<Area, number> {
    public listName: string = 'AREAS';

    constructor() {
        super('code', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        super.refresh(filters);
        this.initializeTable();
    }
}
