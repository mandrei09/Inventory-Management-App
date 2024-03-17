
import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';
import { WFHCheck } from '../../../model/api/wfh/wfh-check';



@Component({
    selector: 'app-wfh-check-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class WFHCheckListComponent extends GenericTableList<WFHCheck, number> {

    public listName: string = 'WFHCHECKS';

    constructor() {
        super('id', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
        super.refresh(filters);
    }
}
