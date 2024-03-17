import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { Location } from '../../../model/api/administration/location';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';

@Component({
    selector: 'app-location-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class LocationListComponent extends GenericTableList<Location, number> {
    public listName: string = 'LOCATIONS';

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
