import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericHttpService } from '../generic.http.service';
import { Inventory } from "../../../model/api/inventory/inventory";
import { AppConfig } from "../../../config";
import { Param } from "../../../model/common/param";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class InventoryHttpService extends GenericHttpService<Inventory, number> {
    constructor(public http: HttpClient) {
        super(http, "", "inventories");
    }

    public audit(params: Array<Param>) {
        let searchParams: HttpParams = null;
        let url = AppConfig.urlPrefix + this.url + '/audit';

        searchParams = this.getSearchParams(params);
        return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                        map(res => res));
    }

    // public disable(): Observable<void> {
    //     return this.http.put(AppConfig.urlPrefix + this.url + '/disable'
    //         , { headers: this.headers })
    //         .map(() => {});
    // }

    public disable(): Observable<{}> {
        return this.http.put(AppConfig.urlPrefix + this.url + '/disable' , { headers: this.headers}).pipe(
         map((data) => {
            return data;
        }));
    }

    // public viewList(inventoryId: number,costCenterId: number): Observable<any> {

    //   let searchParams: HttpParams = null;
    //   let url = AppConfig.urlPrefix + this.url + '/previewa';

    //   searchParams = this.getSearchParams(params);
    //   return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
    //                   map(res => res));
    // }

    public viewList(params: Array<Param>) {
      let searchParams: HttpParams = null;
      searchParams = this.getSearchParams(params);
      let url = AppConfig.urlPrefix + this.url + '/previewa';

      return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                      map(res => res));
  }

  public viewListMinus(params: Array<Param>) {
    let searchParams: HttpParams = null;
      searchParams = this.getSearchParams(params);
    let url = AppConfig.urlPrefix + this.url + '/previewaminus';

    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
}

public viewListPlus(params: Array<Param>) {
  let searchParams: HttpParams = null;
      searchParams = this.getSearchParams(params);
  let url = AppConfig.urlPrefix + this.url + '/previewaplus';

  return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                  map(res => res));
}

  public allowLabelList(params: Array<Param>) {
    let searchParams: HttpParams = null;
      searchParams = this.getSearchParams(params);
    let url = AppConfig.urlPrefix + this.url + '/allowLabel';

    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
}

public bookBefore(params: Array<Param>) {
  let searchParams: HttpParams = null;
      searchParams = this.getSearchParams(params);
  let url = AppConfig.urlPrefix + this.url + '/bookBefore';

  return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                  map(res => res));
}

public bookAfter(params: Array<Param>) {
  let searchParams: HttpParams = null;
      searchParams = this.getSearchParams(params);
  let url = AppConfig.urlPrefix + this.url + '/bookAfter';

  return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                  map(res => res));
}

public bookPV(params: Array<Param>) {
  let searchParams: HttpParams = null;
      searchParams = this.getSearchParams(params);
  let url = AppConfig.urlPrefix + this.url + '/bookPV';

  return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                  map(res => res));
}

public bookPVFinal(params: Array<Param>) {
  let searchParams: HttpParams = null;
      searchParams = this.getSearchParams(params);
  let url = AppConfig.urlPrefix + this.url + '/bookPVFinal';

  return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                  map(res => res));
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
