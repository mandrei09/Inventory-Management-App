import { AfterViewInit, Directive, EventEmitter } from '@angular/core';
import { Param } from '../../model/common/param';
import { IEntity } from '../../model/i-entity';

@Directive()
export class GenericManage<T extends IEntity<V>, V> implements AfterViewInit {

    public selectedItem: IEntity<V> = null;

    public addNewItemEvent: EventEmitter<void> = new EventEmitter<void>();
    public editItemEvent: EventEmitter<IEntity<V>> = new EventEmitter<IEntity<V>>();
    public itemAddedEvent: EventEmitter<T> = new EventEmitter<T>();
    public itemUpdatedEvent: EventEmitter<T> = new EventEmitter<T>();
    public itemDeletedEvent: EventEmitter<T> = new EventEmitter<T>();

    public requestSelectionEvent: EventEmitter<void> = new EventEmitter<void>();
    public requestRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    public updateSelectionEvent: EventEmitter<Array<T>> = new EventEmitter<Array<T>>();

    public viewMode: GenericManageViewMode = GenericManageViewMode.ItemList;
    // public viewMode: number = GenericManageViewMode.ItemList;

    // public get itemListViewMode(): boolean { return this.viewMode === GenericManageViewMode.ItemList; }
    // public get itemDetailViewMode(): boolean { return this.viewMode === GenericManageViewMode.ItemDetail; }

    // public detailMode: boolean = false;
    // public viewMode: string = 'DEFAULT';

    // constructor(public service: GenericService<T>, public url: string) {
    // }

    ngAfterViewInit() {
        this.requestRefreshEvent.emit(null);
    }

    public setSelectedItem(items: Array<T>) {
        this.selectedItem = ((items != null) && (items.length > 0)) ? items[0] : null;
    }

    public doSimpleSearch(filter: string) {
        // if ((filter != null) && (filter != undefined) && (filter.length > 0)) {
            const params: Array<Param> = new Array<Param>();
            params.push(new Param('filter', filter));
            this.requestRefreshEvent.emit(params);
        // }
    }

    public addNewItem() {
        this.addNewItemEvent.emit(null);
        this.detailInitialize();
    }

    public editItem() {
        this.editItemEvent.emit(this.selectedItem);
        this.detailInitialize();
    }

    public itemAdded(item: T) {
        this.itemAddedEvent.emit(item);
        this.detailTerminate();
    }

    public itemUpdated(item: T) {
        if (this.selectedItem.id === item.id) {
            this.selectedItem = item;
        }

        this.itemUpdatedEvent.emit(item);
        this.detailTerminate();
    }

    public itemDeleted(item: T) {
        this.selectedItem = null;
        this.itemDeletedEvent.emit(item);
        this.detailTerminate();
    }

    public detailInitialize() {
        this.viewMode = GenericManageViewMode.ItemDetail;
    }

    public detailTerminate() {
        this.viewMode = GenericManageViewMode.ItemList;
    }
}

export enum GenericManageViewMode {
    ItemList = 1,
    ItemDetail = 2
}
