import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { HttpClient } from '@angular/common/http';
import { InventoryDetail } from '../../../model/api/inventory/inventory-detail';

@Injectable()
export class InventoryDetailHttpService extends GenericHttpService<InventoryDetail, number> {
    constructor(public http: HttpClient) {
        super(http, "", "inventories");
    }
}