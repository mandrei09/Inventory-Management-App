import { PagingInfo } from './paging-info';

export class PagedResult<T> {
    items: Array<T>;
    // data: Array<T>;
    pagingInfo: PagingInfo;

    constructor(items: Array<T>, pagingInfo: PagingInfo) {
        this.items = items;
        this.pagingInfo = pagingInfo;
    }
}