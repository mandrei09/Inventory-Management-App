import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AquisitionAssetSAP } from '../../../model/api/sap/aquisition-asset-sap';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class AquisitionAssetSAPHttpService extends GenericHttpService<AquisitionAssetSAP, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'acquisitionassetsaps');
    }
}
