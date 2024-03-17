import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Param } from '../../../model/common/param';
import { map } from 'rxjs/operators';
import { CustomINavData } from '../../../model/common/custom-nav';
import { RouteChild } from '../../../model/api/common/route-child';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class RouteChildRoleHttpService extends GenericHttpService<RouteChild, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'routechildrenroles');
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

    public getData(): Observable<CustomINavData[]> {
        return this.http.get(AppConfig.urlPrefix + this.url , { headers: this.headers }).pipe(
        map((data: CustomINavData[]) => {
            return data;
        }));

    }

    public clone(routeId: number, roleId: number, roleCloneId: number, cloneAll: boolean): Observable<boolean> {
      // return super.create(reco, 'reco')
      return this.http.post(AppConfig.urlPrefix + this.url + '/clone/' + routeId + '/' + roleId + '/' + roleCloneId + '/' + cloneAll, JSON.stringify(routeId), { headers: this.headers }).pipe(
      map((data: boolean) => {
          return data;
      }));
  }
}
