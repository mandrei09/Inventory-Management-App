import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepartmentDetail } from '../../../model/api/administration/department-detail';
import { GenericHttpService } from '../generic.http.service';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class DepartmentDetailHttpService extends GenericHttpService<DepartmentDetail, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'departments');
    }
}
