
import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { InsuranceCategory } from '../../../model/api/assets/insurance-category';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'insurance-category-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class InsuranceCategoryList extends GenericTableList<InsuranceCategory, number> {
    private listName: string = 'INSURANCECATEGORIES';

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
