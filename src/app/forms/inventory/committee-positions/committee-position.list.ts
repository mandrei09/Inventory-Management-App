import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { AppConfig } from '../../../config';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
import { InvCommittePostion } from '../../../model/api/inventory/inv-committee-position';

@Component({
    selector: 'app-committee-position-list',
    templateUrl: '../../generic/generic.table.list.html',
    inputs: [ 'listTemplate' ],
})
export class CommitteePositionsListComponent extends GenericTableList<InvCommittePostion, number> {

    public listTemplate: string = 'COMMITTEEPOSITION';
    
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
