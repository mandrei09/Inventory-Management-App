import { AppConfig } from '../../../config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Param } from '../../../model/common/param';
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { GenericHttpService } from "../generic.http.service";
import { ExpAccount } from "../../../model/api/administration/exp-account";

@Injectable()
export class ExpAccountHttpService extends GenericHttpService<ExpAccount, number> {
    constructor(public http: HttpClient) {
        super(http, "", "expaccounts");
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
