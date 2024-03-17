import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DictionaryItem } from '../../../model/api/administration/dictionary-item';
import { GenericHttpService } from '../generic.http.service';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class DictionaryItemHttpService extends GenericHttpService<DictionaryItem, number> {
    constructor(public http: HttpClient) {
        super(http, "", "dictionaryItems");
    }
}