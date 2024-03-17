import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetCategoryDetail } from '../../../model/api/assets/asset-category-detail';
import { GenericHttpService } from '../generic.http.service';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class AssetCategoryDetailHttpService extends GenericHttpService<AssetCategoryDetail, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'assetcategories');
    }
}