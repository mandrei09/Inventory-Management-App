import { Component } from '@angular/core';
import { AppData } from '../../app-data';
import { Inventory } from '../../model/api/inventory/inventory';
import { Param } from '../../model/common/param';
import { GenericTableList } from '../generic/generic.table.list';

@Component({
    selector: 'inventory-list',
    templateUrl: '../generic/generic.table.list.html'
})
export class InventoryList extends GenericTableList<Inventory, number> {

    public listName: string = 'INVENTORIES';

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
