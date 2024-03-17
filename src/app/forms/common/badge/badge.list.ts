import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Badge } from '../../../model/api/common/badge';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'badge-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class BadgeList extends GenericTableList<Badge, number> {
    private listName: string = 'BADGES';

    constructor() {
        super('code', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();

        // console.log(this.totalItems);
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
        super.refresh(filters);
    }
}
