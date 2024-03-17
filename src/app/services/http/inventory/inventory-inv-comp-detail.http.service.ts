import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { InventoryInvCompDetail } from '../../../model/api/inventory/inventory-inv-comp-detail';
import { HttpClient } from '@angular/common/http';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class InventoryInvCompDetailHttpService extends GenericHttpService<InventoryInvCompDetail, number> {
    constructor(public http: HttpClient) {
        super(http, "", "invcomps/inventory");
    }
}