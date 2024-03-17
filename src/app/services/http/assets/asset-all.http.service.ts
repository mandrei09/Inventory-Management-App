import { Param } from '../../../model/common/param';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericHttpService } from '../generic.http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../config';
import { AssetSave } from '../../../model/api/assets/asset-save';
import { AssetImportV1 } from '../../../model/common/import/asset-import-v1';
import { AssetImportV2 } from '../../../model/common/import/asset-import-v2';
import { map } from 'rxjs/operators';
import { AssetTempRecoSave } from '../../../model/api/assets/asset-temp-reco-save';
// import { AuthHttp } from 'angular2-jwt';
@Injectable()
export class AssetAllHttpService extends GenericHttpService<any, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'assets/all');
    }

    getDetailById(id: number): Observable<any> {
        return this.http.get(AppConfig.urlPrefix + this.url + `/detail/${id}`).pipe(
            map((data: Response) => {
                return data.json();
            }));
    }

    addNewAsset(item: AssetSave): Observable<any> {
        let url: string = AppConfig.urlPrefix + this.url + '/detail';

        return this.http.post(url, JSON.stringify(item), { headers: this.headers }).pipe(
            map((data) => {
                return data;
            }));
    }

    updateAsset(item: AssetSave): Observable<any> {
        let url: string = AppConfig.urlPrefix + this.url + '/detail';
        return this.http.put(url, JSON.stringify(item), { headers: this.headers });
    }

    public uploadV1(item: AssetImportV1): Observable<any> {
        console.log(JSON.stringify(item));
        return this.http.post(AppConfig.urlPrefix + this.url + '/importv1',
            JSON.stringify(item), { headers: this.headers }).pipe(
            map((data) => {
                return data;
            }));
    }
    public uploadV2(item: AssetImportV2): Observable<any> {
        return this.http.post(AppConfig.urlPrefix + this.url + '/importv2',
            JSON.stringify(item), { headers: this.headers }).pipe(
            map((data) => {
                return data;
            }));
    }

  public deleteAssetOp(assetId: number, inventoryId: number ): Observable<any> {
    console.log(AppConfig.urlPrefix + this.url + `/${assetId}`, inventoryId);
    return this.http.delete(AppConfig.urlPrefix + this.url + '/deleteAssetOp' + `/${assetId}, ${inventoryId}`);
}

public exportIn(params: Array<Param>) {
    let searchParams: HttpParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportIn';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
}

public exportOtp(params: Array<Param>) {
    let searchParams: HttpParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportOtp';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
}

public exportOut(params: Array<Param>) {
    let searchParams: HttpParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportOut';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
}

public import(file: any) {
    // let input = new FormData();
    // input.append('file', file);
    // this.progressBarService.startTracking().subscribe(progress => console.log(progress));
    // return this.http
    //     .post(AppConfig.urlPrefix + this.url + '/upload', input);
}

public importCassation(file: any) {
    // let input = new FormData();
    // input.append('file', file);
    // this.progressBarService.startTracking().subscribe(progress => console.log(progress));
    // return this.http
    //     .post(AppConfig.urlPrefix + this.url + '/uploadCassation', input);
}

public importInventory(file: any) {
    // let input = new FormData();
    // input.append('file', file);
    // this.progressBarService.startTracking().subscribe(progress => console.log(progress));
    // return this.http
    //     .post(AppConfig.urlPrefix + this.url + '/uploadInv', input);
}

public exportApaNova(inventoryId: number, locationId: number) {
    let searchParams: HttpParams = null;
 //   let url = AppConfig.urlPrefix + 'reporting/exportMegaImage&inventoryId=${inventoryId}&locationId=${locationId}';
    let url = `${AppConfig.urlPrefix}reporting/locationdownload/${locationId}`;

    searchParams = this.getSearchParams(null);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
}

public deleteAsset(assetId: number): Observable<any> {
    return this.http.delete(AppConfig.urlPrefix + this.url + '/deleteAsset' + `/${assetId}`);
}

public checkUniqueAsset(invNo: string) {
    return this.http.get(AppConfig.urlPrefix + this.url + '/checkUnique' + `/${invNo}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data;
    }));
}



public export(params: Array<Param>) {
    let searchParams: HttpParams = null;
    let url = AppConfig.urlPrefix + this.url + '/export';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res))
}



public saveReco(reco: AssetTempRecoSave): Observable<any> {
    // return super.create(reco, 'reco')
    return this.http.post(AppConfig.urlPrefix + this.url + '/reco', JSON.stringify(reco), { headers: this.headers }).pipe(
    map((data: Response) => {
        return data.json();
    }));
}

public recoverAssetTemp(assetId: number, inventoryId: number): Observable<any> {
    return this.http.put(AppConfig.urlPrefix + this.url + '/recoverAssetTemp' +
     `/${assetId}/${inventoryId}`, {}).pipe(
     map((data: Response) => {
        return data.json();
    }));
}

public updatePrintDateLabel(assets: Array<number>) {
    return this.http
        .post(AppConfig.urlPrefix + this.url + '/uploadPrintDate', assets).pipe(
        map((data: Response) => {
            return data.json();
        }));
}

// public updateAssetName(assets : Array<UpdateAssetName>) {
//     return this.http
//         .post(AppConfig.urlPrefix + this.url + '/updateAssetName', assets).pipe(
//         map(res => res));
// }

public exportAll(params: Array<Param>) {
    let searchParams: HttpParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportAll';
    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res))
}

// public printLocalLabel(item: Array<PrintLabel>): Observable<any> {
//     return this.http.post(AppConfig.urlPrefixPrint + 'printing',
//         JSON.stringify(item), { headers: this.headers }).pipe(
//         map((data) => {
//             return data;
//         }));
// }

public total(inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/total' + `/${inventoryId}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data.json();
    }));
}

public auditLocationChart(locationId: number, inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/auditLocationChart' + `/${locationId}/${inventoryId}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data.json();
    }));
}

public auditRegionChart(regionId: number, inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/auditRegionChart' + `/${regionId}/${inventoryId}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data.json();
    }));
}

public inventoryPieChartByDay(inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/inventoryPieChartByDay' + `/${inventoryId}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data.json();
    }));
}

public inventoryPieChartLocationFinishedByDay(inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/inventoryPieChartLocationFinishedByDay' + `/${inventoryId}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data.json();
    }));
}

public inventoryPieChartUserScans(inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/inventoryPieChartUserScans' + `/${inventoryId}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data.json();
    }));
}

public region(inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/region' + `/${inventoryId}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data.json();
    }));
}

public location(regionId: number, inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/location'  + `/${regionId}/${inventoryId}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data.json();
    }));
}

public mapAssetTemp(model: any): Observable<any> {

    let body: string = JSON.stringify(model);

    return this.http.post(AppConfig.urlPrefix + this.url + '/mapAssetTemp', body, { headers: this.headers }).pipe(
        map((res: Response) => {
            return res;
        }));
}


}
