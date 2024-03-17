// import { URLSearchParams } from '@angular/http';
// import { AuthHttp } from 'angular2-jwt';
// import { ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Param } from '../../../model/common/param';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ImportCostCenterResult } from '../../../model/api/result/import-cost-center-result';
import { CostCenterImport } from '../../../model/common/import/cost-center-import';


@Injectable()
export class CostCenterHttpService extends GenericHttpService<CostCenter, number> {
    constructor(public authHttp: HttpClient) {
        super(authHttp, '', 'costcenters');
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

    public getData(params: Array<Param>): Observable<any> {
        let searchParams: HttpParams = null;
        searchParams = this.getSearchParams(params);
        return this.http.get(AppConfig.urlPrefix + 'dashboards/costcenters' , { params: searchParams, headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
    }

    public import(item: CostCenterImport): Observable<ImportCostCenterResult> {
      return this.http.post(AppConfig.urlPrefix + this.url + '/import', item).pipe(
          map((data: ImportCostCenterResult) => {
              return data;
          }));
  }

  public template() {
    const url = AppConfig.urlPrefix + this.url + '/template';
    return this.http.get(url, { observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
  }

}
