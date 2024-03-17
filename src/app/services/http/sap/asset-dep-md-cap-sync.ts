import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../config';
import { AssetDepMDCapSync } from '../../../model/api/sap/asset-dep-md-cap-sync';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class CapAmortizationHttpService extends GenericHttpService<AssetDepMDCapSync, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'capamortizations');
    }

    public updateOptima(): Observable<any> {
        return this.http
            .post(AppConfig.urlPrefix + this.url + '/updateOptima', []).pipe(
            map((data: Response) => {
                return data;
            }));
    }
}
