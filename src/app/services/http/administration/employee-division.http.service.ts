import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AppConfig } from "../../../config";
import { EmployeeDivision } from "../../../model/api/administration/employee-division";
import { EmployeeDivisionAdd } from "../../../model/api/assets/employee-division-add";
import { GenericHttpService } from "../generic.http.service";


@Injectable()
export class EmployeeDivisionHttpService extends GenericHttpService<EmployeeDivision, number> {
    constructor(public http: HttpClient) {
        super(http, "", "employeedivisions");
    }

    public addDivisionByEmployee(reco: EmployeeDivisionAdd): Observable<any> {
        // return super.create(reco, 'reco')
        return this.http.post(AppConfig.urlPrefix + this.url + '/add', reco, { headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
    }

    public deleteEmployeeDivision(id: number): Observable<any> {
        return this.http.delete(AppConfig.urlPrefix + this.url + '/remove' + `/${id}`).pipe(
        map((data: Response) => {
            return data;
        }));
    }
}
