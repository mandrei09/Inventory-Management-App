import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../../../model/api/administration/location';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { HttpClient } from '@angular/common/http';
import { Param } from '../../../model/common/param';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class LocationHttpService extends GenericHttpService<Location, number> {
    constructor(public http: HttpClient) {
        super(http, "", "locations");
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

    // public closeOnDay(year: string, month: string, day: string) {
    //     return this.http.post(AppConfig.urlPrefix + this.url + '/closeOnDay' + `/${year}`+ `/${month}`+ `/${day}`, { headers: this.headers })
    //     .map(res => res.json());
    // }

    public closeOnDay(year: string, month: string, day: string) {
        // return this.http
        //     .post(AppConfig.urlPrefix + this.url + '/closeOnDay' + `/${year}` + `/${month} ` + `/${day}`, { headers: this.headers })
        //     .map((data: Response) => {
        //         return data.json();
        //     });

            return this.http.post(AppConfig.urlPrefix + this.url + '/closeOnDay' + `/${year}` + `/${month} ` + `/${day}`, { headers: this.headers }).pipe(
                map((result) => {
                    return result;
                })
            );
    }


    public getData(): Observable<any> {
        return this.http.get(AppConfig.urlPrefix + this.url , { headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
    }
}
