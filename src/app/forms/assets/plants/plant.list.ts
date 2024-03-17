import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';
import { Plant } from '../../../model/api/assets/plant';


@Component({
    selector: 'app-plant-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class PlantListComponent extends GenericTableList<Plant, number> {
    public listName: string = 'PLANTS';

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
