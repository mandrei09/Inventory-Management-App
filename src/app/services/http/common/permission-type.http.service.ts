import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PermissionType } from '../../../model/api/common/permission-type';
import { GenericHttpService } from '../generic.http.service';
@Injectable()
export class PermissionTypeHttpService extends GenericHttpService<PermissionType, number> {
    constructor(public http: HttpClient) {
        super(http, "", "permissiontypes");
    }
}
