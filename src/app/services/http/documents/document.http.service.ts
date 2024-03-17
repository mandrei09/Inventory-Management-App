// import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../../../model/api/documents/document';
import { DocumentUpload } from '../../../model/api/documents/document-upload';
import { GenericHttpService } from './../generic.http.service';
import { AppConfig } from '../../../config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PersonelValidate } from '../../../model/api/documents/personel-validate';
import { TransferResult } from '../../../model/api/result/transfer-result';

@Injectable()
export class DocumentHttpService extends GenericHttpService<Document, number> {
    constructor(public authHttp: HttpClient) {
        super(authHttp, '', 'documents');
    }

    public saveFullDocument(document: DocumentUpload): Observable<TransferResult> {
      return this.http.post(AppConfig.urlPrefix + this.url + '/full', document, { headers: this.headers }).pipe(
          map((response: TransferResult) => {
              return response;
          }));
  }

  public saveWFHFullDocument(document: DocumentUpload): Observable<TransferResult> {
    return this.http.post(AppConfig.urlPrefix + this.url + '/wfhfull', document, { headers: this.headers }).pipe(
        map((response: TransferResult) => {
            return response;
        }));
}

    public saveStateChange(document: DocumentUpload): Observable<{}> {
        return this.http.post(AppConfig.urlPrefix + this.url + '/stateChange', document, { headers: this.headers }).pipe(
            map((response) => {

                return response;

            }));
    }

    public operation(document: DocumentUpload): Observable<{}> {
        return this.http.post(AppConfig.urlPrefix + this.url + '/validate', document, { headers: this.headers }).pipe(
            map((response) => {

                return response;

            }));
    }

    public personelValidate(assetIds: PersonelValidate): Observable<TransferResult> {
      return this.http.post(AppConfig.urlPrefix + this.url + '/personelValidate', assetIds, { headers: this.headers }).pipe(
          map((response: TransferResult) => {

              return response;

          }));
  }

  public managerValidate(assetIds: PersonelValidate): Observable<TransferResult> {
    return this.http.post(AppConfig.urlPrefix + this.url + '/managerValidate', assetIds, { headers: this.headers }).pipe(
        map((response: TransferResult) => {

            return response;

        }));
}

    public reactivate(document: DocumentUpload): Observable<{}> {
        return this.http.post(AppConfig.urlPrefix + this.url + '/reactivate', document, { headers: this.headers }).pipe(
            map((response) => {

                return response;

            }));
    }

    public reject(document: DocumentUpload): Observable<TransferResult> {
      return this.http.post(AppConfig.urlPrefix + this.url + '/reject', document, { headers: this.headers }).pipe(
          map((response: TransferResult) => {
              return response;
          }));
  }
}
