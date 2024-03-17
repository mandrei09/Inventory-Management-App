import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { HttpClient , HttpParams } from '@angular/common/http';
import { City } from '../../../model/api/administration/city';
import { Param } from '../../../model/common/param';
import { map } from 'rxjs/operators';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CityHttpService extends GenericHttpService<City, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'cities');
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

    public getData(): Observable<any> {
        // return this.http.get(AppConfig.urlPrefix + this.url , { headers: this.headers })
        // .map((data: Response) => {
        //     return data.json();
        // });

        return this.http.get(AppConfig.urlPrefix + this.url, { headers: this.headers }).pipe(
            map((result) => {
                return result;
            })
        );


    }
}
