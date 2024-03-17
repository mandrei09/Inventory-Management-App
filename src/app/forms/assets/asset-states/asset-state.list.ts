import { AssetState } from '../../../model/api/assets/asset-state';
import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';


@Component({
    selector: 'app-asset-state-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class AssetStateListComponent extends GenericTableList<AssetState, number> {

    public listName: string = 'ASSETSTATES';

    constructor() {
        super('code', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        super.refresh(filters);
    }
}