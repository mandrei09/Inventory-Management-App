import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
import { InventoryPlan } from '../../../model/api/inventory/inventory-plan';
import { InvCommitteMember } from '../../../model/api/inventory/committee-member';

@Component({
    selector: 'app-inv-committee-plan-list',
    templateUrl: '../../generic/generic.table.list.html',
    inputs: [ 'listTemplate' ],
})
export class InvCommitteePlanListComponent extends GenericTableList<InventoryPlan, number> {

    public listTemplate: string = 'INVENTORYPLAN';
    
    constructor() {
        super('modifiedAt', 'desc', '');

        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        this.initializeTable();
        super.refresh(filters);
    }
}
