import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { InvCompDetail } from '../../../model/api/inventory/inv-comp-detail';
import { HttpClient } from '@angular/common/http';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class InvCompDetailHttpService extends GenericHttpService<InvCompDetail, number> {
    constructor(public http: HttpClient) {
        super(http, "", "invcomps/detail");
    }
}