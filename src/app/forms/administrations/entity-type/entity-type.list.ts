import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { EntityType } from '../../../model/api/administration/entity-type';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-entity-type-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class EntityTypeListComponent extends GenericTableList<EntityType, number> {
    private listName: string = 'ENTITYTYPES';

    constructor() {
        super('code', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        // console.log(this.totalItems);
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        super.refresh(filters);
    }
}
