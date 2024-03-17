import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericHttpService } from '../generic.http.service';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../config';
import { map } from 'rxjs/operators';

//import { AuthHttp } from 'angular2-jwt';
//import { User } from "app/model/api/identity/user";

/**
 * Identity service (to Identity Web API controller).
 */
@Injectable()
export class RoleService extends GenericHttpService<any, string> {

    // headers: Headers;
    // options: RequestOptions;

    constructor(public http: HttpClient) {

        super(http, "", "roles");

        // Creates header for post requests.
        // this.headers = new Headers({ 'Content-Type': 'application/json' });
        // this.options = new RequestOptions({ headers: this.headers });
    }

    public GetAll(): Observable<any> {
        return this.http.get("/api/roles").pipe(
            map((res: Response) => {
                return res;
            }));
    }

    getDetailById(id: string): Observable<any> {
        return this.http.get(AppConfig.urlPrefix + this.url + `/role/${id}`).pipe(
            map((data: Response) => {
                return data;
            }));
    }

}
