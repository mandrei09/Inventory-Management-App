
import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';
import { Matrix } from '../../../model/api/administration/matrix';



@Component({
    selector: 'app-matrix-list',
    templateUrl: '../../generic/generic.table.list.html',
    styleUrls: ['matrix.list.scss'],
})
export class MatrixListComponent extends GenericTableList<Matrix, number> {

    public listName: string = 'MATRIX';

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
