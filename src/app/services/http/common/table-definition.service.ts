
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { TableDefinition } from '../../../model/common/table-definition';

@Injectable()
export class TableDefinitionHttpService extends GenericHttpService<TableDefinition, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'tabledefinitions');
    }
}
