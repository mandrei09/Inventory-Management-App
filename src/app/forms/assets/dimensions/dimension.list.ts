import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Dimension } from '../../../model/api/administration/dimension';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-dimension-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class DimensionListComponent extends GenericTableList<Dimension, number> {

    public listName: string = 'DIMENSIONS';

    constructor() {
        super('length', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
        super.refresh(filters);
    }
}
