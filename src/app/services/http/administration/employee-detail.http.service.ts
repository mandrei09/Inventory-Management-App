import { EmployeeImport } from './../../../model/common/import/employee-import';
import { Injectable } from '@angular/core';
import { EmployeeDetail } from '../../../model/api/administration/employee-detail';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from './../../../config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class EmployeeDetailHttpService extends GenericHttpService<EmployeeDetail, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'employees/details');
    }

    public upload(item: EmployeeImport) {
        return this.http.post(AppConfig.urlPrefix + this.url + '/importEmployees',
            JSON.stringify(item), { headers: this.headers }).pipe(
            map((data) => {
                return data;
            })
            );
    }
}