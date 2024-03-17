import { Component } from '@angular/core';
import { AppData } from '../../../app-data';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-asset-category-list',
    templateUrl: '../../generic/generic.table.list.html'
})
export class AssetCategoryListComponent extends GenericTableList<AssetCategory, number> {

    public listName: string = 'ASSETCATEGORIES';

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
