
import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';
import { MatrixLevel } from '../../../model/api/administration/matrix-level';



@Component({
    selector: 'app-matrix-level-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class MatrixLevelListComponent extends GenericTableList<MatrixLevel, number> {

    public listName: string = 'MATRIXLEVELS';

    constructor() {
        super('code', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        super.refresh(filters);
    }
}
