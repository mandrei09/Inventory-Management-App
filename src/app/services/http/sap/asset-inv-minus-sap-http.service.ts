import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetInvMinusSAP } from '../../../model/api/sap/asset-inv-minus-sap';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class AssetInvMinusSAPHttpService extends GenericHttpService<AssetInvMinusSAP, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'assetinvminussaps');
    }
}
