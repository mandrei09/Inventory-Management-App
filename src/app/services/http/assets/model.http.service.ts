import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../config';
import { Model } from '../../../model/api/assets/model';
import { Param } from '../../../model/common/param';
import { GenericHttpService } from '../generic.http.service';
import { ImportITModelResult } from '../../../model/api/result/model-it-result';
import { ModelITImport } from '../../../model/common/import/model-it-import';
import { Observable } from 'rxjs';

@Injectable()
export class ModelHttpService extends GenericHttpService<Model, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'models');
    }

    public export(params: Array<Param>) {
        let searchParams: HttpParams = null;
        let url = AppConfig.urlPrefix + this.url + '/export';

        searchParams = this.getSearchParams(params);
        return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                        map(res => res));
    }

    public import(item: ModelITImport): Observable<ImportITModelResult> {
      return this.http.post(AppConfig.urlPrefix + this.url + '/import', item).pipe(
          map((data: ImportITModelResult) => {
              return data;
          }));
    }
}
