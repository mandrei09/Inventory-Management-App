
import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { Category } from '../../../model/api/assets/category';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-category-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class CategoryListComponent extends GenericTableList<Category, number> {
    private listName: string = 'CATEGORIES';

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
