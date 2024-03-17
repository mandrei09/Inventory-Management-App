import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { InvCompOp } from '../../../model/api/inventory/inv-comp-op';
import { HttpClient } from '@angular/common/http';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class InvCompOpHttpService extends GenericHttpService<InvCompOp, number> {
    constructor(public http: HttpClient) {
        super(http, "", "invcompops");
    }
}