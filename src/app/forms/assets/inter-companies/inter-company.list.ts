
import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { InterCompany } from '../../../model/api/assets/inter-company';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-inter-company-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class InterCompanyListComponent extends GenericTableList<InterCompany, number> {
    private listName: string = 'INTERCOMPANIES';

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
