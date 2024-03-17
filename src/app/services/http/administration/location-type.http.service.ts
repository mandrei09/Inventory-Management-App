import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../../../model/api/administration/location';
import { GenericHttpService } from '../generic.http.service';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class LocationTypeHttpService extends GenericHttpService<Location, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'locationtypes');
    }
}
