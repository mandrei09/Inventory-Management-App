import { AssetOpConfirm } from '../../../model/api/assets/asset-op-confirm';
// import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { Param } from '../../../model/common/param';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AssetOp } from '../../../model/api/assets/asset-op';
import { AssetOpSd } from '../../../model/api/assets/asset-op-sd';
import { AssetOpConf } from '../../../model/common/import/asset-op-conf';
import { map } from 'rxjs/operators';


@Injectable()
export class AssetOpHttpService extends GenericHttpService<AssetOp, number> {
    constructor(public authHttp: HttpClient) {
        super(authHttp, '', 'assetops');
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

    public upload(item: AssetOpConf): Observable<any> {
        console.log('IMPORT: ', item);
        return this.authHttp.post(AppConfig.urlPrefix + this.url + '/importConfirmation',
            JSON.stringify(item), { headers: this.headers }).pipe(
            map((data) => {
                return data;
            }));
    }

    public process(assetOpIds: number[]): Observable<any> {
        return super.create(assetOpIds, 'process');
    }

    public exportAssetOps(assetOpId: number): Observable<any> {
        return super.create(assetOpId, 'exportAssetOps');
    }

    public exportExel(params: Array<Param>) {
        let searchParams: HttpParams = null;
        let url = AppConfig.urlPrefix + this.url + '/exportoperation';
    
        searchParams = this.getSearchParams(params);
        return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                        map(res => res));
    }

    public sendEmail(item: AssetOpConfirm[]): Observable<any> {
        // console.log('ITEMS: ', item);
        return this.authHttp.post(AppConfig.urlPrefix + this.url + '/sendEmail', item,
            { headers: this.headers }).pipe(
            map((data) => {
                return data;
            }));
    }

    public sendEmailBnr(item: AssetOpConfirm[]): Observable<any> {
        // console.log('ITEMS: ', item);
        return this.authHttp.post(AppConfig.urlPrefix + this.url + '/sendEmailBnr', item,
            { headers: this.headers }).pipe(
            map((data) => {
                return data;
            }));
    }

    public sendEmailPiraeus(item: AssetOpConfirm[]): Observable<any> {
        // console.log('ITEMS: ', item);
        return this.authHttp.post(AppConfig.urlPrefix + this.url + '/sendEmailPiraeus', item,
            { headers: this.headers }).pipe(
            map((data) => {
                return data;
            }));
    }

    public downloadMailOps(item: AssetOpConfirm[]): Observable<any> {
        return this.authHttp.post(AppConfig.urlPrefix + this.url + '/downloadMailOps', item,
        { headers: this.headers }).pipe(
        map((data) => {
            return data;
        }));
    }

    public downloadMailOpsBnr(item: AssetOpConfirm[]): Observable<any> {
        return this.authHttp.post(AppConfig.urlPrefix + this.url + '/downloadMailOpsBnr', item,
        { headers: this.headers }).pipe(
        map((data) => {
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
        return this.http.put(AppConfig.urlPrefix + this.url + '/deleteAssetOp' + `/${assetOpId}`, []);
    }

    public exportBM(params: Array<Param>) {
        let searchParams: HttpParams = null;
        let url = AppConfig.urlPrefix + this.url + '/exportBM';
        searchParams = this.getSearchParams(params);
        return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                        map(res => res));
    }

    public exportMF(params: Array<Param>) {
        let searchParams: HttpParams = null;
        let url = AppConfig.urlPrefix + this.url + '/exportmf';
    
        searchParams = this.getSearchParams(params);
        return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                        map(res => res));
    }
    
    
    public exportOB(params: Array<Param>) {
        let searchParams: HttpParams = null;
        let url = AppConfig.urlPrefix + this.url + '/exportob';
    
        searchParams = this.getSearchParams(params);
        return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
            map(res => res));
    }
    
    
    public exportCass(params: Array<Param>) {
        let searchParams: HttpParams = null;
        let url = AppConfig.urlPrefix + this.url + '/exportcass';
    
        searchParams = this.getSearchParams(params);
        return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
            map(res => res));
    }

    public validateAssetOpTemp(assetOpId: number): Observable<any> {
        return this.http.delete(AppConfig.urlPrefix + this.url + '/validateAssetOpTemp' + `/${assetOpId}`);
    }

    public processReco(assetOpIds: number[] , isManagerTransfer: number): Observable<any> {
        return super.create(assetOpIds, 'recoprocess/' + isManagerTransfer);
    }

    public deleteAssetOpReco(assetOpId: number): Observable<any> {
        return this.http.put(AppConfig.urlPrefix + this.url + '/deleteAssetOpReco' + `/${assetOpId}`, []);
    }
}
