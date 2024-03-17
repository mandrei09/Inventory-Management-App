import { Component, ViewChild } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';

@Component({
    selector: 'app-cost-center-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class CostCenterListComponent extends GenericTableList<CostCenter, number> {

    public listName: string = 'COSTCENTERS';

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
