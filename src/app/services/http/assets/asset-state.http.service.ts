import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetState } from '../../../model/api/assets/asset-state';
import { GenericHttpService } from '../generic.http.service';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class AssetStateHttpService extends GenericHttpService<AssetState, number> {
    constructor(public http: HttpClient) {
        super(http, "", "assetstates");
    }
}