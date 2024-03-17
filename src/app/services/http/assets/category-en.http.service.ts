import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../config';
import { CategoryEN } from '../../../model/api/assets/category-en';

import { Param } from '../../../model/common/param';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class CategoryENHttpService extends GenericHttpService<CategoryEN, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'categoriesen');
    }

    public export(params: Array<Param>) {
        let searchParams: HttpParams = null;
        const url = AppConfig.urlPrefix + this.url + '/export';
        searchParams = this.getSearchParams(params);
        return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                        map(res => res));
    }
}
