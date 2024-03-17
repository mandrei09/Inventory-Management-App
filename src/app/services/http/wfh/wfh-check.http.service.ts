import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Param } from '../../../model/common/param';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WFHCheck } from '../../../model/api/wfh/wfh-check';


@Injectable()
export class WFHCheckHttpService extends GenericHttpService<WFHCheck, number> {
    constructor(public authHttp: HttpClient) {
        super(authHttp, '', 'wfhchecks');
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
}
