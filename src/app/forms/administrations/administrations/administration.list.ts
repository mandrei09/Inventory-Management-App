import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { Administration } from '../../../model/api/administration/administration';
import { Param } from '../../../model/common/param';
import { AppData } from '../../../app-data';

@Component({
    selector: 'app-administration-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class AdministrationListComponent extends GenericTableList<Administration, number> {

    public listName: string = 'ADMINISTRATIONS';

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
