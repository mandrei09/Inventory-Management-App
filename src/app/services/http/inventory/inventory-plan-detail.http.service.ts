import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { InventoryPlanComponent } from '../../../forms/inventory/inventory-plans/inventory-plans.component';
import { InventoryPlan } from '../../../model/api/inventory/inventory-plan';
import { Observable, map } from 'rxjs';
import { AppConfig } from '../../../config';

@Injectable()
export class InventoryPlanHttpService extends GenericHttpService<InventoryPlanComponent, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'inventoryplans');
        
    }
    
    UpdateInventorPlan(item: InventoryPlan): Observable<any> {
        const url: string = AppConfig.urlPrefix + this.url + '/updateinventoryplan';
        return this.http.put(url, item, { headers: this.headers }).pipe(
            map((data) => {
                return data;
            }));
    }
}
