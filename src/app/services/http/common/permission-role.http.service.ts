import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { HttpClient } from '@angular/common/http';
import { PermissionRole } from '../../../model/api/common/permission-role';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../config';
import { PermissionType } from '../../../model/api/common/permission-type';

@Injectable()
export class PermissionRoleHttpService extends GenericHttpService<PermissionRole, number> {
    constructor(public http: HttpClient) {
        super(http, "", "permissionroles");
    }

    public getData(role: string): Observable<string[]> {
        return this.http.get(AppConfig.urlPrefix + this.url + '/data/' + role , { headers: this.headers }).pipe(
        map((data: string[]) => {
            return data;
        }));

    }


    public clone(permissionType: number, permissionTypeNew: number): Observable<boolean> {
        // return super.create(reco, 'reco')
        return this.http.post(AppConfig.urlPrefix + this.url + '/clone/' + permissionType + '/' + permissionTypeNew, JSON.stringify(permissionType), { headers: this.headers }).pipe(
        map((data: boolean) => {
            return data;
        }));
    }

    public cloneAll(permissionTypeId: number, roleId: number, roleCloneId: number, cloneAll: boolean): Observable<boolean> {
      // return super.create(reco, 'reco')
      return this.http.post(AppConfig.urlPrefix + this.url + '/cloneAll/' + permissionTypeId + '/' + roleId + '/' + roleCloneId + '/' + cloneAll, JSON.stringify(permissionTypeId), { headers: this.headers }).pipe(
      map((data: boolean) => {
          return data;
      }));
  }
}
