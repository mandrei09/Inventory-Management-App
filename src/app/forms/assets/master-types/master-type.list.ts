import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { MasterType } from '../../../model/api/assets/master-type';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
@Component({
    selector: 'app-master-type-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class MasterTypeListComponent extends GenericTableList<MasterType, number> {
    private listName: string = 'MASTERTYPES';

    constructor() {
        super('code', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        super.refresh(filters);
    }
}