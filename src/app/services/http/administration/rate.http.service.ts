import { Param } from './../../../model/common/param';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../config';
import { map } from 'rxjs/operators';
import { ContractSave } from '../../../model/api/administration/contract-save';
import { Rate } from '../../../model/api/administration/rate';
@Injectable()
export class RateHttpService extends GenericHttpService<any, number> {
  constructor(public http: HttpClient) {
    super(http, '', 'rates');
  }


  public getCurrency(currency: string): Observable<Rate> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/getCurrency/' + `${currency}`, { headers: this.headers }).pipe(
    map((data: Rate) => {
        return data;
    }));
}

public getRateByDate(day: string): Observable<Rate> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/getRateByDate/' + `${day}`, { headers: this.headers }).pipe(
  map((data: Rate) => {
      return data;
  }));
}

}
