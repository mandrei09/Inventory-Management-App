
import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Model } from '../../../model/api/assets/model';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'model-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class ModelList extends GenericTableList<Model, number> {
    private listName: string = 'MODELS';

    constructor() {
        super('name', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
        super.refresh(filters);
    }
}
