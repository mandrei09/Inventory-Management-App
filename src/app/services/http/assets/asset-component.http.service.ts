import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../config';
import { AssetComponent } from '../../../model/api/assets/asset-component';
import { AssetComponentAdd } from '../../../model/api/assets/asset-component-add';
import { AssetComponentTransferAdd } from '../../../model/api/assets/asset-component-transfer-add';
import { GenericHttpService } from '../generic.http.service';
@Injectable()
export class AssetComponentHttpService extends GenericHttpService<AssetComponent, number> {
    constructor(public http: HttpClient) {
        super(http, "", "assetcomponents");
    }

    public addAssetComponentByEmployee(reco: AssetComponentAdd): Observable<any> {
        // return super.create(reco, 'reco')
        return this.http.post(AppConfig.urlPrefix + this.url + '/add', JSON.stringify(reco), { headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
    }

    public deleteAssetComponent(assetComponentId: number): Observable<any> {
        return this.http.delete(AppConfig.urlPrefix + this.url + '/remove' + `/${assetComponentId}`).pipe(
        map((data: Response) => {
            return data;
        }));
    }

    public addAssetByEmployee(reco: AssetComponentTransferAdd): Observable<any> {
        // return super.create(reco, 'reco')
        return this.http.post(AppConfig.urlPrefix + this.url + '/addTransfer', JSON.stringify(reco), { headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
    }
}