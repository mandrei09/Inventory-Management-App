import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GenericHttpService } from '../generic.http.service';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../config';
import { AssetAsyncErrors } from '../../../model/api/administration/assetasync-errors';
import { map } from 'rxjs/operators';
import { AssetAcquizition } from '../../../model/api/assets/asset-aquizition';
import { AddAsset } from '../../../model/api/assets/add-asset';
// @Injectable()
// export class AssetAsyncHttpService {
//   private urlPrefix = AppConfig.urlPrefix; 
//   private endpoint = 'asyncerrors'; 

//   constructor(private http: HttpClient) { }

//   getAsyncErrors(): Observable<AssetAsyncErrors[]> {
//     const url = `${this.urlPrefix}${this.endpoint}?page=1&pageSize=10`;
//     return this.http.get<AssetAsyncErrors[]>(url);
//   }

//   create(item: AssetAsyncErrors): Observable<AssetAsyncErrors> {
//     const url = `${this.urlPrefix}${this.endpoint}`;
//     return this.http.post<AssetAsyncErrors>(url, item);
//   }

//   update(item: AssetAsyncErrors): Observable<AssetAsyncErrors> {
//     const url = `${this.urlPrefix}/${this.endpoint}/${item.id}`;
//     return this.http.put<AssetAsyncErrors>(url, item);
//   }
// }
@Injectable()
export class AssetAsyncHttpService extends GenericHttpService<any, number> {
  constructor(public http: HttpClient) {
    super(http, '', 'asyncerrors');
  }


  public getCurrency(currency: string): Observable<AssetAsyncErrors> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/getCurrency/' + `${currency}`, { headers: this.headers }).pipe(
    map((data: AssetAsyncErrors) => {
        return data;
    }));
}

public getRateByDate(day: string): Observable<AssetAsyncErrors> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/getRateByDate/' + `${day}`, { headers: this.headers }).pipe(
  map((data: AssetAsyncErrors) => {
      return data;
  }));
}
deleteElement(id: number) {
  return this.http.get(AppConfig.urlPrefix + 'asyncerrors/delete/' + `${id}`);
}

takeAcquisitionAssetSAP(assetId: number) {
  return this.http.get(AppConfig.urlPrefix + 'asyncerrors/getacquisitionassetsapdata/'+ `${assetId}`, { headers: this.headers })
  .pipe(
    map((data: AssetAcquizition) => {
        return data;
}));
}
takeChangeAssetSAP(assetId: number) {
  return this.http.get(AppConfig.urlPrefix + 'asyncerrors/getchangeassetsapdata/'+ `${assetId}`, { headers: this.headers })
  .pipe(
    map((data: AssetAcquizition) => {
        return data;
}));
}
takeAssetCreateSAP(assetId: number) {
  return this.http.get(AppConfig.urlPrefix + 'asyncerrors/getcreateassetsapdata/'+ `${assetId}`, { headers: this.headers })
  .pipe(
    map((data: AddAsset) => {
        return data;
}));
}
updateAssetAquzition(updatedAssetData: any) {
  return this.http.post(AppConfig.urlPrefix + 'asyncerrors/updateacquisitionasset', updatedAssetData, { headers: this.headers })
  .pipe(
    map((data: AssetAcquizition) => {
        return data;
}));
}
updateAssetCreate(updatedAssetData: any) {
  return this.http.post(AppConfig.urlPrefix + 'asyncerrors/updatecreateasset', updatedAssetData, { headers: this.headers })
  .pipe(
    map((data: AssetAcquizition) => {
        return data;
}));
}

updateAssetChange(updatedAssetData: any) {
  return this.http.post(AppConfig.urlPrefix + 'asyncerrors/updatechangeasset', updatedAssetData, { headers: this.headers })
  .pipe(
    map((data: AssetAcquizition) => {
        return data;
}));
}
}
