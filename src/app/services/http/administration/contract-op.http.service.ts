import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContractOp } from '../../../model/api/assets/contract-op';


@Injectable()
export class ContractOpHttpService extends GenericHttpService<ContractOp, number> {
    constructor(public authHttp: HttpClient) {
        super(authHttp, '', 'contractops');
    }

    public process(assetOpIds: number[]): Observable<any> {
        return super.create(assetOpIds, 'process');
    }

    public exportAssetOps(assetOpId: number): Observable<any> {
        return super.create(assetOpId, 'exportAssetOps');
    }

    public deleteAssetOp(assetOpId: number): Observable<any> {
        return this.http.delete(AppConfig.urlPrefix + this.url + '/deleteAssetOp' + `/${assetOpId}`);
    }
}
