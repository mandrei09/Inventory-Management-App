import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Badge } from '../../../model/api/common/badge';
import { GenericHttpService } from '../generic.http.service';
@Injectable()
export class BadgeHttpService extends GenericHttpService<Badge, number> {
    constructor(public http: HttpClient) {
        super(http, "", "badges");
    }
}
