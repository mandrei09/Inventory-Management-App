import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { AssetClass } from '../../../model/api/assets/asset-class';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';

@Component({
    selector: 'app-asset-class-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class AssetClassListComponent extends GenericTableList<AssetClass, number> {

    public listName: string = 'ASSETCLASSES';

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
