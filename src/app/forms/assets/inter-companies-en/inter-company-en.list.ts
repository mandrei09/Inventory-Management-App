
import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { InterCompanyEN } from '../../../model/api/assets/inter-company-en';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-inter-company-en-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class InterCompanyENListComponent extends GenericTableList<InterCompanyEN, number> {
    private listName: string = 'INTERCOMPANIESEN';

    constructor() {
        super('name', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
        super.refresh(filters);
    }
}
