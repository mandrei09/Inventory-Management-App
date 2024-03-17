import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { AssetInvDetail } from '../../../model/api/assets/asset-inv-detail';
import { HttpClient } from '@angular/common/http';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class AssetInvDetailHttpService extends GenericHttpService<AssetInvDetail, number> {
    constructor(public http: HttpClient) {
        super(http, "", "assets/invdetails");
    }
}