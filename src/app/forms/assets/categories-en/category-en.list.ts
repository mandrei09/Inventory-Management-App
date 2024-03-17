
import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { CategoryEN } from '../../../model/api/assets/category-en';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-category-en-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class CategoryENListComponent extends GenericTableList<CategoryEN, number> {
    private listName: string = 'CATEGORIESEN';

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
