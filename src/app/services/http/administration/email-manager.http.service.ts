import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EmailManager } from '../../../model/api/administration/email-manager';
import { EmailManagerReason } from '../../../model/api/common/email-manager-reason';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OfferMaterialUpdate } from '../../../model/api/administration/offer-material-update';
import { OfferITMaterialUpdate } from '../../../model/api/administration/offer-it-material-update';
import { OfferUpdate } from '../../../model/api/common/offer-update';
import { OfferResult } from '../../../model/api/result/offer-result';
import { Param } from '../../../model/common/param';

@Injectable()
export class EmailManagerHttpService extends GenericHttpService<EmailManager, number> {
    constructor(public http: HttpClient) {
        super(http, "", "emailmanagers");
    }

    addNewReason(email: EmailManagerReason): Observable<EmailManagerReason> {
        let url: string = AppConfig.urlPrefix + this.url + '/declined';

        return this.http.post(url, JSON.stringify(email), { headers: this.headers }).pipe(
            map((data: any) => {
                return data;
            }));
    }

    public accept(offerUpdate: OfferUpdate): Observable<any> {
      return this.http.post(AppConfig.urlPrefix + this.url + `/accept`, offerUpdate,
          { headers: this.headers }).pipe(
          map((data: Response) => {
              return data;
          }));
  }

  public decline(offerUpdate: OfferUpdate): Observable<any> {
    return this.http.post(AppConfig.urlPrefix + this.url + `/decline`, offerUpdate,
        { headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
}


public offerMaterialUpdate(reco: Array<OfferMaterialUpdate>): Observable<OfferResult> {
    // return super.create(reco, 'reco')
    return this.http.post(AppConfig.urlPrefix + this.url + '/offerMaterialUpdate', reco, { headers: this.headers }).pipe(
    map((data: OfferResult) => {
        return data;
    }));
}

public offerITMaterialUpdate(reco: Array<OfferITMaterialUpdate>): Observable<any> {
    // return super.create(reco, 'reco')
    return this.http.post(AppConfig.urlPrefix + this.url + '/offerITMaterialUpdate', reco, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data;
    }));
}

public orderMaterialUpdate(reco: Array<OfferMaterialUpdate>): Observable<any> {
    // return super.create(reco, 'reco')
    return this.http.post(AppConfig.urlPrefix + this.url + '/orderMaterialUpdate', reco, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data;
    }));
}

public deleteOfferMaterial(id: number): Observable<any> {
    return this.http.delete(AppConfig.urlPrefix + this.url + '/remove' + `/${id}`).pipe(
    map((data: Response) => {
        return data;
    }));
}

public export(params: Array<Param>) {
  let searchParams: HttpParams = null;
  let url = AppConfig.urlPrefix + this.url + '/export';

  searchParams = this.getSearchParams(params);
  return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                  map(res => res));
}


}
