import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../config';
import { EntityFile } from '../../../model/api/common/entity-file';
import { PartnerEntityFile } from '../../../model/api/documents/partner-entity-file';
import { EntityFileResult } from '../../../model/api/result/entity-file-result';
import { Param } from '../../../model/common/param';

import { GenericHttpService } from '../generic.http.service';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class EntityFileHttpService extends GenericHttpService<EntityFile, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'entityfiles');
    }

    public getByCostCenterID(costCenterID: number, inventoryID: number) {
      let url = AppConfig.urlPrefix + this.url + '/getByCostCenterID' + `/${costCenterID}/${inventoryID}`;
    
      return this.http.get(url).pipe(
        map(res => res)
      );
    }

    public getByRequestId(requestBudgetForecastId: number) {
      let url = AppConfig.urlPrefix + this.url + '/getByRequestBudgetForecastId' + `/${requestBudgetForecastId}`;
    
      return this.http.get(url).pipe(
        map(res => res)
      );
    }
    

    public download(entityFileId: number) {
        let url = AppConfig.urlPrefix + this.url + '/download' + `/${entityFileId}`;

        // return this.http.get(url, { responseType: ResponseContentType.ArrayBuffer })
        //                 .map(res => res.arrayBuffer());
        return this.http.get(url, { responseType: 'blob' }).pipe(
                        map(res => res));
    }

    public downloadValidateAsset(entityFileId: number) {
        const url = AppConfig.urlPrefix + this.url + '/downloadValidateAsset' + `/${entityFileId}`;
        return this.http.get(url, { responseType: 'blob' }).pipe(
                        map(res => res));
    }

    public upload(fileToUpload: any, entityId: number, entityTypeCode: string, info: string) {
        const input = new FormData();
        input.append('file', fileToUpload.data);
        // input.append('entityId', entityId.toString());
        input.append('entityId', '');
        input.append('entityTypeCode', entityTypeCode);
        input.append('info', info);

        return this.http
            .post(AppConfig.urlPrefix + this.url + '/upload', input);
    }

    public uploadReport(fileToUpload: any, entityTypeCode: string, info: string, costCenterIDs : number[]) {
      const input = new FormData();
      input.append('file', fileToUpload);
      input.append('entityTypeCode', entityTypeCode);
      input.append('info', info);
      //input.append('info', info); !!!!!!!!!!

      return this.http
          .post(AppConfig.urlPrefix + this.url + '/uploadReport', input);
  }

    public uploadReception(fileToUpload: any, entityId: number, entityTypeId: number, info: string) {
        const input = new FormData();
        input.append('file', fileToUpload.data);
        input.append('entityId', entityId.toString());
        input.append('entityTypeId', entityTypeId.toString());
        input.append('info', info);

        return this.http
            .post(AppConfig.urlPrefix + this.url + '/uploadReception', input);
    }

    public uploadRequest(fileToUpload: any, entityId: number, entityTypeId: number, info: string, quantity: number, count: number): Observable<EntityFileResult> {
        const input = new FormData();
        input.append('file', fileToUpload.data);
        input.append('entityId', entityId.toString());
        input.append('entityTypeId', entityTypeId.toString());
        input.append('info', info);
        input.append('quantity', quantity.toString());
        input.append('count', count.toString());
        return this.http
            .post(AppConfig.urlPrefix + this.url + '/uploadRequest', input).pipe(
              map((data: EntityFileResult) => {
                return data;
              }));
    }

    public uploadOfferUI(fileToUpload: any, entityId: number, entityTypeId: number, info: string, guid: string, quantity: number, requestId: number, count: number): Observable<EntityFileResult> {
      const input = new FormData();
      input.append('file', fileToUpload.data);
      input.append('entityId', entityId.toString());
      input.append('entityTypeId', entityTypeId.toString());
      input.append('info', info);
      input.append('guid', guid);
      input.append('quantity', quantity.toString());
      input.append('requestId', requestId.toString());
      input.append('count', count.toString());
      return this.http
          .post(AppConfig.urlPrefix + this.url + '/uploadOfferUI', input).pipe(
            map((data: EntityFileResult) => {
              return data;
            }));
  }

    public uploadRequestDocument(fileToUpload: any, entityId: number, entityTypeId: number, info: string, quantity: number, count: number): Observable<EntityFileResult> {
      const input = new FormData();
      input.append('file', fileToUpload.data);
      input.append('entityId', entityId.toString());
      input.append('entityTypeId', entityTypeId.toString());
      input.append('info', info);
      input.append('quantity', quantity.toString());
      input.append('count', count.toString());
      return this.http
          .post(AppConfig.urlPrefix + this.url + '/uploadRequestDocument', input).pipe(
            map((data: EntityFileResult) => {
              return data;
            }));
  }

  public uploadRequestBudgetForecastDocument(fileToUpload: any, entityId: number, entityTypeId: number, info: string, quantity: number, count: number): Observable<EntityFileResult> {
    const input = new FormData();
    input.append('file', fileToUpload.data);
    input.append('entityId', entityId.toString());
    input.append('entityTypeId', entityTypeId.toString());
    input.append('info', info);
    input.append('quantity', quantity.toString());
    input.append('count', count.toString());
    return this.http
        .post(AppConfig.urlPrefix + this.url + '/uploadRequestBudgetForecastDocument', input).pipe(
          map((data: EntityFileResult) => {
            return data;
          }));
}

public uploadRequestTransferBudgetForecastDocument(fileToUpload: any, entityId: number, budgetBaseOpId: number, entityTypeId: number, info: string, quantity: number, count: number): Observable<EntityFileResult> {
  const input = new FormData();
  input.append('file', fileToUpload.data);
  input.append('entityId', entityId.toString());
  input.append('budgetBaseOpId', budgetBaseOpId.toString());
  input.append('entityTypeId', entityTypeId.toString());
  input.append('info', info);
  input.append('quantity', quantity.toString());
  input.append('count', count.toString());
  return this.http
      .post(AppConfig.urlPrefix + this.url + '/uploadRequestTransferBudgetForecast', input).pipe(
        map((data: EntityFileResult) => {
          return data;
        }));
}

    public uploadOrder(fileToUpload: any, orderId: number, reqBFId: number, entityTypeId: number, info: string, count: number): Observable<EntityFileResult> {
        const input = new FormData();
        input.append('file', fileToUpload.data);
        input.append('orderId', orderId.toString());
        input.append('reqBFId', reqBFId.toString());
        input.append('entityTypeId', entityTypeId.toString());
        input.append('info', info);
        input.append('count', count.toString());

        return this.http
            .post(AppConfig.urlPrefix + this.url + '/uploadOrder', input).pipe(
              map((data: EntityFileResult) => {
                return data;
              }));
    }

    public uploaPOdOrder(fileToUpload: any, orderId: number, entityTypeId: number, info: string): Observable<EntityFileResult> {
      const input = new FormData();
     
      input.append('file', fileToUpload.data);
      input.append('orderId', orderId.toString());
      input.append('entityTypeId', entityTypeId.toString());
      input.append('info', info);

      return this.http
          .post(AppConfig.urlPrefix + this.url + '/uploadpodocument', input).pipe(
            map((data: EntityFileResult) => {
              return data;
            }));
  }

    public addAssetFiles(fileToUpload: Array<any>, guid: string, entityTypeCode: string): Observable<EntityFileResult> {
        const input = new FormData();

        for (const file of fileToUpload) {
                input.append('File', file);
            }
        input.append('guid', guid);
        input.append('entityTypeCode', entityTypeCode);

        return this.http
            .post(AppConfig.urlPrefix + this.url + '/uploadNewAsset', input).pipe(
              map((data: EntityFileResult) => {
                return data;
              }));
    }

    public addOfferFiles(fileToUpload: Array<any>, guid: string, entityTypeCode: string, partnerId: number) {
        const input = new FormData();

        for (const file of fileToUpload) {
            input.append('File', file);
        }
            input.append('guid', guid);
            input.append('entityTypeCode', entityTypeCode);
            input.append('partnerId', partnerId.toString());

        return this.http
            .post(AppConfig.urlPrefix + this.url + '/uploadNewOffer', input)
    }

    // public getByEntity(entityTypeCode: string, entityId: number): Observable<EntityFile> {
    //     let params: Array<Param> = new Array<Param>();

    //     params.push(new Param('entityTypeCode', entityTypeCode));
    //     params.push(new Param('entityId', entityId.toString()));

    //     return this.get(null, null, '', '', params, null).map((data: any) => {
    //             //return data != null ? data.json() : null;
    //             return data;
    //         });
    // }

    public getByEntity(entityTypeCode: string, entityId: number, guid: string, partnerId: number): Observable<Array<EntityFile>> {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('entityTypeCode', entityTypeCode));
        params.push(new Param('entityId', entityId.toString()));
        params.push(new Param('guid', guid));
        params.push(new Param('partnerId', partnerId.toString()));

        return this.get(null, null, null, null, params, null).pipe(map((data: any) => {
                return data;
            }));
    }

    public deleteRequestEntityFile(entityFileId: number): Observable<EntityFileResult> {
      return this.http.post(AppConfig.urlPrefix + this.url + '/deleteRequest' + `/${entityFileId}`, []).pipe(
      map((data: EntityFileResult) => {
          return data;
      }));
  }

  public updateSkipEntityFile(skipEmail: boolean, entityFileId: number): Observable<EntityFileResult> {
    return this.http.post(AppConfig.urlPrefix + this.url + '/updateSkipEntityFile' + `/${entityFileId}` + `/${skipEmail}`, []).pipe(
    map((data: EntityFileResult) => {
        return data;
    }));
}

public updatePartnerEntityFile(partners: PartnerEntityFile): Observable<EntityFileResult> {

  const url: string = AppConfig.urlPrefix + this.url + '/updatePartnerEntityFile';
 return this.http.post(url, partners, { headers: this.headers }).pipe(
        map((data: EntityFileResult) => {
            return data;
        }));
}

    public deletePhoto(id: number): Observable<any> {
        return this.http.delete(AppConfig.urlPrefix + this.url + '/deleteMobile' + `/${id}`);
    }

    public downloadPdf(entityFileId: number): Observable<Blob> {
        const url = AppConfig.urlPrefix + this.url + '/downloadpdf' + `/${entityFileId}`;

        return this.http.get(url, { observe: 'response', responseType: 'blob' }).pipe(
                        map(res => res.body));
    }

    public uploadStorno(fileToUpload: any, entityId: number, entityTypeId: number, info: string, stornoValue: number) {
      const input = new FormData();
      input.append('file', fileToUpload.data);
      input.append('entityId', entityId.toString());
      input.append('entityTypeId', entityTypeId.toString());
      input.append('info', info);
      input.append('stornoValue', stornoValue.toString());

      return this.http
          .post(AppConfig.urlPrefix + this.url + '/uploadStorno', input);
  }

  public uploadPublicStorno(fileToUpload: any, entityId: number, entityTypeId: number, info: string) {
    const input = new FormData();
    input.append('file', fileToUpload.data);
    input.append('entityId', entityId.toString());
    input.append('entityTypeId', entityTypeId.toString());
    input.append('info', info);

    return this.http
        .post(AppConfig.urlPrefix + this.url + '/uploadPublicStorno', input);
}

public uploadPreReception(fileToUpload: any, entityIds: number[], entityTypeId: number, info: string, docNo1: string) {
  const input = new FormData();
  input.append('file', fileToUpload.data);

  const serializedEntityIds = JSON.stringify(entityIds);
  input.append('entityIds', serializedEntityIds);

  input.append('entityTypeId', entityTypeId.toString());
  input.append('info', info);
  input.append('docNo1', docNo1);
  
  return this.http.post(AppConfig.urlPrefix + this.url + '/uploadPreReception', input);
}


public uploadInventoryList(fileToUpload: any, entityId: number, inventoryId : number, entityTypeId: number, info: string) {
  const input = new FormData();
  input.append('file', fileToUpload.data);
  input.append('entityId', entityId.toString());
  input.append('entityTypeId', entityTypeId.toString());
  input.append('inventoryId' , inventoryId.toString())
  input.append('info', info);

  return this.http
      .post(AppConfig.urlPrefix + this.url + '/uploadInventoryList', input);
}

public deleteInventoryListEntityFile(entityFileId: number): Observable<EntityFileResult> {
  return this.http.post(AppConfig.urlPrefix + this.url + '/deleteInventoryList' + `/${entityFileId}`, []).pipe(
  map((data: EntityFileResult) => {
      return data;
  }));
}

public deleteListEntityFile(entityFileId: number): Observable<EntityFileResult> {
  return this.http.post(AppConfig.urlPrefix + this.url + '/deleteList' + `/${entityFileId}`, []).pipe(
  map((data: EntityFileResult) => {
    return data;
  }));
}
}
