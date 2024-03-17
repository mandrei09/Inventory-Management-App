import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../config';
import { MobilePhone } from '../../../model/api/common/mobile-phone';
import { GenericHttpService } from '../generic.http.service';
import { Observable } from 'rxjs';
import { MobilePhoneITImport } from '../../../model/common/import/mobile-phone-it-import';
import { ImportMobilePhoneResult } from '../../../model/api/result/mobile-phone-it-result';
import { Param } from '../../../model/common/param';

@Injectable()
export class MobilePhoneHttpService extends GenericHttpService<MobilePhone, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'mobilephones');
    }

    public checkUnique(number: string): Observable<boolean> {
      return this.http.get(AppConfig.urlPrefix + this.url + '/checkUnique' + `/${number}`, { headers: this.headers }).pipe(
      map((data: boolean) => {
          return data;
      }));
  }

  public import(item: MobilePhoneITImport): Observable<ImportMobilePhoneResult> {
    return this.http.post(AppConfig.urlPrefix + this.url + '/import', item).pipe(
        map((data: ImportMobilePhoneResult) => {
            return data;
        }));
  }

  public export(params: Array<Param>) {
    let searchParams: HttpParams = null;
    const url = AppConfig.urlPrefix + this.url + '/export';

    searchParams = this.getSearchParams(params);
  return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob'}).pipe(
    map((result) => {
        return result;
    })
);
}
}
