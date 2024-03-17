import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { MasterType } from '../../../model/api/assets/master-type';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../config';
import { map } from 'rxjs/operators';
import { Param } from '../../../model/common/param';

@Injectable()
export class MasterTypeHttpService extends GenericHttpService<MasterType, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'mastertypes');
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
