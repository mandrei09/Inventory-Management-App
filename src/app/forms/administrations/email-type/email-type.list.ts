import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { EmailType } from '../../../model/api/administration/email-type';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'email-type-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class EmailTypeList extends GenericTableList<EmailType, number> {
    private listName: string = 'EMAILTYPES';

    constructor() {
        super('code', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();

        console.log(this.totalItems);
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
        super.refresh(filters);
    }
}
