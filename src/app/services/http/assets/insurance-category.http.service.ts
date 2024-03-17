import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../config';
import { InsuranceCategory } from '../../../model/api/assets/insurance-category';
import { Param } from '../../../model/common/param';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class InsuranceCategoryHttpService extends GenericHttpService<InsuranceCategory, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'insurancecategories');
    }

    public export(params: Array<Param>) {
        let searchParams: HttpParams = null;
        let url = AppConfig.urlPrefix + this.url + '/export';
    
        searchParams = this.getSearchParams(params);
        return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                        map(res => res));
    }
}
