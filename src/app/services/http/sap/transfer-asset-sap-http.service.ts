import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferAssetSAP } from '../../../model/api/sap/transfer-asset-sap';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class TransferAssetSAPHttpService extends GenericHttpService<TransferAssetSAP, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'transferassetsaps');
    }
}
