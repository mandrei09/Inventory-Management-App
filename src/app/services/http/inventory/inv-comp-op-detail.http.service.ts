import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { InvCompOpDetail } from '../../../model/api/inventory/inv-comp-op-detail';
import { HttpClient } from '@angular/common/http';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class InvCompOpDetailHttpService extends GenericHttpService<InvCompOpDetail, number> {
    constructor(public http: HttpClient) {
        super(http, "", "invcompops/detail");
    }
}