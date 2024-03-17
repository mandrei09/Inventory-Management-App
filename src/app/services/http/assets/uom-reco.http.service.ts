import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
// import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { Uom } from '../../../model/api/assets/uom';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../config';

@Injectable()
export class UomRecoHttpService extends GenericHttpService<Uom, number> {
    constructor(public http: HttpClient) {
        super(http, "", "uoms/reco");
    }

    updateAsset(item: Uom): Observable<any> {
        let url: string = AppConfig.urlPrefix + this.url + '/updateAsset';
        return this.http.put(url, JSON.stringify(item), { headers: this.headers });
    }
}