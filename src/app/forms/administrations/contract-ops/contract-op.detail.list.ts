import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { AppConfig } from '../../../config';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-contract-op-detail-list',
    templateUrl: '../../generic/generic.table.list.html',
    inputs: [ 'listTemplate' ],
})
export class ContractOpDetailListComponent extends GenericTableList<any, number> {

    private showEmployeeDetails: boolean = AppConfig.SHOW_EMPLOYEE_DETAILS;
    private listTemplate: string = 'CONTRACTOPERATIONS';

    constructor() {
        super('modifiedAt', 'desc', 'details');

        this.columns = AppData.ColumnDefinitions[this.listTemplate];
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        super.refresh(filters);
    }
}
