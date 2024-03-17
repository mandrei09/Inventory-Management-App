import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage } from '../../generic/generic.manage';
import { TableDefinitionHttpService } from '../../../services/http/common/table-definition.http.service';
import { TableDefinition } from '../../../model/common/table-definition';
import { RoleEntity } from '../../../model/api/common/role-entity';
import { RoleService } from '../../../services/http/identity/role.service';
import { MatDialog } from '@angular/material/dialog';
import {ColumnFilterHttpService} from '../../../services/http/common/column-filter.http.service';
import {ColumnFilter} from '../../../model/common/column-filter';
import {ColumnFilterListComponent} from './column-filter.list';
import {ColumnFilterAddEditComponent} from './column-filter-add-edit/column-filter-add-edit.component';

@Component({
    selector: 'app-column-filter-list',
    templateUrl: 'column-filter.manage.html',
    styleUrls: ['column-filter.manage.scss']
})
export class ColumnFilterManageComponent extends GenericManage<ColumnFilter, number> {

    public _tableDefinition: TableDefinition = null;
    public get tableDefinition(): TableDefinition { return this._tableDefinition; }
    public set tableDefinition(value: TableDefinition) {
      this._tableDefinition = value;

      // this.setSelectedTableDefinition(value);
    }

    public _roles: RoleEntity = null;
    public get roles(): RoleEntity { return this._roles; }
    public set roles(value: RoleEntity) {
      this._roles = value;

      // this.setSelectedRole(value);
    }

    @ViewChild('itemList') public itemList: ColumnFilterListComponent;

    public filter: string = '';
    constructor(
        public dialog: MatDialog,
        public dataSource: ColumnFilterHttpService,
        public roleHttpService: RoleService,
        public tableDefinitionHttpService: TableDefinitionHttpService) {
        super();
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: ColumnFilter | null = null) {
      const dialogRef = this.dialog.open(ColumnFilterAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      // tslint:disable-next-line:no-shadowed-variable
      dialogRef.afterClosed().subscribe((item: ColumnFilter) => {
        if (item !== null) { this.refresh(); }
      });
    }

    public onItemEdit(item: ColumnFilter) {
      // this.roles = item?.roleId;
      this.onAddEditItem(item);
    }

    public refresh() {
        const params: Array<Param> = new Array<Param>();

        // params.push(new Param('filter', this.filter));
        // params.push(new Param('tableDefinitionIds', AppUtils.getIdsList<TableDefinition, number>([ this.selectedTableDefinition ])));
        // params.push(new Param("roleIds", this.selectedRole != null ? this.selectedRole.id : null ));
        this.itemList.refresh(params);
    }

    public getFilters(): Array<Param> {
        const params: Array<Param> = new Array<Param>();
        // params.push(new Param('filter', this.filter));
        // params.push(new Param('tableDefinitionIds', AppUtils.getIdsList<TableDefinition, number>([this.selectedTableDefinition])));
        // params.push(new Param("roleIds", this.selectedRole != null ? this.selectedRole.id : null ));

        return params;
    }

    export() {

    }
}
