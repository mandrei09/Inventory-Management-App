;import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericHttpService } from '../generic.http.service';
import { Partner } from '../../../model/api/documents/partner';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../config';
import { map } from 'rxjs/operators';
import { PartnerRequest } from '../../../model/api/common/partner-request';
import { PartnerResponse } from '../../../model/api/common/partner-response';
// import { AuthHttp } from 'angular2-jwt';
import { Param } from '../../../model/common/param';

@Injectable()
export class PartnerHttpService extends GenericHttpService<Partner, number> {
    constructor(public http: HttpClient) {
        super(http, "", "partners");
    }

    // public requestByCUI(request: PartnerRequest[]): Observable<any> {
    //     return this.http.post(AppConfig.partnerServer, request, { headers: this.headers }).pipe(
    //         map((response: any) => {
    //             return response;

    //         }));
    // }

    public requestByCUI(request: PartnerRequest): Observable<boolean> {
        return this.http.post(AppConfig.urlPrefix + this.url + '/requestByCUI', request, { headers: this.headers }).pipe(
            map((response: boolean) => {
                return response;

            }));
    }

    public requestByCorrelationId(correlationId: string): Observable<any> {
        return this.http.get(AppConfig.partnerServer + '?id=' + `${correlationId}`).pipe(
        map((data) => {
            return data;
        }));
    }

    getProductsSmall() {
        return this.http.get<any>('../../../../assets/products-small.json')
        .toPromise()
        .then(res => <Partner[]>res.data)
        .then(data => data);
    }

    public export(params: Array<Param>) {
      let searchParams: HttpParams = null;
      const url = AppConfig.urlPrefix + this.url + '/export';

      searchParams = this.getSearchParams(params);
      // return this.http.get(url, { responseType: ResponseContentType.Blob, params: searchParams })
      //                 .map(res => res.blob());

    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob'}).pipe(
      map((result) => {
          return result;
      })
  );
  }
}
