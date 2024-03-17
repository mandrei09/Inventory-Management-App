import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppConfig } from '../config';


import { AuthenticationService } from '../services/authentication.service';
import jwt_decode from 'jwt-decode';

/**
 * Provides signin method to signin & signup components.
 */
export class Signin {

    model: any = {};

    errorMessage: any = '';
    // constructor(public router: Router, public authenticationService: AuthenticationService) { }

    constructor(public router: Router, public authenticationService: AuthenticationService) {
        this.authenticationService.permissionsSubject.subscribe(async (res) => {
            if (res.length > 0) {
                if (res[0] === 'MENU_INVENTORY_REPORTS') {
                    const redirect = 'inventory/reports';
                    this.router.navigate([redirect]);
                } 
                else {
                    const redirect: string = this.authenticationService.redirectUrl ? this.authenticationService.redirectUrl
                    // : 'inventory/filter';
                    : 'wfh/validate';

                    // console.log('sigin');
                    // console.log(this.allowWFH);

                    // if(this.allowWFH === true){
                    //   // console.log('employeewfh');
                    //   redirect = 'wfh/status';
                    // }

                    var diplinkRedirect: string = redirect;
                // Redirects the user.
                this.router.navigate([redirect]);
                }
                var link = localStorage.getItem("urlFromEmail");
                if(diplinkRedirect == "wfh/validate" && link != "" && link != "/wfh/validate" && link != "/login")
                {
                    await sleep(3500);
                    this.router.navigate([link]);
                    localStorage.removeItem("urlFromEmail");
                }
            }
        });
    }

  //   public get allowWFH(): boolean {
  //     return AppConfig.ALLOW_WFH;
  // }

    signin(): void {

        this.authenticationService.signin(this.model.username, this.model.password)
            .subscribe(
            (res) => {

                // Optional strategy for refresh token through a scheduler.
                this.authenticationService.scheduleRefresh();

                // Gets the redirect URL from authentication service.
                // If no redirect has been set, uses the default.
                // let redirect: string = this.authenticationService.redirectUrl
                //     ? this.authenticationService.redirectUrl
                //     : 'theme/colors';

                // // Redirects the user.
                // this.router.navigate([redirect]);

            },
            (error: any) => {
                // Checks for error in response (error from the Token endpoint).
                if (error) {
                    const body: any = error;
                    switch (body.error.error) {
                        case 'invalid_grant':
                            this.errorMessage = alert(body.error.error_description);
                            break;
                        default:
                            this.errorMessage = alert('Eroare.Va rugam reincercati');
                    }
                } else {
                    // Error on post request.
                    const errMsg = (error.message) ? error.message :
                        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                    // console.log(errMsg);
                    this.errorMessage = 'Server error. Try later.';
                }
            });
    }
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }