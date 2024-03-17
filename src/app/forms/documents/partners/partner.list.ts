import { AppConfig } from './../../../config';
import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { Partner } from '../../../model/api/documents/partner';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';

@Component({
    selector: 'app-partner-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class PartnerListComponent extends GenericTableList<Partner, number> {

    public listName: string = 'PARTNERS';

    constructor() {
        super('fiscalCode', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
        super.refresh(filters);
    }
}
