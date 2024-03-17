import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config';
import { ConfigValue } from '../../../model/api/common/config-value';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class ConfigValuesHttpService extends GenericHttpService<ConfigValue, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'configvalues');
    }

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
