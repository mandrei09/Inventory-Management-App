import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { HttpClient } from '@angular/common/http';
import { Company } from '../../../model/api/assets/company';

@Injectable()
export class CompanyHttpService extends GenericHttpService<Company, number> {
    constructor(public http: HttpClient) {
        super(http, "", "companies");
    }
}