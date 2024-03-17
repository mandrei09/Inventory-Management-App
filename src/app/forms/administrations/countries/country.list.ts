
import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Country } from '../../../model/api/administration/country';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-country-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class CountryListComponent extends GenericTableList<Country, number> {
    public listName: string = 'COUNTRIES';

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
