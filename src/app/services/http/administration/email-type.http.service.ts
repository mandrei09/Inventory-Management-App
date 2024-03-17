import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailType } from '../../../model/api/administration/email-type';
import { GenericHttpService } from '../generic.http.service';
@Injectable()
export class EmailTypeHttpService extends GenericHttpService<EmailType, number> {
    constructor(public http: HttpClient) {
        super(http, "", "emailtypes");
    }
}
