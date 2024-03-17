import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../config';
import { OrderMaterial } from '../../../model/api/administration/order-material';
import { OfferMaterialAdd } from '../../../model/api/assets/offer-material-add';
import { GenericHttpService } from '../generic.http.service';


@Injectable()
export class OrderMaterialHttpService extends GenericHttpService<OrderMaterial, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'ordermaterials');
    }

    public addMaterialByOffer(reco: OfferMaterialAdd): Observable<any> {
        // return super.create(reco, 'reco')
        return this.http.post(AppConfig.urlPrefix + this.url + '/add', reco, { headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
    }

    public deleteOfferMaterial(id: number): Observable<any> {
        return this.http.delete(AppConfig.urlPrefix + this.url + '/remove' + `/${id}`).pipe(
        map((data: Response) => {
            return data;
        }));
    }
}
