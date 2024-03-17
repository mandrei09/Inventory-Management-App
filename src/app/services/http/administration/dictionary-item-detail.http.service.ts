import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DictionaryItemDetail } from '../../../model/api/administration/dictionary-item-detail';
import { GenericHttpService } from '../generic.http.service';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class DictionaryItemDetailHttpService extends GenericHttpService<DictionaryItemDetail, number> {
    constructor(public http: HttpClient) {
        super(http, "", "dictionaryitems");
    }
}