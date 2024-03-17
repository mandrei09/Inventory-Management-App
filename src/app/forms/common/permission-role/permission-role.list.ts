import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { PermissionRole } from '../../../model/api/common/permission-role';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
@Component({
    selector: 'permission-role-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class PermissionRoleList extends GenericTableList<PermissionRole, number> {

    private listName: string = 'PERMISSIONROLES';

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
