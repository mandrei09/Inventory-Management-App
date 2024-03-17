import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../config';
import { InterCompanyEN } from '../../../model/api/assets/inter-company-en';
import { Param } from '../../../model/common/param';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class InterCompanyENHttpService extends GenericHttpService<InterCompanyEN, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'intercompaniesen');
    }

    public export(params: Array<Param>) {
        let searchParams: HttpParams = null;
        const url = AppConfig.urlPrefix + this.url + '/export';
        searchParams = this.getSearchParams(params);
        return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                        map(res => res));
    }
}
