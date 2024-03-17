import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../config';
import { RequestBudgetForecastMaterial } from '../../../model/api/requests/request-budget-forecast-material';
import { RequestBudgetForecastMaterialAdd } from '../../../model/api/requests/request-budget-forecast-material-add';
import { RequestBudgetForecastMaterialUpdate } from '../../../model/api/requests/request-budget-forecast-material-update';
import { RequestBudgetForecastMaterialUpdateAssetParent } from '../../../model/api/requests/request-budget-forecast-material-update-asset-parent';
import { RequestResult } from '../../../model/api/result/request-result';
import { GenericHttpService } from '../generic.http.service';


@Injectable()
export class RequestBudgetForecastMaterialHttpService extends GenericHttpService<RequestBudgetForecastMaterial, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'requestbudgetforecastmaterials');
    }

    public addMaterialByRequestBudgetForecast(reco: RequestBudgetForecastMaterialAdd): Observable<any> {
        // return super.create(reco, 'reco')
        return this.http.post(AppConfig.urlPrefix + this.url + '/add', reco, { headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
    }

    public deleteMaterialByRequestBudgetForecast(id: number): Observable<any> {
        return this.http.delete(AppConfig.urlPrefix + this.url + '/remove' + `/${id}`).pipe(
        map((data: Response) => {
            return data;
        }));
    }

    public requestBudgetForecastMaterialUpdate(reco: Array<RequestBudgetForecastMaterialUpdate>): Observable<RequestResult> {
      // return super.create(reco, 'reco')
      return this.http.post(AppConfig.urlPrefix + this.url + '/update', reco, { headers: this.headers }).pipe(
      map((data: RequestResult) => {
          return data;
      }));
  }

  public requestBFMAssetParent(reco: Array<RequestBudgetForecastMaterialUpdateAssetParent>): Observable<RequestResult> {
    // return super.create(reco, 'reco')
    return this.http.post(AppConfig.urlPrefix + this.url + '/updateAssetParent', reco, { headers: this.headers }).pipe(
    map((data: RequestResult) => {
        return data;
    }));
}
}
