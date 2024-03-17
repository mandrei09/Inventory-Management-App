import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../config';
import { InvState } from '../../../model/api/inventory/inv-state';
import { Param } from '../../../model/common/param';
import { GenericHttpService } from '../generic.http.service';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class InvStateHttpService extends GenericHttpService<InvState, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'invstates');
    }

    public getData(params: Array<Param>): Observable<any> {
      let searchParams: HttpParams = null;
      searchParams = this.getSearchParams(params);
      return this.http.get(AppConfig.urlPrefix + 'invstates/inuse/' , { params: searchParams, headers: this.headers }).pipe(
      map((data: Response) => {
          return data;
      }));
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
