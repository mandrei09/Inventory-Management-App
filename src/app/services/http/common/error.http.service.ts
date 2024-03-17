import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Error } from '../../../model/api/common/error';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class ErrorHttpService extends GenericHttpService<Error, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'errors');
    }
}