import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../config';
import { Accountancy } from '../../../model/api/administration/accountancy';
import { AccountancyAdd } from '../../../model/api/assets/accountancy-add';
import { GenericHttpService } from '../generic.http.service';
import { Param } from '../../../model/common/param';


@Injectable()
export class AccountancyHttpService extends GenericHttpService<Accountancy, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'accountancies');
    }

    public addMaterialByOffer(reco: AccountancyAdd): Observable<any> {
        // return super.create(reco, 'reco')
        return this.http.post(AppConfig.urlPrefix + this.url + '/add', reco, { headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
    }

    public deleteOfferMaterial(id: number): Observable<any> {
        return this.http.delete(AppConfig.urlPrefix + this.url + '/remove' + `/${id}`).pipe(
        map((data: Response) => {
            return data;
        }));
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
