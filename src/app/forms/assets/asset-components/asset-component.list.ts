import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { AssetComponent } from '../../../model/api/assets/asset-component';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'asset-component-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class AssetComponentList extends GenericTableList<AssetComponent, number> {

    private listName: string = 'ASSETCOMPONENTS';

    constructor() {
        super('code', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        super.refresh(filters);
    }
}
