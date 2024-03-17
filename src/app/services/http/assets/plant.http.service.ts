import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plant } from '../../../model/api/assets/plant';
import { GenericHttpService } from '../generic.http.service';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class PlantHttpService extends GenericHttpService<Plant, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'plants');
    }
}
