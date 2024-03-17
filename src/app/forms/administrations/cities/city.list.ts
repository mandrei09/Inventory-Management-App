import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { City } from '../../../model/api/administration/city';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
@Component({
    selector: 'app-city-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class CityListComponent extends GenericTableList<City, number> {
    public listName: string = 'CITIES';

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
