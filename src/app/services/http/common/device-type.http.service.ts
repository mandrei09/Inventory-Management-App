import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../config';
import { map } from 'rxjs/operators';
import { Param } from '../../../model/common/param';
import { Injectable } from '@angular/core';
import { DeviceType } from '../../../model/api/common/device-type';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class DeviceTypeHttpService extends GenericHttpService<DeviceType, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'devicetypes');
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