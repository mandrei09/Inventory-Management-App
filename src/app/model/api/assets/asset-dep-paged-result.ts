import { PagedResult } from '../../common/paged-result';
import { PagingInfo } from '../../common/paging-info';
import { AssetCategoryTotal } from './asset-category-total';
import { AssetDepDetail } from './asset-dep-detail';
import { AssetDepTotal } from './asset-dep-total';

export class AssetDepPagedResult extends PagedResult<AssetDepDetail> {
    totals: AssetDepTotal;
    assetCategoryTotals: AssetCategoryTotal;

    constructor(items: Array<AssetDepDetail>, pagingInfo: PagingInfo, totals: AssetDepTotal, assetCategoryTotals: AssetCategoryTotal) {
        super(items, pagingInfo);
        this.totals = totals;
        this.assetCategoryTotals = assetCategoryTotals;
    }
}
