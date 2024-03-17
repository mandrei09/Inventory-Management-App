
import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Location } from '../../../model/api/administration/location';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-location-type-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class LocationTypeListComponent extends GenericTableList<Location, number> {
    public listName: string = 'LOCATIONTYPES';

    constructor() {
        super('name', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        super.refresh(filters);
    }
}