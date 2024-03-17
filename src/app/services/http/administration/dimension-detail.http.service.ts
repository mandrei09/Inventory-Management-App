import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DimensionDetail } from '../../../model/api/administration/dimension-detail';
import { GenericHttpService } from '../generic.http.service';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class DimensionDetailHttpService extends GenericHttpService<DimensionDetail, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'dimensions');
    }
}