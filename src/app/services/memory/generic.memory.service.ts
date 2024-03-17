import { Observable, Observer, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Param } from '../../model/common/param';
import { IEntity } from '../../model/i-entity';
import { IService } from '../common/i-service';

export abstract class GenericMemoryService<T extends IEntity<V>, V> implements IService<V> {
  
    public dataSource: Array<T>;
    // constructor(public dataSource: Array<T>) {
    // }

    public setDataSource(dataSource: Array<T>) {
        this.dataSource = dataSource;
    }

    getById<T>(id: V): Observable<T> {
        let result: any;
        return result;
    }


    // get(currentPage: number, pageSize: number, sortColumn: string, sortDirection: string, params: Array<Param>, parent?: number): Observable<Array<T>> {
    //     return Observable.of(this.dataSource);
    // }


      get<T>(currentPage: number, pageSize: number, sortColumn: string, sortDirection: string, params: Param[], parent?: number, detailType?: string): Observable<any> {
        // throw new Error('Method not implemented.');
        // return of(this.dataSource);
        return of(this.dataSource).pipe(delay(1000));
    }


    // get(sortColumn: string, sortDirection: string, params: Array<Param>, parent?: number): Observable<Array<T>> {
    //     return Observable.of(this.dataSource);
    // }

    // getPaged(currentPage: number, pageSize: number, sortColumn: string, sortDirection: string, params: Array<Param>, parent?: number): Observable<PagedResult<T>> {
    //     let result: PagedResult<T> = new PagedResult<T>(this.dataSource, new PagingInfo(this.dataSource.length, pageSize, currentPage));
    //     //let result: PagedResult<T> = new PagedResult<T>(this.dataSource, new PagingInfo(0, pageSize, currentPage));
    //     return Observable.fromPromise(Promise.resolve(result));
    //     //return Observable.of(result).timeout(2000);
    // }

    create<T>(item: T): Observable<T> {
        // this.dataSource.push(item);
        //return Observable.fromP(item);

        return new Observable<T>((responseObserver: Observer<T>) => {
            responseObserver.next(item);
        });
    }


    // create<T>(item: T, subUrl?: string): Observable<T> {
    //     this.headers = new HttpHeaders()
    //     .set('content-type', 'application/json')
    //     .set('Access-Control-Allow-Origin', '*');
    //     let url: string = AppConfig.urlPrefix + this.url;
    //     if (subUrl) { url = url + '/' + subUrl; }

    //     return this.http.post(url, JSON.stringify(item), { headers: this.headers }).pipe(
    //       map((result: T) => {
    //           return result;
    //       })
    //   );

    update<T>(item: T): Observable<void> {
        return new Observable<void>((responseObserver: Observer<void>) => {
            responseObserver.next(null);
        });
    }

    delete(id: V): Observable<void> {
        let index: number = -1;
        let currentIndex: number = 0;

        this.dataSource.forEach((item: T) => {
            if (item.id === id) {
                index = currentIndex;
            }
            currentIndex++;
        });

        if (index > -1) {
            this.dataSource.splice(index, 1);
        }
        
        return new Observable<void>((responseObserver: Observer<void>) => {
            responseObserver.next(null);
        });
    }
}