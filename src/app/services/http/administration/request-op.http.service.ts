import { AssetOpConfirm } from '../../../model/api/assets/asset-op-confirm';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { Param } from '../../../model/common/param';
import { AssetOp } from '../../../model/api/assets/asset-op';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetOpSd } from '../../../model/api/assets/asset-op-sd';
import { AssetOpConf } from '../../../model/common/import/asset-op-conf';
import { map } from 'rxjs/operators';

@Injectable()
export class RequestOpHttpService extends GenericHttpService<AssetOp, number> {
    constructor(public authHttp: HttpClient) {
        super(authHttp, "", "requestops");
    }

    public getSimpleDetailByAsset(assetId: number): Observable<Array<AssetOpSd>> {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('assetId', assetId.toString()));

        // return this.get<AssetOpSd>('', '', params, null).map((data: any) => {
        //     return data;
        // });
        return this.httpGet(0, 0, 0, '', '', params, 'simpledetail').map((data: any) => {
            return data;
        });
    }
    public getSimpleDetail(): Observable<Array<AssetOpSd>> {
        let params: Array<Param> = new Array<Param>();

        return this.httpGet(0, 0, 0, '', '', params, 'simpledetailnotValidate').map((data: any) => {
            return data;
        });
    }

    public upload(item: AssetOpConf): Observable<{}> {
        console.log('IMPORT: ', item);
        return this.authHttp.post(AppConfig.urlPrefix + this.url + '/importConfirmation',
        JSON.stringify(item), { headers: this.headers }).pipe(
        map((data: Response) => {
            return data.json();
        }));
    }

    public process(assetOpIds: number[]): Observable<any> {
        return super.create(assetOpIds, 'process');
    }

    public exportAssetOps(assetOpId: number): Observable<any> {
        return super.create(assetOpId, 'exportAssetOps');
    }

    public sendEmail(item: AssetOpConfirm[]): Observable<{}> {
        // console.log('ITEMS: ', item);
        return this.authHttp.post(AppConfig.urlPrefix + this.url + '/sendEmail', item,
            { headers: this.headers }).pipe(
            map((data: Response) => {
                return data;
            }));
    }

    public sendEmailBnr(item: AssetOpConfirm[]): Observable<{}> {
        // console.log('ITEMS: ', item);
        return this.authHttp.post(AppConfig.urlPrefix + this.url + '/sendEmailBnr', item,
            { headers: this.headers }).pipe(
            map((data: Response) => {
                return data;
            }));
    }

    public sendEmailPiraeus(item: AssetOpConfirm[]): Observable<{}> {
        // console.log('ITEMS: ', item);
        return this.authHttp.post(AppConfig.urlPrefix + this.url + '/sendEmailPiraeus', item,
            { headers: this.headers }).pipe(
            map((data: Response) => {
                return data;
            }));
    }

    public downloadMailOps(item: AssetOpConfirm[]): Observable<{}> {
        return this.authHttp.post(AppConfig.urlPrefix + this.url + '/downloadMailOps', item,
        { headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
    }

    public downloadMailOpsBnr(item: AssetOpConfirm[]): Observable<{}> {
        return this.authHttp.post(AppConfig.urlPrefix + this.url + '/downloadMailOpsBnr', item,
        { headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
    }

    public download() {
        let url = AppConfig.urlPrefix + this.url + '/download';

        // return this.http.get(url, { responseType: ResponseContentType.ArrayBuffer })
        //                 .map(res => res.arrayBuffer());
        return this.http.get(url, { observe: 'response', responseType: 'blob' }).pipe(
            map(res => res));
    }

    public downloadBnr() {
        let url = AppConfig.urlPrefix + this.url + '/downloadBnr';

        // return this.http.get(url, { responseType: ResponseContentType.ArrayBuffer })
        //                 .map(res => res.arrayBuffer());
        return this.http.get(url, { observe: 'response', responseType: 'blob' }).pipe(
            map(res => res));
    }

    public import(file: any) {
        let input = new FormData();
        input.append('file', file);
        return this.http
            .post(AppConfig.urlPrefix + this.url + '/upload', input);
    }

    public deleteAssetOp(assetOpId: number): Observable<any> {
        return this.http.delete(AppConfig.urlPrefix + this.url + '/deleteAssetOp' + `/${assetOpId}`);
    }

    public validateAssetOpTemp(assetOpId: number): Observable<any> {
        return this.http.delete(AppConfig.urlPrefix + this.url + '/validateAssetOpTemp' + `/${assetOpId}`);
    }
}
