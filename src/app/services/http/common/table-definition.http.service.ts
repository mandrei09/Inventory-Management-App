
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { TableDefinition } from '../../../model/common/table-definition';

@Injectable()
export class TableDefinitionHttpService extends GenericHttpService<TableDefinition, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'tabledefinitions');
    }

    // public getDownloadData(): Observable<any> {
    //     // return this.get(null, null, '', '', null, null, 'data').map((data: any) => {
    //     //         return data;
    //     //     });
    // }

    public download() {
        // const url = AppConfig.urlPrefix + this.url + '/download';

        // return this.http.get(url, { responseType: ResponseContentType.Blob })
        //                 .map(res => res.blob());
    }

    public upload(fileToUpload: any) {
        const input = new FormData();
        input.append('file', fileToUpload);
        return this.http
            .post(AppConfig.urlPrefix + this.url + '/upload', input);
    }
}
