import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from '../../../model/api/assets/activity';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class ActivityHttpService extends GenericHttpService<Activity, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'activities');
    }
}
