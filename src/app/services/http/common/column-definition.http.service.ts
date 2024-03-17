import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { ColumnDefinition } from '../../../model/common/column-definition';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../config';

@Injectable()
export class ColumnDefinitionHttpService extends GenericHttpService<ColumnDefinition, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'columndefinitions');
    }

    public clone(tableDefinitionId: number, roleId: number, roleCloneId: number, cloneAll: boolean): Observable<boolean> {
        // return super.create(reco, 'reco')
        return this.http.post(AppConfig.urlPrefix + this.url + '/clone/' + tableDefinitionId + '/' + roleId + '/' + roleCloneId + '/' + cloneAll, JSON.stringify(tableDefinitionId), { headers: this.headers }).pipe(
        map((data: boolean) => {
            return data;
        }));
    }
}
