import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { AssetNature } from '../../../model/api/assets/asset-nature';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-asset-nature-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class AssetNatureListComponent extends GenericTableList<AssetNature, number> {
    public listName: string = 'ASSETNATURES';

    constructor() {
        super('code', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        super.refresh(filters);
    }
}