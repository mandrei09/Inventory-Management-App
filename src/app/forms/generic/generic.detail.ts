import { Component, Input, Output, EventEmitter, Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IService } from '../../services/common/i-service';
import { AppUtils } from '../../common/app.utils';
import { IEntity } from '../../model/i-entity';

enum ViewMode {
    AddNew = 1,
    Edit = 2,
    Delete = 3
}

@Directive()
export class GenericDetail<T extends IEntity<V>, V> {

    @Input() dataSource: IService<V>;
    @Input() addNewItemEvent: EventEmitter<void>;
    @Input() editItemEvent: EventEmitter<IEntity<V>>;

    @Output() public itemAdded = new EventEmitter<T>();
    @Output() public itemUpdated = new EventEmitter<T>();
    @Output() public itemDeleted = new EventEmitter<T>();
    @Output() public changesCanceled = new EventEmitter<void>();

    public item: T = null;
    deleteConfirmationMode: boolean = false;
    public viewMode: ViewMode = ViewMode.AddNew;

    ngOnInit() {
        if (this.addNewItemEvent != null) {
            this.addNewItemEvent.subscribe(
                () => {
                    // this.viewMode = ViewMode.AddNew;
                    // this.setItemDefaultValues();

                    this.addNew();
                });
        }

        if (this.editItemEvent != null) {
            this.editItemEvent.subscribe(
                (item: T) => {
                    // this.viewMode = ViewMode.Edit;
                    // this.item = AppUtils.copyObject<T>(data);
                    this.edit(item);
                });
        }
    }

    setItemDefaultValues() {
        this.item = null;
    }

    // get itemId(): number { return 0; }

    // getItemId(): number {
    //    return 0;
    // }

    public saveItem() {
        if (this.viewMode === ViewMode.AddNew) {
            this.dataSource.create(this.item).subscribe(
                res => {
                    this.itemAdded.emit(res);
                }
            );
        } else {
            this.dataSource.update(this.item).subscribe(
                () => {
                    this.itemUpdated.emit(this.item);
                }
            );
        }

        this.resetForm();
    }

    deleteItem() {
        this.deleteConfirmationMode = false;
        this.dataSource.delete(this.item.id).subscribe(
            res => {
                this.itemDeleted.emit(this.item);
            }
        );
        this.resetForm();
    }

    cancelChanges() {
        this.changesCanceled.emit(null);
        this.resetForm();
    }

    public resetForm() {
    }

    public addNew() {
        this.viewMode = ViewMode.AddNew;
        this.item = null;
        this.setItemDefaultValues();
    }

    public edit(item: T) {
        this.viewMode = ViewMode.Edit;
        this.item = AppUtils.copyObject<T>(item);
    }
}
