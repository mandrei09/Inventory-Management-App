import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GenericTableList } from '../generic/generic.table.list';
import {Param} from '../../model/common/param';
import {AppData} from '../../app-data';


@Component({
    selector: 'app-role-list',
    templateUrl: 'role.list.html',
    // templateUrl: '../generic/generic.table.list.html',
    styleUrls: ['role.list.scss']
})
export class RoleList extends GenericTableList<any, string> {

      constructor(public router: Router) {
        super('name', 'asc', 'roles');
        // this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
      // this.columns = AppData.ColumnDefinitions[this.listName];
      this.initializeTable();
      super.refresh(filters);
    }

    ngAfterViewInit() {
    }

    public applySimpleSearchFilter(filter: string) {
      const filters: Array<Param> = new Array<Param>();
      filters.push(new Param('filter', filter));
      this.refresh(filters);
    }
}
