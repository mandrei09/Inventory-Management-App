import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { AssetType } from '../../../model/api/assets/asset-type';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';


@Component({
    selector: 'app-asset-type-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class AssetTypeListComponent extends GenericTableList<AssetType, number> {
    public listName: string = 'ASSETTYPES';

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
