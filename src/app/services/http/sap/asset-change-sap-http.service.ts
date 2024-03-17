import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetChangeSAP } from '../../../model/api/sap/asset-change-sap';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class AssetChangeSAPHttpService extends GenericHttpService<AssetChangeSAP, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'assetchangesaps');
    }
}
