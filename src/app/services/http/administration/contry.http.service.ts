import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../../../model/api/administration/country';
import { GenericHttpService } from '../generic.http.service';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CountryHttpService extends GenericHttpService<Country, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'countries');
    }
}