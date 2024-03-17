import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { AssetDepDetail } from '../../../model/api/assets/asset-dep-detail';
import { AssetDepTotal } from '../../../model/api/assets/asset-dep-total';

@Component({
    selector: 'app-asset-dep-detail-list',
    templateUrl: 'asset-dep-detail.list.html'
})
export class AssetDepDetailListComponent extends GenericTableList<AssetDepDetail, number> {

    public totals: AssetDepTotal = new AssetDepTotal();

    constructor() {
        super('invNo', 'asc');
    }

    public setCurrentPageData(pageData: any) {
        super.setCurrentPageData(pageData);
        this.totals = pageData.totals;
    }

    // public setTotals(totals: AssetDepTotal) {
    //     this.totals = totals;
    // }
}