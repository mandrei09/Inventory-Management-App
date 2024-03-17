import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../../../config';
import { PrintLabel } from '../../../model/common/print-label';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class PrintLabelHttpService extends GenericHttpService<PrintLabel, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'printlabels');
    }

    public deletePrintLabel(): Observable<any> {
      return this.http
          .post(AppConfig.urlPrefix + this.url + '/deletePrintLabels', []).pipe(
          map((data: Response) => {
              return data;
          }));
  }
}
