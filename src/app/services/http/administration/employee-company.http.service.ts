import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AppConfig } from "../../../config";
import { GenericHttpService } from "../generic.http.service";
import { EmployeeCompany } from '../../../model/api/administration/employee-company';
import { EmployeeCompanyAdd } from '../../../model/api/assets/employee-cmpany-add';


@Injectable()
export class EmployeeCompanyHttpService extends GenericHttpService<EmployeeCompany, number> {
    constructor(public http: HttpClient) {
        super(http, "", "employeecompanies");
    }

    public addCompanyByEmployee(reco: EmployeeCompanyAdd): Observable<any> {
        // return super.create(reco, 'reco')
        return this.http.post(AppConfig.urlPrefix + this.url + '/add', reco, { headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
    }

    public deleteEmployeeCompany(id: number): Observable<any> {
        return this.http.delete(AppConfig.urlPrefix + this.url + '/remove' + `/${id}`).pipe(
        map((data: Response) => {
            return data;
        }));
    }
}
