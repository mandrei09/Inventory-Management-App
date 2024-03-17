import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../config';
import { map } from 'rxjs/operators';
import { Param } from '../../../model/common/param';
import { AppState } from '../../../model/api/common/app-state';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class AppStateHttpService extends GenericHttpService<AppState, number> {
    constructor(public http: HttpClient) {
        super(http, "", "appstates");
    }

    getDetailByParentCode(parentCode: string): Observable<any> {
        return this.http.get(AppConfig.urlPrefix + this.url + `/parentCode/${parentCode}`).pipe(
            map((data: Response) => {
                return data;
            }));
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
