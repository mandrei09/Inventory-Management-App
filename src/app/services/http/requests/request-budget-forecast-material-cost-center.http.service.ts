import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../config';
import { RequestResult } from '../../../model/api/result/request-result';
import { GenericHttpService } from '../generic.http.service';
import { RequestBudgetForecastMaterialCostCenter } from '../../../model/api/requests/request-budget-forecast-material-cost-center';
import { RequestBFMaterialCostCenterAdd } from '../../../model/api/requests/request-budget-forecast-material-cost-center-add';
import { RequestBudgetForecastMaterialCostCenterUpdate } from '../../../model/api/requests/request-budget-forecast-material-cost-center-update';
import { RequestBudgetForecastMaterialCostCenterMultiple } from '../../../model/api/requests/request-budget-forecast-material-cost-center-multiple';
import { RequestBFMaterialEmployeeAdd } from '../../../model/api/requests/request-budget-forecast-material-employee-add';
import { RequestBFMaterialEmployeeUpdate } from '../../../model/api/requests/request-budget-forecast-material-employee-update';


@Injectable()
export class RequestBudgetForecastMaterialCostCenterHttpService extends GenericHttpService<RequestBudgetForecastMaterialCostCenter, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'requestbudgetforecastmaterialcostcenters');
    }

    public addMaterialByRequestBudgetForecast(reco: RequestBFMaterialCostCenterAdd): Observable<any> {
        // return super.create(reco, 'reco')
        return this.http.post(AppConfig.urlPrefix + this.url + '/add', reco, { headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
    }

  //   public addEmployeeByRequestBudgetForecast(reco: RequestBFMaterialEmployeeAdd): Observable<any> {
  //     // return super.create(reco, 'reco')
  //     return this.http.post(AppConfig.urlPrefix + this.url + '/addemployee', reco, { headers: this.headers }).pipe(
  //     map((data: Response) => {
  //         return data;
  //     }));
  // }

    public deleteMaterialByRequestBudgetForecast(id: number): Observable<any> {
        return this.http.delete(AppConfig.urlPrefix + this.url + '/remove' + `/${id}`).pipe(
        map((data: Response) => {
            return data;
        }));
    }

    public updateEmployeeByRequestBudgetForecast(reco: RequestBFMaterialEmployeeUpdate): Observable<any> {
      // return super.create(reco, 'reco')
      return this.http.post(AppConfig.urlPrefix + this.url + '/updateemployee', reco, { headers: this.headers }).pipe(
      map((data: Response) => {
          return data;
      }));
  }

  public removeMaterialByRequestBudgetForecastEmployee(id: number): Observable<any> {
    return this.http.delete(AppConfig.urlPrefix + this.url + '/removeemployee' + `/${id}`).pipe(
    map((data: Response) => {
        return data;
    }));
}

    public requestBFMaterialCostCenterUpdate(reco: Array<RequestBudgetForecastMaterialCostCenterUpdate>): Observable<RequestResult> {
      // return super.create(reco, 'reco')
      return this.http.post(AppConfig.urlPrefix + this.url + '/update', reco, { headers: this.headers }).pipe(
      map((data: RequestResult) => {
          return data;
      }));
  }

  public requestBFMaterialCostCenterMultiple(reco: Array<RequestBudgetForecastMaterialCostCenterMultiple>): Observable<RequestResult> {
    // return super.create(reco, 'reco')
    return this.http.post(AppConfig.urlPrefix + this.url + '/updatemultiple', reco, { headers: this.headers }).pipe(
    map((data: RequestResult) => {
        return data;
    }));
}
}
