import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../config';
import { map } from 'rxjs/operators';
import { Param } from '../../../model/common/param';
import { Injectable } from '@angular/core';
import { AssetType } from '../../../model/api/assets/asset-type';
import { GenericHttpService } from '../generic.http.service';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class AssetTypeHttpService extends GenericHttpService<AssetType, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'assettypes');
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
