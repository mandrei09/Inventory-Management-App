import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { HttpClient , HttpParams } from '@angular/common/http';
import { City } from '../../../model/api/administration/city';
import { Param } from '../../../model/common/param';
import { map } from 'rxjs/operators';
import { Route } from '../../../model/api/common/route';
import { CustomINavData } from '../../../model/common/custom-nav';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class RouteRoleHttpService extends GenericHttpService<Route, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'routeroles');
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

    public getData(role: string): Observable<CustomINavData[]> {
        return this.http.get(AppConfig.urlPrefix + this.url + '/data/' +  role, { headers: this.headers }).pipe(
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
