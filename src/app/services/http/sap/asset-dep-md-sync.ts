import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../config';
import { AssetDepMDSync } from '../../../model/api/sap/asset-dep-md-sync';
import { GenericHttpService } from '../generic.http.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AmortizationHttpService extends GenericHttpService<AssetDepMDSync, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'amortizations');
    }

    public getDataFromSAP(month: string, year: string): Observable<any> {
        const companyCode = 'RO10';

        return this.http.get(AppConfig.urlPrefix + this.url + '/getDataFromSAP' + `/${companyCode}` + `/${year}` + `/${month}`, { headers: this.headers }).pipe(
            map((data: Response) => {
                return data;
            }));
    }

    public updateOptima(): Observable<any> {
        return this.http
            .post(AppConfig.urlPrefix + this.url + '/updateOptima', []).pipe(
            map((data: Response) => {
                return data;
            }));
    }
}
