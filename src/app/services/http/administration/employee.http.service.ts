import { Injectable } from '@angular/core';
import { Employee } from '../../../model/api/administration/employee';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Param } from '../../../model/common/param';
import { EmployeeCostCenterAdd } from '../../../model/api/assets/employee-cost-center-add';

@Injectable()
export class EmployeeHttpService extends GenericHttpService<Employee, number> {
    constructor(public http: HttpClient) {
        super(http, "", "employees");
    }

    public updateEmployee(employee : Employee): Observable<any> {
        return this.http
            .post(AppConfig.urlPrefix + this.url + '/updateEmployee',employee).pipe(
            map((data: Response) => {
                return data;
            }));
    }

    public import(file: any) {
        let input = new FormData();
        input.append('file', file);

        return this.http
            .post(AppConfig.urlPrefix + this.url + '/importEmployees', input).pipe(
            map((data: Response) => {
                return data;
            }));
    }

    getDetailById(id: number): Observable<any> {
        return this.http.get(AppConfig.urlPrefix + this.url + `/detail/${id}`).pipe(
            map((data: Response) => {
                return data;
            }));
    }

    public sendEmail(employeeId: number): Observable<any> {
        // console.log('ITEMS: ', item);
        return this.http.post(AppConfig.urlPrefix + this.url + `/sendEmail/ ${employeeId}`,
            { headers: this.headers }).pipe(
            map((data: Response) => {
                return data;
            }));
    }

    public sendBookEmail(employeeId: number): Observable<any> {
        // console.log('ITEMS: ', item);
        return this.http.post(AppConfig.urlPrefix + this.url + `/sendBookEmail/ ${employeeId}`,
            { headers: this.headers }).pipe(
            map((data: Response) => {
                return data;
            }));
    }

    public sendITBookEmail(employeeId: number): Observable<any> {
        // console.log('ITEMS: ', item);
        return this.http.post(AppConfig.urlPrefix + this.url + `/sendITBookEmail/${employeeId}`,
            { headers: this.headers }).pipe(
            map((data: Response) => {
                return data;
            }));
    }

    public sendBookEmailPreview(employeeId: number): Observable<any> {
        return this.http.get(AppConfig.urlPrefix + this.url + `/sendBookEmailPreview/ ${employeeId}`, { responseType: 'text' }).pipe(
            map((data: any) => {
                return data;
            }));
    }

    public export(params: Array<Param>) {
        let searchParams: HttpParams = null;
        const url = AppConfig.urlPrefix + this.url + '/export';
        searchParams = this.getSearchParams(params);
        return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                        map(res => res));
    }

    public updateAllEmp(): Observable<any> {
        return this.http
            .post(AppConfig.urlPrefix + this.url + '/updateAllEmployees', []).pipe(
            map((data: Response) => {
                return data;
            }));
    }

    public getData(params: Array<Param>): Observable<any> {
      let searchParams: HttpParams = null;
      searchParams = this.getSearchParams(params);
      return this.http.get(AppConfig.urlPrefix + 'employees/inuse/' , { params: searchParams, headers: this.headers }).pipe(
      map((data: Response) => {
          return data;
      }));
    }

    public deleteEmployee(employeeId: number): Observable<any> {
        return this.http.post(AppConfig.urlPrefix + this.url + '/deleteEmployee/', employeeId, { headers: this.headers }).pipe(
        map((data: any) => {
            return data;
        }));
    }
}
