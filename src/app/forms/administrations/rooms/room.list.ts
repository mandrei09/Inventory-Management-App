import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { Room } from '../../../model/api/administration/room';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';

@Component({
    selector: 'app-room-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class RoomListComponent extends GenericTableList<Room, number> {

    public listName: string = 'ROOMS';

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
