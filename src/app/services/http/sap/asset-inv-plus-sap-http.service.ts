import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetInvPlusSAP } from '../../../model/api/sap/asset-inv-plus-sap';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class AssetInvPlusSAPHttpService extends GenericHttpService<AssetInvPlusSAP, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'assetinvplussaps');
    }
}
