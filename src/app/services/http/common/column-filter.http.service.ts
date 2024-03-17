import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import {ColumnFilter} from '../../../model/common/column-filter';

@Injectable()
export class ColumnFilterHttpService extends GenericHttpService<ColumnFilter, number> {
  constructor(public http: HttpClient) {
    super(http, '', 'columnfilters');
  }
}
