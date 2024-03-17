import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Param } from '../../../model/common/param';
import { map } from 'rxjs/operators';
import { Matrix } from '../../../model/api/administration/matrix';
import { Observable } from 'rxjs';
import { MatrixImport } from '../../../model/common/import/matrix-import';
import { MatrixData } from '../../../model/api/administration/matrix-data';
import { TreeNode } from 'primeng/api';


@Injectable()
export class MatrixHttpService extends GenericHttpService<Matrix, number> {
    constructor(public authHttp: HttpClient) {
        super(authHttp, '', 'matrix');
    }

    public export(params: Array<Param>) {
        let searchParams: HttpParams = null;
        const url = AppConfig.urlPrefix + this.url + '/export';

        searchParams = this.getSearchParams(params);

      return this.http.get(url, { params: searchParams, observe: 'response', responseType: 'blob'}).pipe(
        map((result) => {
            return result;
        })
    );
    }

    public upload(item: MatrixImport): Observable<any> {
        return this.http.post(AppConfig.urlPrefix + this.url + '/import', item).pipe(
            map((data) => {
                return data;
            }));
    }

    public template() {
      const url = AppConfig.urlPrefix + this.url + '/template';
      return this.http.get(url, { observe: 'response', responseType: 'blob' }).pipe(
                      map(res => res));
    }

    public getData(projectId: number, costCenterId: number): Observable<MatrixData[]> {
        return this.http.get(AppConfig.urlPrefix + this.url + '/data' + `/${projectId}` + `/${costCenterId}`, { headers: this.headers }).pipe(
        map((data: MatrixData[]) => {
            return data;
        }));
    }

    public getMatrixData(projectId: number, costCenterId: number, projectTypeId: number, assetTypeId: number, value: number): Observable<Matrix[]> {
        return this.http.get(AppConfig.urlPrefix + this.url + '/matchmatrix' + `/${projectId}` + `/${costCenterId}` + `/${projectTypeId}` + `/${assetTypeId}` + `/${value}`, { headers: this.headers }).pipe(
        map((data: Matrix[]) => {
            return data;
        }));
    }

    public matchmatrixeditpanel(orderId: number): Observable<TreeNode[]> {
      return this.http.get(AppConfig.urlPrefix + this.url + '/matchmatrixeditpanel' + `/${orderId}`, { headers: this.headers }).pipe(
      map((data: TreeNode[]) => {
          return data;
      }));
  }

}
