import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { AssetInvDetail } from '../../../model/api/assets/asset-inv-detail';
import { AppConfig } from '../../../config';

@Component({
    selector: 'app-asset-inv-detail-list',
    templateUrl: 'asset-inv-detail.list.html'
})
export class AssetInvDetailListComponent extends GenericTableList<AssetInvDetail, number> {
    constructor() {
        super('name', 'asc');
    }

       public showSupplierDetails: boolean= AppConfig.SHOW_SUPPLIER_DETAILS;
       public showDepartmentDetails: boolean= AppConfig.SHOW_DEPARTMENT_DETAILS;
       public showAssetCategoryDetails: boolean= AppConfig.SHOW_ASSETCATEGORY_DETAILS;
       public showAssetTypeDetails: boolean= AppConfig.SHOW_ASSETTYPE_DETAILS;
}