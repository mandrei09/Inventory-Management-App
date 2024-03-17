import { Injectable } from '@angular/core';
import { PermissionCode } from '../model/auth';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthorizationService {

    permissions: Array<string>; // The actions for which this user has permissions

    constructor(public auth: AuthenticationService) {
    }

    hasPermission(permissionCode: PermissionCode) {

        // if (!permissionCode) {
        //     return true;
        // }

        this.permissions = this.auth.permissionsSubject.value;

        // console.log('hasPermission');
        // console.log(JSON.stringify(this.permissions));

        if (this.permissions && this.permissions.find(permission => {
                return permission === permissionCode;
            })) {
            return true;
        }

        // alert('Nu aveti permisiune pentru acest ecran!');
        return false;
    }

    // initializePermissions() {
    //     return new Promise((resolve, reject) => {
    //         this.authorizationDataService.getPermissions()
    //             .then(permissions => {
    //                 this.permissions = permissions;
    //                 resolve();
    //             })
    //             .catch((e) => {
    //                 reject(e);
    //             });
    //     });
    // }
}
