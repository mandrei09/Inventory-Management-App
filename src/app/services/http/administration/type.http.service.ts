import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { Type } from '../../../model/api/administration/type';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Param } from '../../../model/common/param';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TypeHttpService extends GenericHttpService<Type, number> {
    constructor(public http: HttpClient) {
        super(http, "", "types");
    }


    public export(params: Array<Param>) {
        let searchParams: HttpParams = null;
        let url = AppConfig.urlPrefix + this.url + '/export';

        searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
    }

    public getData(): Observable<any> {
        return this.http.get(AppConfig.urlPrefix + this.url , { headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
    }
}