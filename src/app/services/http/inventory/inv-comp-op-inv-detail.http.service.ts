import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { InvCompOpInvDetail } from '../../../model/api/inventory/inv-comp-op-inv-detail';
import { HttpClient } from '@angular/common/http';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class InvCompOpInvDetailHttpService extends GenericHttpService<InvCompOpInvDetail, number> {
    constructor(public http: HttpClient) {
        super(http, "", "invcompops/invdetails");
    }
}