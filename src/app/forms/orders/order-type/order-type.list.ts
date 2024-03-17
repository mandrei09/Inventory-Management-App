import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { OrderType } from '../../../model/api/order/order-type';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-order-type-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class OrderTypeListComponent extends GenericTableList<OrderType, number> {
    public listName: string = 'ORDERTYPES';

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
