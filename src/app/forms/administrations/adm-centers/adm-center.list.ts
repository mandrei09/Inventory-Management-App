
import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';


@Component({
    selector: 'app-adm-center-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class AdmCenterListComponent extends GenericTableList<AdmCenter, number> {
    public listName: string = 'ADMCENTERS';

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
