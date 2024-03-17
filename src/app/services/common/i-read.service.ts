
import { Observable } from 'rxjs';
import { Param } from '../../model/common/param';

export interface IReadService<V> {
    getById<T>(id: V): Observable<T>;
    get<T>(currentPage: number, pageSize: number, sortColumn: string, sortDirection: string,
        params: Array<Param>, parent?: number, detailType?: string): Observable<T>;
}

