import { Component } from '@angular/core';
import { AppData } from '../../app-data';
import { ConfigValue } from '../../model/api/common/config-value';
import { Param } from '../../model/common/param';
import { GenericTableList } from '../generic/generic.table.list';

@Component({
    selector: 'config-values-list',
    templateUrl: '../generic/generic.table.list.html'
})
export class ConfigValuesList extends GenericTableList<ConfigValue, number> {
    public listName: string = 'CONFIGVALUES';

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
