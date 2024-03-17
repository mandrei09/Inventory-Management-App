import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../config';
import { OfferMaterial } from '../../../model/api/administration/offer-material';
import { OfferITMaterialAdd } from '../../../model/api/assets/offer-it-material-add';
import { OfferMaterialAdd } from '../../../model/api/assets/offer-material-add';
import { GenericHttpService } from '../generic.http.service';


@Injectable()
export class OfferMaterialHttpService extends GenericHttpService<OfferMaterial, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'offermaterials');
    }

    public addMaterialByOffer(reco: OfferMaterialAdd): Observable<any> {
        // return super.create(reco, 'reco')
        return this.http.post(AppConfig.urlPrefix + this.url + '/add', reco, { headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
    }

    public addMaterialByOrder(reco: OfferITMaterialAdd): Observable<any> {
        // return super.create(reco, 'reco')
        return this.http.post(AppConfig.urlPrefix + this.url + '/addByOrder', reco, { headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
    }

    public addMaterialByOfferFromAsset(reco: OfferMaterialAdd): Observable<any> {
        // return super.create(reco, 'reco')
        return this.http.post(AppConfig.urlPrefix + this.url + '/addFromAsset', reco, { headers: this.headers }).pipe(
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
