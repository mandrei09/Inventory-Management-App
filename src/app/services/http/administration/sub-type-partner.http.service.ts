import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { SubTypePartner } from '../../../model/api/administration/sub-type-partner';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Param } from '../../../model/common/param';

@Injectable()
export class SubTypePartnerHttpService extends GenericHttpService<SubTypePartner, number> {
    constructor(public http: HttpClient) {
        super(http, "", "subtypepartners");
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
