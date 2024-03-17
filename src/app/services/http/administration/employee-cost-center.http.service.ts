import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AppConfig } from "../../../config";
import { EmployeeCostCenter } from "../../../model/api/administration/employee-cost-center";
import { EmployeeCostCenterAdd } from "../../../model/api/assets/employee-cost-center-add";
import { GenericHttpService } from "../generic.http.service";


@Injectable()
export class EmployeeCostCenterHttpService extends GenericHttpService<EmployeeCostCenter, number> {
    constructor(public http: HttpClient) {
        super(http, "", "employeecostcenters");
    }

    public addCostCenterByEmployee(reco: EmployeeCostCenterAdd): Observable<any> {
        // return super.create(reco, 'reco')
        return this.http.post(AppConfig.urlPrefix + this.url + '/add', reco, { headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
    }

    public deleteEmployeeCostCenter(id: number): Observable<any> {
        return this.http.delete(AppConfig.urlPrefix + this.url + '/remove' + `/${id}`).pipe(
        map((data: Response) => {
            return data;
        }));
    }
}
