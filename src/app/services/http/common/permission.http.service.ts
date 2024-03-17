import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { HttpClient } from '@angular/common/http';
import { Permission } from '../../../model/api/common/permission';

@Injectable()
export class PermissionHttpService extends GenericHttpService<Permission, number> {
    constructor(public http: HttpClient) {
        super(http, "", "permissions");
    }
}
