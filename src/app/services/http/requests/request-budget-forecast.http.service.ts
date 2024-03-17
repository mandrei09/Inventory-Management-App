import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../config';
import { OfferMaterial } from '../../../model/api/administration/offer-material';
import { OfferITMaterialAdd } from '../../../model/api/assets/offer-it-material-add';
import { OfferMaterialAdd } from '../../../model/api/assets/offer-material-add';
import { RequestBudgetForecast } from '../../../model/api/requests/request-budget-forecast';
import { GenericHttpService } from '../generic.http.service';
import { RequestBudgetForecastContractAdd } from '../../../model/api/requests/request-budget-forecast-contract-add';
import { RequestResult } from '../../../model/api/result/request-result';
import { RequestBudgetForecastNeedBudget } from '../../../model/api/requests/request-budget-forecast-need-budget';


@Injectable()
export class RequestBudgetForecastHttpService extends GenericHttpService<RequestBudgetForecast, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'requestbudgetforecasts');
    }

    public addMaterialByOffer(reco: OfferMaterialAdd): Observable<any> {
        // return super.create(reco, 'reco')
        return this.http.post(AppConfig.urlPrefix + this.url + '/add', reco, { headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
    }

    public addContractByRequestBudgetForecast(reco: RequestBudgetForecastContractAdd): Observable<RequestResult> {
      return this.http.post(AppConfig.urlPrefix + this.url + '/contractAdd', reco, { headers: this.headers }).pipe(
      map((data: RequestResult) => {
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

    public requestBFNeedBudget(reco: RequestBudgetForecastNeedBudget): Observable<RequestResult> {
      // return super.create(reco, 'reco')
      return this.http.post(AppConfig.urlPrefix + this.url + '/needBudgetUpdate', reco, { headers: this.headers }).pipe(
      map((data: RequestResult) => {
          return data;
      }));
  }
}
