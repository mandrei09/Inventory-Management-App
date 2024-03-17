import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailManagerDetail } from '../../../model/api/administration/email-manager-detail';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class EmailManagerDetailHttpService extends GenericHttpService<EmailManagerDetail, number> {
    constructor(public http: HttpClient) {
        super(http, "", "emailmanagers");
    }
}