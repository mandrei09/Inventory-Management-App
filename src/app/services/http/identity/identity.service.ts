import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

// import { AuthHttp } from 'angular2-jwt';
// import { User } from "app/model/api/identity/user";
import { UserMobilePhoneResult } from '../../../model/api/result/user-mobile-phone-result';
import { MobilePhoneSave } from '../../../model/api/identity/mobile-phone-save';
import { RoleView } from '../../../model/api/identity/role-view';
import { RoleSave } from '../../../model/api/identity/role-save';
import { RoleResult } from '../../../model/api/result/role-result';
import { Param } from '../../../model/common/param';

/**
 * Identity service (to Identity Web API controller).
 */
@Injectable()
export class IdentityService extends GenericHttpService<any, string> {

    headers: HttpHeaders;
    //options: RequestOptions;
    options: any;

    constructor(public http: HttpClient, public authHttp: HttpClient) {

        super(authHttp, "", "identity");

        // Creates header for post requests.
        let headers = new HttpHeaders({
          'Content-Type': 'application/json'
       });
       this.options = {
          headers: headers
       }

    }

    // /**
    //  * Gets all users through AuthHttp.
    //  */
    // public GetAll(): Observable<any> {

    //     // Sends an authenticated request.
    //     return this.authHttp.get("/api/identity/GetAll")
    //         .map((res: Response) => {

    //             return res.json();

    //         })
    //         .catch((error: any) => {

    //             // Error on get request.
    //             return Observable.throw(error);

    //         });

    // }

    /**
     * Creates a new user.
     *
     * @param model User's data
     * @return An IdentityResult
     */
    public Create(model: any): Observable<any> {

        let body: string = JSON.stringify(model);

        // return this.http.post(AppConfig.urlPrefix + "identity/create", body, this.options).pipe(
        //     map((res: Response) => {

        //         return res.json();

        //     })
        //     .catch((error: any) => {

        //         // Error on post request.
        //         return Observable.throw(error);

        //     })
        //     );

        return this.http.post(AppConfig.urlPrefix + "identity/create", body, this.options).pipe(
          map( (res: any) => {
            return res;
          }),
          catchError(error => {
            console.log('Caught in CatchError. Throwing error')
            throw new Error(error)
          })
        );

    }

    public ChangePassword(model: any): Observable<any> {

        let body: string = JSON.stringify(model);

        return this.http.post(AppConfig.urlPrefix + "identity/password", body, this.options).pipe(
          map( (res: any) => {
            return res.json();
          }),
          catchError(error => {
            console.log('Caught in CatchError. Throwing error')
            throw new Error(error)
          })
        );
    }

    public ResetPassword(model: any): Observable<any> {

        let body: string = JSON.stringify(model);

        return this.http.post(AppConfig.urlPrefix + "identity/resetpassword", body, this.options).pipe(
          map( (res: any) => {
            return res.json();
          }),
          catchError(error => {
            console.log('Caught in CatchError. Throwing error')
            throw new Error(error)
          })
        );
    }

     public UpdateUserAdmCenter(model: any): Observable<any> {

        let body: string = JSON.stringify(model);

        return this.http.post(AppConfig.urlPrefix + "identity/admcenter", body, this.options).pipe(
          map( (res: any) => {
            return res.json();
          }),
          catchError(error => {
            console.log('Caught in CatchError. Throwing error')
            throw new Error(error)
          })
        );
    }

    public UpdateUserTempInterval(interval: any): Observable<any> {

        let body: string = JSON.stringify(interval);

        return this.http.post(AppConfig.urlPrefix + 'identity/tempinterval', body, this.options).pipe(
          map( (res: any) => {
            return res.json();
          }),
          catchError(error => {
            console.log('Caught in CatchError. Throwing error')
            throw new Error(error)
          })
        );
    }

    public UpdateUserEmployee(model: any): Observable<any> {
                let body: string = JSON.stringify(model);
                return this.http.post(AppConfig.urlPrefix + "identity/employee", body, this.options).pipe(
                  map( (res: any) => {
                    return res;
                  }),
                  catchError(error => {
                    console.log('Caught in CatchError. Throwing error')
                    throw new Error(error)
                  })
                );
            }

    public UpdateUserSubstitute(model: any): Observable<any> {
          const body: string = JSON.stringify(model);
          return this.http.post(AppConfig.urlPrefix + 'identity/substitute', body, this.options).pipe(
            map( (res: any) => {
              return res;
            }),
            catchError(error => {
              // console.log('Caught in CatchError. Throwing error');
              throw new Error(error);
            })
          );
      }

            public UpdateUserRoom(model: any): Observable<any> {
                let body: string = JSON.stringify(model);
                return this.http.post(AppConfig.urlPrefix + "identity/room", body, this.options).pipe(
                  map( (res: any) => {
                    return res.json();
                  }),
                  catchError(error => {
                    console.log('Caught in CatchError. Throwing error')
                    throw new Error(error)
                  })
                );
            }

    public UpdateUserDivision(model: any): Observable<any> {
        let body: string = JSON.stringify(model);
        return this.http.post(AppConfig.urlPrefix + "identity/division", body, this.options).pipe(
          map( (res: any) => {
            return res.json();
          }),
          catchError(error => {
            console.log('Caught in CatchError. Throwing error')
            throw new Error(error)
          })
        );
    }

    public updateDevice(userId: string): Observable<void> {
      return this.http.put(AppConfig.urlPrefix + 'identity/updateDevice' + `/${userId}`
          , { headers: this.headers }).pipe(
          map(() => {}));
  }

  public removeMobilePhone(userId: string): Observable<void> {
    return this.http.put(AppConfig.urlPrefix + 'identity/removeMobilePhone' + `/${userId}`
        , { headers: this.headers }).pipe(
        map(() => {}));
}

  public UpdateUserDevice(model: any): Observable<any> {

    let body: string = JSON.stringify(model);

    return this.http.post(AppConfig.urlPrefix + "identity/device", body, this.options).pipe(
        map((res: any) => {
            return res;
        }));
}

public UpdateMobilePhone(model: MobilePhoneSave): Observable<any> {

  let body: string = JSON.stringify(model);

  return this.http.post(AppConfig.urlPrefix + "identity/adminUpdateMobilePhone", body, this.options).pipe(
      map((res: any) => {
          return res;
      }));
}

    // /**
    //  * Deletes a user through AuthHttp.
    //  *
    //  * @param username Username of the user
    //  * @return An IdentityResult
    //  */
    // public Delete(username: string): Observable<any> {

    //     let body: string = JSON.stringify(username);

    //     // Sends an authenticated request.
    //     return this.authHttp.post("/api/identity/Delete", body, this.options)
    //         .map((res: Response) => {

    //             return res.json();

    //         })
    //         .catch((error: any) => {

    //             // Error on post request.
    //             return Observable.throw(error);

    //         });

    // }

    /**
     * Deletes a user through AuthHttp.
     *
     * @param username Username of the user
     * @return An IdentityResult
     */
    public Delete(username: string): Observable<any> {

        let body: string = JSON.stringify(username);

        // Sends an authenticated request.
        return this.http.post(AppConfig.urlPrefix + "identity/delete", body, this.options).pipe(
          map( (res: any) => {
            return res.json();
          }),
          catchError(error => {
            console.log('Caught in CatchError. Throwing error')
            throw new Error(error)
          })
        );
    }

    public updateUser(userEmail: string, claimsValue: string): Observable<void> {
        return this.http.put(AppConfig.urlPrefix + 'identity/updateUser' + `/${userEmail}/${claimsValue}`
            , { headers: this.headers }).pipe(
            map(() => {}));
    }

    updateUserRoles(item: RoleSave): Observable<RoleResult> {
      const url: string = AppConfig.urlPrefix + this.url + '/updateuserroles';
      return this.http
        .post(url, item, { headers: this.headers }).pipe(
        map((data: RoleResult) => {
          return data;
        }));
    }

    updateMobilePhone(item: MobilePhoneSave): Observable<UserMobilePhoneResult> {
      const url: string = AppConfig.urlPrefix + this.url + '/updateMobilePhone';
      return this.http
        .post(url, item, { headers: this.headers }).pipe(
        map((data: UserMobilePhoneResult) => {
          return data;
        }));
    }


    public getUserById(userId: string) {
        return this.http.get(AppConfig.urlPrefix + this.url + '/user' + `/${userId}`, { headers: this.headers }).pipe(
        map((data: Response) => {
            return data.json();
        }));
    }

    public forgetPassword(userEmail: string): Observable<boolean> {
      let body: string = JSON.stringify(userEmail);
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post(AppConfig.urlPrefix + 'identity/forgetPassword', body, { headers: this.headers }).pipe(
      map((data: any) => {
        return data;
    }));
    }

    public ResetEmailPassword(model: any): Observable<any> {

      let body: string = JSON.stringify(model);

      return this.http.post(AppConfig.urlPrefix + "identity/resetemailpassword", body, this.options).pipe(
        map((data: any) => {
          return data;
      }));
          // .catch((error: any) => {
          //     // Error on post request.
          //     return Observable.throw(error);
          // });
    }


    public mustChangePassword(userEmail: string): Observable<boolean> {
      let body: string = JSON.stringify(userEmail);
      return this.http.post(AppConfig.urlPrefix + 'identity/mustChangePassword', body, { headers: this.headers }).pipe(
        map((data: any) => {
          return data;
      }));
    }

    public export(params: Array<Param>) {
      let searchParams: HttpParams = null;
      let url = AppConfig.urlPrefix + this.url + '/export';

      searchParams = this.getSearchParams(params);
      return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob' }).pipe(
                      map(res => res));
  }

    // Add other methods.

}

// import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

// import { AuthHttp } from 'angular2-jwt';
// import { AppConfig } from "app/config";
// import { GenericHttpService } from "app/services/http/generic.http.service";
// import { User } from "app/model/api/identity/user";

// /**
//  * Identity service (to Identity Web API controller).
//  */
// @Injectable()
// export class IdentityService extends GenericHttpService<User, string> {

//     headers: Headers;
//     options: RequestOptions;

//     constructor(public authHttp: AuthHttp, public http: Http) {

//         // Creates header for post requests.
//         this.headers = new Headers({ 'Content-Type': 'application/json' });
//         this.options = new RequestOptions({ headers: this.headers });

//     }

//     /**
//      * Gets all users through AuthHttp.
//      */
//     public GetAll(): Observable<any> {

//         // Sends an authenticated request.
//         return this.authHttp.get("/api/identity/GetAll")
//             .map((res: Response) => {

//                 return res.json();

//             })
//             .catch((error: any) => {

//                 // Error on get request.
//                 return Observable.throw(error);

//             });

//     }

//     /**
//      * Creates a new user.
//      *
//      * @param model User's data
//      * @return An IdentityResult
//      */
//     public Create(model: any): Observable<any> {

//         let body: string = JSON.stringify(model);

//         return this.http.post(AppConfig.urlPrefix + "identity/create", body, this.options)
//             .map((res: Response) => {

//                 return res.json();

//             })
//             .catch((error: any) => {

//                 // Error on post request.
//                 return Observable.throw(error);

//             });

//     }

//     /**
//      * Deletes a user through AuthHttp.
//      *
//      * @param username Username of the user
//      * @return An IdentityResult
//      */
//     public Delete(username: string): Observable<any> {

//         let body: string = JSON.stringify(username);

//         // Sends an authenticated request.
//         return this.authHttp.post("/api/identity/Delete", body, this.options)
//             .map((res: Response) => {

//                 return res.json();

//             })
//             .catch((error: any) => {

//                 // Error on post request.
//                 return Observable.throw(error);

//             });

//     }

//     // Add other methods.

// }
