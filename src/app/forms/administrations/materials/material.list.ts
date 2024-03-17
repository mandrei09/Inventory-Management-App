
import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
import { ExpAccount } from '../../../model/api/administration/exp-account';
import { Material } from '../../../model/api/administration/material';

@Component({
    selector: 'material-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class MaterialList extends GenericTableList<Material, number> {
    private listName: string = 'MATERIALS';

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
