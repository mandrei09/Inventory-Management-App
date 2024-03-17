
import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { SubCategoryEN } from '../../../model/api/assets/sub-category-en';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-sub-category-en-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class SubCategoryENListComponent extends GenericTableList<SubCategoryEN, number> {
    private listName: string = 'SUBCATEGORIESEN';

    constructor() {
        super('name', 'asc', '');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
        super.refresh(filters);
    }
}
