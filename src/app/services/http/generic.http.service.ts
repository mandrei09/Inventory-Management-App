import { HttpParams , HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config';
import { IService } from '../common/i-service';
import { Param } from '../../model/common/param';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';

export abstract class GenericHttpService<T, W> implements IService<W> {

    public headers: HttpHeaders = null;

    constructor(public http: HttpClient, public parentUrl: string, public url: string) {
        // this.headers = new HttpHeaders();
        // this.headers.append('Content-Type', 'application/json');
        // this.headers.append('Access-Control-Allow-Origin', '*');
        // this.headers = new HttpHeaders()
        //     .set('content-type', 'application/json')
        //     .set('Access-Control-Allow-Origin', '*');
    }

    public getSearchParams(params: Array<Param>) {
        let searchParams: HttpParams  = null;

        if (params && params.length > 0) {
            searchParams = new HttpParams ();

            params.forEach((param) => {
                if ((param.value != null) && (param.value.length > 0)) {
                    searchParams = searchParams.set(param.name, param.value);
                }
            });
        }

        return searchParams;
    }

    public httpGet(parent: number, currentPage: number, pageSize: number, sortColumn: string,
        sortDirection: string, params: Array<Param>, detailType?: string): any {

        let urlLeft = this.url;
        if (detailType) { urlLeft = urlLeft + '/' + detailType; }
        const urlRight = '';
        const filter = '';
        let filtered = false;
        let paged = false;

        let searchParams = new HttpParams();
        if (currentPage > 0) {
            // console.log(currentPage);
            // urlLeft = urlLeft + '/paged';
            // urlRight = urlRight + `page=${currentPage}&pageSize=${pageSize}`;
            searchParams = searchParams.set('page', currentPage.toString());
            searchParams = searchParams.set('pageSize', pageSize.toString());
            paged = true;
        }

        if ((sortColumn != null) && (sortColumn.length > 0)) {
            // urlRight = urlRight + `&sortColumn=${sortColumn}&sortDirection=${sortDirection}`;
            searchParams = searchParams.set('sortColumn', sortColumn);
            searchParams = searchParams.set('sortDirection', sortDirection);
            // filtered = true;
        }

        if (params && params.length > 0) {
            params.forEach((param) => {
                switch (param.name) {
                    case 'parentId':
                        urlLeft = this.parentUrl + `/${param.value}` + urlLeft;
                        break;
                    // case "filter":
                    //     filter = param.value;
                    //     break;
                    default:
                        if ((param.value != null) && (param.value.length > 0)) {
                            // searchParams.set(param.name, param.value);
                            searchParams = searchParams.set(param.name, param.value);
                        }
                        break;
                }
            });
            filtered = true;
        }

        if (!paged && filtered) { urlLeft = urlLeft + '/filtered'; }

        // if (filter.length > 0) {
        //     if (!searchParams) {
        //         urlRight = urlRight + `&filter=${filter}`;
        //     }
        //     else {
        //         searchParams.set("filter", filter);
        //     }
        // }

        // let urlLeft = (parent > 0 ? this.parentUrl + `/${parent}/` : '') + this.url;
        // let urlRight = '';

        // let searchParams: HttpParams  = null;

        // if (currentPage > 0) {
        //     urlRight = urlRight + `/${currentPage}/${pageSize}`;

        //     if ((sortColumn != null) && (sortColumn.length > 0)) {
        //         urlRight = urlRight + `/${sortColumn}/${sortDirection}`;
        //     }
        // }

        // if (params) {
        //     if ((params.length == 1) && (params[0].name === 'filter')) {
        //         urlRight = urlRight + `/${params[0].value}`;
        //     }
        //     else {
        //         if (params.length > 0) {
        //             urlLeft = urlLeft + '/filtered';
        //             searchParams = new HttpParams ();
        //             params.forEach((param) => {
        //                 searchParams.set(param.name, param.value);
        //             });
        //         }
        //     }
        // }

        // return this.http.get(AppConfig.urlPrefix + urlLeft + urlRight, (searchParams ? { search: searchParams } : null))
        //     .map((data: Response) => {
        //         return data.json();
        //     })
        //     .catch(this.handleError);
        // return this.http.get(AppConfig.urlPrefix + urlLeft + urlRight, (searchParams ? { search: searchParams } : null)).pipe(
        //     map((data: Response) => {
        //         console.log(JSON.stringify(data));
        //                 return data;
        //             })
        // );

        return this.http.get(AppConfig.urlPrefix + urlLeft + urlRight, { params: searchParams, headers: this.headers }).pipe(
            map((result) => {
                return result;
            })
        );
    }

    handleError(error: Response) {
        console.error('Eroare: ' + error);
        return throwError(error);
    }

    // tslint:disable-next-line: no-shadowed-variable
    getById<V, W>(id: W): Observable<V> {
        // return this.http.get(AppConfig.urlPrefix + this.url + `/${id}`)
        //     .map((data: Response) => {
        //         return data.json();
        //     });

            return this.http.get(AppConfig.urlPrefix + this.url + `/${id}`).pipe(
                map((result: any) => {
                    return result;
                })
            );
    }

    get<V>(currentPage: number, pageSize: number, sortColumn: string, sortDirection: string,
        params: Array<Param>, parent?: number, detailType?: string): Observable<V> {
        return this.httpGet((parent ? parent : 0), currentPage, pageSize, sortColumn, sortDirection, params, detailType);
    }

    // tslint:disable-next-line: no-shadowed-variable
    create<T>(item: T, subUrl?: string): Observable<T> {
        this.headers = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*');
        let url: string = AppConfig.urlPrefix + this.url;
        if (subUrl) { url = url + '/' + subUrl; }

        return this.http.post(url, JSON.stringify(item), { headers: this.headers }).pipe(
          map((result: T) => {
              return result;
          })
      );

        // return this.http.post(url, JSON.stringify(item), { headers: this.headers })
        //     .map((data: Response) => {
        //         return data.json();
        //     });
            // .map((item: T) => {
            //    return item;
            // });
    }

    // tslint:disable-next-line: no-shadowed-variable
    update<T>(item: T): Observable<any> {
        this.headers = new HttpHeaders()
          .set('content-type', 'application/json')
          .set('Access-Control-Allow-Origin', '*');
        return this.http.put(AppConfig.urlPrefix + this.url, JSON.stringify(item), { headers: this.headers }).pipe(
            map((result: T) => {
                return result;
            }));
    }

    delete(id: W): Observable<any> {
        this.headers = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*');
        return this.http.delete(AppConfig.urlPrefix + this.url + `/${id}`);
    }
}
