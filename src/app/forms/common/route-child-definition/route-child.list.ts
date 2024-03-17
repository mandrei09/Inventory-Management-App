import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { RouteChild } from '../../../model/api/common/route-child';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
@Component({
    selector: 'app-route-child-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class RouteChildListComponent extends GenericTableList<RouteChild, number> {
    public listName: string = 'CHILDRENROUTES';

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
