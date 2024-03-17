import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'asset-inv-email-list',
    // templateUrl: '../../generic/generic-validate.table.list.html'
    templateUrl: '../../generic/generic.table.list.html'
})
export class AssetInvEmailList extends GenericTableList<any, number> {

    constructor() {
        super('asset.name', 'asc', 'inventoryemail');

        this.columns = AppData.ColumnDefinitions['INVENTORYASSETEMAIL'];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions['INVENTORYASSETEMAIL'];
        this.initializeTable();
        super.refresh(filters);
    }
}
