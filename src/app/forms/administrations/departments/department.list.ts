import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Department } from '../../../model/api/administration/department';
import { Param } from '../../../model/common/param';
import { GenericPrimeNgDataTableList } from '../../generic/generic.prime-ng-data-table.list';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-department-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class DepartmentListComponent extends GenericTableList<Department, number> {

    public listName: string = 'DEPARTMENTS';

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


// @Component({
//     selector: 'app-department-list',
//     templateUrl: '../../generic/generic.prime-ng-data-table.list.html'
// })
// export class DepartmentListComponent extends GenericPrimeNgDataTableList<Department, number> {

//     public listName: string = 'DEPARTMENTS';

//     constructor() {
//         super('code', 'asc', '');
//         this.columns = AppData.ColumnDefinitions[this.listName];
//     }

//     public refresh(filters: Array<Param>) {
//         this.columns = AppData.ColumnDefinitions[this.listName];
//         super.refresh(filters);
//     }
// }
