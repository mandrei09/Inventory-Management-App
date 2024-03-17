import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { DocumentType } from '../../../model/api/documents/document-type';
import { HttpClient } from '@angular/common/http';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class DocumentTypeHttpService extends GenericHttpService<DocumentType, number> {
    constructor(public http: HttpClient) {
        super(http, "", "documenttypes");
    }
}