import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericHttpService } from '../generic.http.service';
import { AccMonth } from '../../../model/api/accounting/acc-month';
import { Param } from '../../../model/common/param';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../config';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class AccMonthHttpService extends GenericHttpService<AccMonth, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'accmonths');
    }

    public getAccMonth(month: number, year: number): Observable<AccMonth> {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('month', month.toString()));
        params.push(new Param('year', year.toString()));

        return this.get(null, null, '', '', params, null).pipe(map((data: any) => {
                // return data != null ? data.json() : null;
                return data;
            }));

        // return this.get('', '', params, null).subscribe((accMonths: Array<AccMonth>) => {
        //     return accMonths[0];
        // });
    }

    public save(accMonth: AccMonth): Observable<any> {
        return this.http.post(AppConfig.urlPrefix + this.url + '/save', accMonth, { headers: this.headers }).pipe(
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
