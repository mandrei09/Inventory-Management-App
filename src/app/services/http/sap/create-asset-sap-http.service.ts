import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateAssetSAP } from '../../../model/api/sap/create-asset-sap';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class CreateAssetSAPHttpService extends GenericHttpService<CreateAssetSAP, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'createassetsaps');
    }
}
