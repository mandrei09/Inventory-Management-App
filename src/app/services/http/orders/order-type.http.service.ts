import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderType } from '../../../model/api/order/order-type';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { Param } from '../../../model/common/param';
import { map } from 'rxjs';

// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class OrderTypeHttpService extends GenericHttpService<OrderType, number> {
    constructor(public http: HttpClient) {
        super(http, "", "ordertypes");
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
