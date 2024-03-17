import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../config';
import { ProjectTypeDivision } from '../../../model/api/administration/project-type-division';
import { Param } from '../../../model/common/param';
import { GenericHttpService } from '../generic.http.service';



@Injectable()
export class ProjectTypeDivisionHttpService extends GenericHttpService<ProjectTypeDivision, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'projecttypedivisions');
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
}
