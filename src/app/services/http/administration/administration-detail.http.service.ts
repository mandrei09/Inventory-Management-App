import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdministrationDetail } from '../../../model/api/administration/administration-detail';
import { GenericHttpService } from '../generic.http.service';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class AdministrationDetailHttpService extends GenericHttpService<AdministrationDetail, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'administrations');
    }
}
