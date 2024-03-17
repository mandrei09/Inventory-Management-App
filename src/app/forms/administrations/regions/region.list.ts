
import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Region } from '../../../model/api/administration/region';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-region-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class RegionListComponent extends GenericTableList<Region, number> {
    public listName: string = 'REGIONS';

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
