import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { SubType } from '../../../model/api/administration/sub-type';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Param } from '../../../model/common/param';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SubTypeHttpService extends GenericHttpService<SubType, number> {
    constructor(public http: HttpClient) {
        super(http, "", "subtypes");
    }


    public export(params: Array<Param>) {
        let searchParams: HttpParams = null;
        let url = AppConfig.urlPrefix + this.url + '/export';

        searchParams = this.getSearchParams(params);
        return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                        map(res => res));
    }

    public getData(params: Array<Param>): Observable<any> {
        let searchParams: HttpParams = null;
        searchParams = this.getSearchParams(params);
        return this.http.get(AppConfig.urlPrefix + this.url , { params: searchParams, headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
    }
}