import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RetireAssetSAP } from '../../../model/api/sap/retire-asset-sap';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class RetireAssetSAPHttpService extends GenericHttpService<RetireAssetSAP, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'retireassetsaps');
    }
}
