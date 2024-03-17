import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssetComponentDetail } from '../../../forms/assets/asset-components/asset-component.detail';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class AssetComponentDetailHttpService extends GenericHttpService<AssetComponentDetail, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'assetcomponents');
    }
}