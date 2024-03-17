import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { DictionaryItem } from '../../../model/api/administration/dictionary-item';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-dictionary-item-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class DictionaryItemListComponent extends GenericTableList<DictionaryItem, number> {

    public listName: string = 'DICTIONARYITEMS';

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
