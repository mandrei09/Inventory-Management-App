import { Component } from '@angular/core';
import { AppData } from '../../../../app-data';
import { AppConfig } from '../../../../config';
import { Param } from '../../../../model/common/param';
import { GenericTableList } from '../../../generic/generic.table.list';
import { InvCommitteMember } from '../../../../model/api/inventory/committee-member';

@Component({
    selector: 'app-cost-center-committee-member-list',
    templateUrl: '../../../generic/generic.table.list.html',
    inputs: [ 'listTemplate' ],
})
export class CostCenterCommitteesListComponent extends GenericTableList<InvCommitteMember, number> {

    public listTemplate: string = 'COSTCENTERCOMMITTEES';
    
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
