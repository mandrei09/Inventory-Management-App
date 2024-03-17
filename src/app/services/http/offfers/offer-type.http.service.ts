import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OfferType } from '../../../model/api/offer/offer-type';
import { GenericHttpService } from '../generic.http.service';
// import { AuthHttp } from 'angular2-jwt';
import { AppConfig } from '../../../config';
import { Param } from '../../../model/common/param';
import { map } from 'rxjs';

@Injectable()
export class OfferTypeHttpService extends GenericHttpService<OfferType, number> {
    constructor(public http: HttpClient) {
        super(http, "", "offertypes");
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
