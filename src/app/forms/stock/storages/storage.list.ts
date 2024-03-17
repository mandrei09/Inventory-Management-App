
import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';
import { Storage } from '../../../model/api/stock/storage';


@Component({
    selector: 'app-storage-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class StorageListComponent extends GenericTableList<Storage, number> {
    public listName: string = 'STORAGES';

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
