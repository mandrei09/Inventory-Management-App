import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { Observable } from 'rxjs';
import { AssetComponentOp } from '../../../model/api/assets/asset-component-op';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../config';
import { map } from 'rxjs/operators';


@Injectable()
export class AssetComponentOpHttpService extends GenericHttpService<AssetComponentOp, number> {
    constructor(public authHttp: HttpClient) {
        super(authHttp, "", "assetcomponentops");
    }

    public deleteAssetComponentOp(assetComponentOpId: number): Observable<any> {
        return this.http.delete(AppConfig.urlPrefix + this.url + '/remove' + `/${assetComponentOpId}`).pipe(
        map((data: Response) => {
            return data;
        }));
    }
}