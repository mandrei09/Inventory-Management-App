import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {GenericHttpService} from './http/generic.http.service';
import {City} from '../model/api/administration/city';
import {AppConfig} from '../config';
import {Param} from '../model/common/param';

/**
 * Identity service (to Identity Web API controller).
 */
@Injectable({
  providedIn: 'root'
})
// export class IdentityService {
export class IdentityService extends GenericHttpService<any, number> {

    headers: HttpHeaders;

    constructor(public http: HttpClient) {
      super(http, '', 'identity/users');

      this.headers = new HttpHeaders()
        .set('content-type', 'application/json');
    }

    // constructor(public http: HttpClient) {
    //
    //     // Creates header for post requests.
    //     // this.headers = new Headers({ 'Content-Type': 'application/json' });
    //     // this.options = new RequestOptions({ headers: this.headers });
    //
    //     this.headers= new HttpHeaders()
    //     .set('content-type', 'application/json')
    //
    // }

    /**
     * Gets all users through AuthHttp.
     */
    public GetData(params: Array<Param>): Observable<any> {
        let searchParams: HttpParams = null;
        searchParams = this.getSearchParams(params);

        // Sends an authenticated request.
        return this.http.get('/api/identity/GetAll', { params: searchParams, headers: this.headers }).pipe(
            map((data) => {

                return data;

            }));

    }

    /**
     * Creates a new user.
     *
     * @param model User's data
     * @return An IdentityResult
     */
    public Create(model: any): Observable<any> {

        let body: string = JSON.stringify(model);


        return this.http.post('/api/identity/Create', body, { headers: this.headers }).pipe(
            map((data) => {

                return data;

            }));

    }

    /**
     * Deletes a user through AuthHttp.
     *
     * @param username Username of the user
     * @return An IdentityResult
     */
    public Delete(username: string): Observable<any> {

        let body: string = JSON.stringify(username);

        // Sends an authenticated request.
        return this.http.post('/api/identity/Delete', body, { headers: this.headers }).pipe(
            map((data) => {

                return data;

            }));

    }

    // Add other methods.

}
