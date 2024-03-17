
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { County } from '../../../model/api/administration/county';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../config';
import { map } from 'rxjs/operators';
import { Param } from '../../../model/common/param';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CountyHttpService extends GenericHttpService<County, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'counties');
    }


    // public export(params: Array<Param>) {
    //     let searchParams: HttpParams = null;
    //     const url = AppConfig.urlPrefix + this.url + '/export';

    //     searchParams = this.getSearchParams(params);
    //     return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
    //                     .map(res => res.blob());
    // }

    // public getData(): Observable<any> {
    //     return this.http.get(AppConfig.urlPrefix + this.url , { headers: this.headers })
    //     .map((data: Response) => {
    //         return data.json();
    //     });
    // }

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
