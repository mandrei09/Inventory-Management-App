import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { DictionaryType } from '../../../model/api/administration/dictionary-type';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-dictionary-type-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class DictionaryTypeListComponent extends GenericTableList<DictionaryType, number> {
    public listName: string = 'DICTIONARYTYPES';

    constructor() {
        super('code', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();

        console.log(this.totalItems);
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
        super.refresh(filters);
    }
}
