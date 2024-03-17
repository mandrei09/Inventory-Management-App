import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { DeviceType } from '../../../model/api/common/device-type';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
@Component({
    selector: 'device-type-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class DeviceTypeList extends GenericTableList<DeviceType, number> {
    private listName: string = 'DEVICETYPES';

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
