import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
// import { AuthHttp } from 'angular2-jwt';
import { HttpClient } from '@angular/common/http';
import { AssetNature } from '../../../model/api/assets/asset-nature';

@Injectable()
export class AssetNatureHttpService extends GenericHttpService<AssetNature, number> {
    constructor(public http: HttpClient) {
        super(http, "", "assetnatures");
    }
}