import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { AssetDepDetail } from '../../../model/api/assets/asset-dep-detail';
import { HttpClient } from '@angular/common/http';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class AssetDepDetailHttpService extends GenericHttpService<AssetDepDetail, number> {
    constructor(public http: HttpClient) {
        super(http, "", "assets/depdetails");
    }
}