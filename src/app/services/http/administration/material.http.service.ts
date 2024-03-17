import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GenericHttpService } from "../generic.http.service";
import { Material } from "../../../model/api/administration/material";
import { AppConfig } from '../../../config';
import { Param } from '../../../model/common/param';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class MaterialHttpService extends GenericHttpService<Material, number> {
    constructor(public http: HttpClient) {
        super(http, "", "materials");
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
