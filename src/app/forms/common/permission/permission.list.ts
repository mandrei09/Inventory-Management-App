import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Permission } from '../../../model/api/common/permission';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
@Component({
    selector: 'permission-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class PermissionList extends GenericTableList<Permission, number> {

    private listName: string = 'PERMISSIONS';

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
