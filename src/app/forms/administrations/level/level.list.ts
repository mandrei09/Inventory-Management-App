
import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';
import { Level } from '../../../model/api/administration/level';


@Component({
    selector: 'app-level-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class LevelListComponent extends GenericTableList<Level, number> {
    public listName: string = 'LEVELS';

    constructor() {
        super('code', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        super.refresh(filters);
      this.initializeTable();
    }
}
