import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { ColumnDefinition } from '../../../model/common/column-definition';

@Injectable()
export class ColumnDefinitionRoleHttpService extends GenericHttpService<ColumnDefinition, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'columndefinitionroles');
    }
}
