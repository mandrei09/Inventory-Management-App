import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Level } from '../../../model/api/administration/level';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { Param } from '../../../model/common/param';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class LevelHttpService extends GenericHttpService<Level, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'levels');
    }

    public export(params: Array<Param>) {
      let searchParams: HttpParams = null;
      const url = AppConfig.urlPrefix + this.url + '/export';

      searchParams = this.getSearchParams(params);

    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob'}).pipe(
      map((result) => {
          return result;
      })
  );
  }
}
