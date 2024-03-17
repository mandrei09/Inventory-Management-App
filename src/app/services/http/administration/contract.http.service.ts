import { Param } from './../../../model/common/param';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../config';
import { map } from 'rxjs/operators';
import { ContractSave } from '../../../model/api/administration/contract-save';
@Injectable()
export class ContractHttpService extends GenericHttpService<any, number> {
  constructor(public http: HttpClient) {
    super(http, '', 'contracts');
  }

  getDetailById(id: number): Observable<any> {
    return this.http
      .get(AppConfig.urlPrefix + this.url + `/detail/${id}`).pipe(
      map((data: Response) => {
        return data;
      }));
  }

  addNewBudget(item: ContractSave): Observable<any> {
    const url: string = AppConfig.urlPrefix + this.url + '/detail';

    return this.http
      .post(url, item, { headers: this.headers }).pipe(
      map((data: Response) => {
        return data;
      }));
  }

  updateAsset(item: ContractSave): Observable<{}> {
    const url: string = AppConfig.urlPrefix + this.url + '/detail';
    return this.http.put(url, item, { headers: this.headers });
  }

  public deleteAsset(assetId: number): Observable<any> {
    return this.http.delete(
      AppConfig.urlPrefix + this.url + '/deleteBudget' + `/${assetId}`
    );
  }

  public export(params: Array<Param>) {
    let searchParams: HttpParams = null;
    const url = AppConfig.urlPrefix + this.url + '/export';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                    map(res => res));
  }

  public company(companyId: number, accMonthId: number): Observable<any> {
      return this.http.get(AppConfig.urlPrefix + this.url + '/company' + `/${accMonthId}`+ `/${companyId}`, { headers: this.headers }).pipe(
      map((data: Response) => {
          return data.json();
      }));
  }

  public partner(partnerId: number, accMonthId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/partner' + `/${accMonthId}`+ `/${partnerId}`, { headers: this.headers }).pipe(
    map((data: Response) => {
        return data.json();
    }));
}

public masterType(masterTypeId: number, accMonthId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/masterType' + `/${accMonthId}`+ `/${masterTypeId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data.json();
  }));
}

public expenceType(typeId: number, accMonthId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/expenceType' + `/${accMonthId}`+ `/${typeId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data.json();
  }));
}

public employee(employeeId: number, accMonthId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/employee' + `/${accMonthId}`+ `/${employeeId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data.json();
  }));
}

public subType(subTypeId: number, accMonthId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/subType' + `/${accMonthId}`+ `/${subTypeId}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data.json();
  }));
}

  public total(accMonthId: number): Observable<any> {
      return this.http.get(AppConfig.urlPrefix + this.url + '/total' + `/${accMonthId}`, { headers: this.headers }).pipe(
      map((data: Response) => {
          return data.json();
      }));
  }

  public auditBudgetChart(companyId: number, accMonthId: number): Observable<any> {
      return this.http.get(AppConfig.urlPrefix + this.url + '/auditLocationChart' + `/${companyId}/${accMonthId}`, { headers: this.headers }).pipe(
      map((data: Response) => {
          return data.json();
      }));
  }

  public getCurrency(): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/getCurrency', { headers: this.headers }).pipe(
    map((data: Response) => {
        return data;
    }));
}

public getAllCurrency(): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/getAllCurrency', { headers: this.headers }).pipe(
  map((data: Response) => {
      return data;
  }));
}


public getContractByID(contractID: string): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/getContractByID' + `/${contractID}`, { headers: this.headers }).pipe(
  map((data: Response) => {
      return data;
  }));
}
}
