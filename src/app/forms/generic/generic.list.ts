import { Component, Input, Output, EventEmitter, OnInit, Directive, ViewChild } from '@angular/core';
import { AppUtils } from '../../common/app.utils';
import { InvState } from '../../model/api/inventory/inv-state';
import { PagedResult } from '../../model/common/paged-result';
import { Param } from '../../model/common/param';
import { IEntity } from '../../model/i-entity';
import { IReadService } from '../../services/common/i-read.service';
import { MatPaginator } from '@angular/material/paginator';
@Directive()
export class GenericList<T extends IEntity<V>, V> implements OnInit {
    @Input() dataSource: IReadService<V>;
    @Input() public itemAddedEvent: EventEmitter<T>;
    @Input() public itemUpdatedEvent: EventEmitter<T>;
    @Input() public itemDeletedEvent: EventEmitter<T>;
    @Input() public requestSelectionEvent: EventEmitter<void>;
    // @Input() public requestRefreshEvent: EventEmitter<Array<T>>;
    @Input() public requestRefreshEvent: EventEmitter<Array<Param>>;
    @Input() public updateSelectionEvent: EventEmitter<Array<T>>;
    @Input() public requestClearEvent: EventEmitter<void>;
    @Input() public pageSizeUpdatedEvent: EventEmitter<number>;
    @Input() public setCurrentPageDataEvent: EventEmitter<PagedResult<T>>;

    @Input() public showRowAddItemAction: string = 'false';
    @Input() public showPrintAction: string = 'false';
    @Input() public showViewAction: string = 'false';
    @Input() public showEditAction: string = 'false';
    @Input() public showCancelAction: string = 'false';
    @Input() public showDeleteAction: string = 'false';
    @Input() public showMediaPreviewAction: string = 'false';

    @Output() public itemAdd: EventEmitter<void> = new EventEmitter<void>();
    @Output() public itemEdit: EventEmitter<T> = new EventEmitter<T>();
    @Output() public itemDelete: EventEmitter<T> = new EventEmitter<T>();

    @Output() public itemCancel: EventEmitter<T> = new EventEmitter<T>();
    @Output() public itemPrint: EventEmitter<T> = new EventEmitter<T>();
    @Output() public rowAddItem: EventEmitter<T> = new EventEmitter<T>();

    @Output() public itemClose: EventEmitter<T> = new EventEmitter<T>();
    @Output() public itemAccept: EventEmitter<T> = new EventEmitter<T>();
    @Output() public itemMediaPreview: EventEmitter<T> = new EventEmitter<T>();
    @Output() public selectedRow: EventEmitter<T> = new EventEmitter<T>();
    @Output() public itemView: EventEmitter<T> = new EventEmitter<T>();
    @Output() public itemMouseOver: EventEmitter<T> = new EventEmitter<T>();
    @Output() public itemMouseLeave: EventEmitter<T> = new EventEmitter<T>();

    @Input() public parentId: number = 0;
    @Input() public pageSize: number = 10;
    // @Input() public pageSize: string = "10";
    @Input() public rowSelection: string = 'single'; // "multiple"
    @Input() public notifyOnChange: string = 'true';
    @Input() public usePaging: string = 'false';
    @Input() public showHeader: string = 'false';
    @Input() public showSimpleSearch: string = 'true';
    @Input() public showSelectionCheckBox: string = 'true';
    @Input() public loadOnInit: string = 'false';
    @Input() public selectionRequired: string = 'false';
    @Input() public dynamicQuery: string = 'false';
    @Input() public detailType: string = '';
    @Input() public sortColumn: string = '';
    @Input() public sortDirection: string = '';
    // @Input() public dataSource: string = "HTTP";

    @Output() public selectionChanged: EventEmitter<Array<T>> = new EventEmitter<Array<T>>();
    @Output() public CurrentPageData: PagedResult<T> = null;

    public get paging(): boolean { return this.usePaging === 'true'; }

    public params: Array<Param> = new Array<Param>();
    // public jsonFilters: string = "";
    public items: Array<T> = new Array<T>();
    public data: Array<T> = new Array<T>();
    @Input() public _selectedItems: Array<T> = new Array<T>();

    public _tableFilters: Array<T> = new Array<T>();

    // public sortColumn: string = "";
    // public sortDirection: string = "asc";
    constructor(public sortColumnEx: string, public sortDirectionEx: string, public detailTypeEx?: string
    ) {
    }

    // paging
    // public pagingInfo: PagingInfo = new PagingInfo(0, 1, 10); //totalItems = 0, currentPage = 1, pageSize = 15

    public initialized: boolean = false;
    public totalItems: number = 0;
    public currentPage: number = 1;
    public sumValueDepFYStart: number = 0;
    public sumValueAPCFYStart: number = 0;
    public sumValueBkValFYStart: number = 0;
    public sumValueCurrBkValue: number = 0;
    public sumValueCurrentAPC: number = 0;
    public sumValueDepTransfer: number = 0;
    public sumValueDepRetirement: number = 0;
    public sumValueTransfer: number = 0;
    public sumValueRetirement: number = 0;
    public sumValueAcquisition: number = 0;
    public sumValueDepForYear: number = 0;
    public sumValueAccumulDep: number = 0;

    public totalNetAmount: number = 0;
    public totalTaxAmount: number = 0;

    public showFooter: boolean = false;

    public sumApril: number = 0;
    public sumMay: number = 0;
    public sumJune: number = 0;
    public sumJuly: number = 0;
    public sumAugust: number = 0;
    public sumSeptember: number = 0;
    public sumOctomber: number = 0;
    public sumNovember: number = 0;
    public sumDecember: number = 0;
    public sumJanuary: number = 0;
    public sumFebruary: number = 0;
    public sumMarch: number = 0;
    public sumTotal: number = 0;

    public sumValuePosCap: number = 0;
    public countFinished: number = 0;
    // public pageSize: number = 50;

    public maxSize: number = 10;
    public numPages: number = 0;
    public loading: boolean = false;

    @ViewChild(MatPaginator) matPaginator!: MatPaginator;


    ngOnInit() {
        if (this.itemAddedEvent != null) { this.itemAddedEvent.subscribe((data: T) => this.itemAdded(data)); }
        if (this.itemUpdatedEvent != null) {
            this.itemUpdatedEvent.subscribe(
                (data: T) => this.itemUpdated(data)
            );
        }
        if (this.itemDeletedEvent != null) { this.itemDeletedEvent.subscribe((data: T) => this.itemDeleted(data)); }
        if (this.requestSelectionEvent != null) { this.requestSelectionEvent.subscribe(() => this.notifyCurrentSelection()); }
        if (this.requestRefreshEvent != null) {
            this.requestRefreshEvent.subscribe((externalFilters: Array<Param>) => {
                this.initialized = true;
                this.refresh(externalFilters);
            });
        }
        if (this.updateSelectionEvent != null) {
            this.updateSelectionEvent.subscribe((selectedItems: Array<T>) => {
                this._selectedItems = selectedItems != null ? selectedItems : new Array<T>();
                this.doCustomProcessing();
            });
        }
        if (this.requestClearEvent != null) { this.requestClearEvent.subscribe(() => this.clear()); }
        if (this.pageSizeUpdatedEvent != null) {
            this.pageSizeUpdatedEvent.subscribe(
                (pageSize: number) => this.pageSize = pageSize
            );
        }
        if (this.setCurrentPageDataEvent != null) {
            this.setCurrentPageDataEvent.subscribe(
                (data: PagedResult<T>) => this.setCurrentPageData(data)
            );
        }

        if (this.loadOnInit === 'true') {
            this.initialized = true;
            this.refresh(null);
        }
    }

    public applySimpleSearchFilter(filter: string) {
        const filters: Array<Param> = new Array<Param>();
        filters.push(new Param('filter', filter));
        this.refresh(filters);
    }

    public applyInvStateFilter(event) {
        let selectedInvStates: Array<InvState> = null;
        selectedInvStates = event;
        const filters: Array<Param> = new Array<Param>();
        filters.push(new Param('invStateIds', AppUtils.getIdsList<InvState, number>(selectedInvStates)));
        // filters.push(new Param('invStateId', id.toString()));
        // console.log(JSON.stringify(filters));
        this.refresh(filters);
    }

    public refresh(filters: Array<Param>) { // , mergeFilters: boolean = false) {
        // if (mergeFilters) {
        //     this.mergeFilters(filters);
        // }
        // else {
        //     this.resetFilters(filters);
        // }
        this.mergeFilters(filters);

        if(this.matPaginator != undefined)
        {
            this.currentPage = 1
            this.matPaginator.pageIndex = 0;
        }
        
        this.refreshItems();
    }

    public mergeFilters(filters: Array<Param>) {
        if (filters != null) {
            let found = false;

            filters.forEach((filter) => {

                found = false;
                this.params.forEach((param) => {
                    if (param.name === filter.name) {
                        param.value = filter.value;
                        found = true;
                    }
                });

                if (!found) {
                    this.params.push(filter);
                }
            });
        }
    }

    public resetFilters(filters: Array<Param>) {
        this.params = new Array<Param>();

        if (filters != null) {
            filters.forEach((filter) => {
                this.params.push(filter);
            });
        }
    }

    public clear() {

        this.items = new Array<T>();
        if (this.usePaging === 'true') {
            this.totalItems = 0;
        }
        this.doCustomProcessing();
    }
    
    public refreshItems() {
        this.loading = true;
        if (this.usePaging === 'true') {
            this.dataSource.get<PagedResult<T>>(this.currentPage, this.pageSize, this.sortColumn, this.sortDirection,
                    this.params, (this.parentId > 0 ? this.parentId : null), this.detailType)
                .subscribe(res => {
                    // this.items = res.items;

                    // //this.pagingInfo = res.paging;
                    // this.totalItems = res.pagingInfo.totalItems;
                    // this.pageSize = res.pagingInfo.pageSize;
                    // //this.pageSize = res.pagingInfo.pageSize.toString();
                    // this.currentPage = res.pagingInfo.currentPage;

                    // this.doCustomProcessing();

                    this.setCurrentPageData(res);
                    // this.isBusy = false;
                    this.loading = false;
                    this.initialized = true;
            });
        } else {
            // this.service.get(this.url, this.params).subscribe(res => {
            this.dataSource.get<Array<T>>(null, null, this.sortColumn, this.sortDirection, this.params,
                    (this.parentId > 0 ? this.parentId : null), this.detailType)
                .subscribe(res => {
                this.items = res;

                this.doCustomProcessing();
                // this.isBusy = false;
                this.loading = false;
            });
        }
    }

    public setCurrentPageData(pageData: PagedResult<T>) {
        this.items = pageData.items;
        // this.data = pageData.data;

        this.totalItems = pageData.pagingInfo.totalItems;
        this.totalNetAmount = pageData.pagingInfo.totalNetAmount;
        this.totalTaxAmount = pageData.pagingInfo.totalTaxAmount;
        this.showFooter = pageData.pagingInfo.showFooter;
        this.pageSize = pageData.pagingInfo.pageSize;
        this.currentPage = pageData.pagingInfo.currentPage;
        this.sumValueDepFYStart = pageData.pagingInfo.sumValueDepFYStart;
        this.sumValueAPCFYStart = pageData.pagingInfo.sumValueAPCFYStart;
        this.sumValueBkValFYStart = pageData.pagingInfo.sumValueBkValFYStart;
        this.sumValueCurrBkValue = pageData.pagingInfo.sumValueDepYTDIn;
        this.sumValueCurrentAPC = pageData.pagingInfo.sumValueCurrentAPC;
        this.sumValueDepTransfer = pageData.pagingInfo.sumValueDepTransfer;
        this.sumValueDepRetirement = pageData.pagingInfo.sumValueDepRetirement;
        this.sumValueTransfer = pageData.pagingInfo.sumValueTransfer;
        this.sumValueRetirement = pageData.pagingInfo.sumValueRetirement;
        this.sumValueAcquisition = pageData.pagingInfo.sumValueAcquisition;
        this.sumValueDepForYear = pageData.pagingInfo.sumValueDepForYear;
        this.sumValueAccumulDep = pageData.pagingInfo.sumValueAccumulDep;

        this.sumApril = pageData.pagingInfo.sumApril;
        this.sumMay = pageData.pagingInfo.sumMay;
        this.sumJune = pageData.pagingInfo.sumJune;
        this.sumJuly = pageData.pagingInfo.sumJuly;
        this.sumAugust = pageData.pagingInfo.sumAugust;
        this.sumSeptember = pageData.pagingInfo.sumSeptember;
        this.sumOctomber = pageData.pagingInfo.sumOctomber;
        this.sumNovember = pageData.pagingInfo.sumNovember;
        this.sumDecember = pageData.pagingInfo.sumDecember;
        this.sumJanuary = pageData.pagingInfo.sumJanuary;
        this.sumFebruary = pageData.pagingInfo.sumFebruary;
        this.sumMarch = pageData.pagingInfo.sumMarch;
        this.sumTotal = pageData.pagingInfo.sumTotal;
        // this.countFinished = pageData.pagingInfo.countFinished;

        this.CurrentPageData = pageData;

        this.doCustomProcessing();
    }

    // public setCurrentData(params: Array<Param>, pageData: PagedResult<T>) {
    //     this.params = params;
    //     this.setCurrentPageData(pageData);
    // }

    public get searchParams(): Array<Param> {
        return this.params;
    }

    public set searchParams(params: Array<Param>) {
        this.params = params;
    }

    public get sortingColumn(): string {
        return this.sortColumn;
    }

    public set sortingColumn(sortColumn: string) {
        this.sortColumn = sortColumn;
    }
    public get sortingDirection(): string {
        return this.sortDirection;
    }

    public set sortingDirection(sortDirection: string) {
        this.sortDirection = sortDirection;
    }

    public get selectedItems(): Array<T> {
        return this._selectedItems;
        // return (this.rowSelection === 'multiple') ? this._selectedItems : null;
    }

    public get selectedItem(): T {
        return ((this.rowSelection === 'single') &&
        (this._selectedItems != null) &&
        (this._selectedItems.length === 1)) ? this._selectedItems[0] : null;
    }

    public set selectedItems(selectedItems: Array<T>) {
        this._selectedItems = selectedItems;

        // if (this.notifyOnChange.toUpperCase() === "TRUE") {
        //     this.notifyCurrentSelection();
        // }

        this.doCustomProcessing();
    }

    public doCustomProcessing() {
    }

    public itemAdded(addedItem: T) {
        // this.items.push(addedItem);

        // this.items.splice(this.items.length - 1, 1);
        // this.items.splice(0, 0, addedItem);
        // this.totalItems += 1;

        this.refreshItems();
    }

    public itemUpdated(updatedItem: T) {
        // 1
        // let index: number = this.items.indexOf(updatedItem);
        // 2
        // let currentIndex = -1;
        // let index = -1;

        // this.items.forEach((item: T) => {
        //     currentIndex++;
        //     if (item.id === updatedItem.id) {
        //         index = currentIndex;
        //     }
        // });

        // if (index != -1) {
        //     this.items.splice(index, 1, updatedItem);
        // }

        // 3
        this.refreshItems();
    }

    public itemDeleted(deletedItem: T) {
        // 1
        // let index: number = this.items.indexOf(deletedItem);
        // this.items.splice(index, 1);

        // 2
        // let currentIndex = -1;
        // let index = -1;

        // this.items.forEach((item: T) => {
        //     currentIndex++;
        //     if (item.id === deletedItem.id) {
        //         index = currentIndex;
        //     }
        // });

        // if (index != -1) {
        //     this.items.splice(index, 1);
        // }
        // this.totalItems -= 1;

        // 3
        this.refreshItems();
    }

    public notifyCurrentSelection() {
        this.selectionChanged.emit(this._selectedItems);
    }

    // public isBusy: boolean = false;

    public pageChanged(event: any): void {
        // if (this.isBusy === false) {
        //     this.isBusy = true;
            // this.pagingInfo.currentPage = event.page;

            // this.currentPage = event.first;
            // this.pageSize = event.rows;

            if (event.page === this.currentPage) { return; }

           // console.log(JSON.stringify(event));
            this.currentPage = event.page;

            // if (event.pageIndex != null) {
            //     if (event.pageIndex === 0) {
            //         this.currentPage = 1;
            //     } else {
            //         this.currentPage = event.pageIndex;
            //         // this.pageSize = event.pageSize;
            //     }
            // }
            // this.pageSize = event.pageSize;


            this.refreshItems();
        // }
    }

    applySort(sortColumn: string) {
        if (this.sortColumn === sortColumn) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = sortColumn;
            this.sortDirection = 'asc';
        }

        this.refreshItems();
    }

    public getInvStates() {
        this.dataSource.get<Array<T>>(null, null, this.sortColumn, this.sortDirection, this.params,
            (this.parentId > 0 ? this.parentId : null), this.detailType)
        .subscribe(res => {
        this._tableFilters = res;
        this.loading = false;
    });
    }
}
