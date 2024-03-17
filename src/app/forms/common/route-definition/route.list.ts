import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Route } from '../../../model/api/common/route';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
@Component({
    selector: 'app-route-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class RouteListComponent extends GenericTableList<Route, number> {
    public listName: string = 'ROUTES';

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
