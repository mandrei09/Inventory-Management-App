import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AppConfig } from "../../../config";
import { EmployeeStorage } from "../../../model/api/administration/employee-storage";
import { EmployeeStorageAdd } from "../../../model/api/assets/employee-storage-add";
import { GenericHttpService } from "../generic.http.service";


@Injectable()
export class EmployeeStorageHttpService extends GenericHttpService<EmployeeStorage, number> {
    constructor(public http: HttpClient) {
        super(http, "", "employeestorages");
    }

    public addStorageByEmployee(reco: EmployeeStorageAdd): Observable<any> {
        // return super.create(reco, 'reco')
        return this.http.post(AppConfig.urlPrefix + this.url + '/add', reco, { headers: this.headers }).pipe(
        map((data: Response) => {
            return data;
        }));
    }

    public deleteEmployeeStorage(id: number): Observable<any> {
        return this.http.delete(AppConfig.urlPrefix + this.url + '/remove' + `/${id}`).pipe(
        map((data: Response) => {
            return data;
        }));
    }
}
