import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Company } from '../../../model/api/assets/company';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-company-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class CompanyListComponent extends GenericTableList<Company, number> {
    public listName: string = 'COMPANIES';

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
