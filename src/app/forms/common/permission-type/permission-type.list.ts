import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { PermissionType } from '../../../model/api/common/permission-type';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'permission-type-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class PermissionTypeList extends GenericTableList<PermissionType, number> {
    private listName: string = 'PERMISSIONTYPES';

    constructor() {
        super('code', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();

        // console.log(this.totalItems);
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
        super.refresh(filters);
    }
}
