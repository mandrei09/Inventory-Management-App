import { Directive } from '@angular/core';
import { AppConfig } from '../../config';
import { GenericList } from '../../forms/generic/generic.list';
import { ColumnDefinition } from '../../model/common/column-definition';
import { Param } from '../../model/common/param';
import { TableItem } from '../../model/common/table-item';
import { IEntity } from '../../model/i-entity';
@Directive()
export class GenericValidateTableList<T extends IEntity<V>, V> extends GenericList<T, V> {

    public tableItems: Array<TableItem<T>> = new Array<TableItem<T>>();
    public columns: Array<ColumnDefinition> = new Array<ColumnDefinition>();
    public listFontSize: number = 9;

    // public itemAdded(addedItem: T) {
    //     super.itemAdded(addedItem);
    //     this.doCustomProcessing();
    // }

    // public itemUpdated(updatedItem: T) {
    //     super.itemUpdated(updatedItem);
    //     this.doCustomProcessing();
    // }

    // public itemDeleted(deletedItem: T) {
    //     super.itemDeleted(deletedItem);
    //     this.doCustomProcessing();
    // }

    constructor(public sortColumnEx: string, public sortDirectionEx: string, public detailTypeEx?: string) {
        // public spinner?: BaThemeSpinner) {
        super(sortColumnEx, sortDirectionEx, detailTypeEx);

        this.listFontSize = AppConfig.LIST_FONT_SIZE;
        console.log(this.tableItems);
    }

    public refresh(filters: Array<Param>) {

        // console.log('columns: ' + JSON.stringify(this.columns));

        // if ((this.dynamicQuery === 'true') && (this.columns != null) && (this.params.length == 0)) {
        if ((this.dynamicQuery === 'true') && (this.columns != null)) {
            let includes: Array<string> = new Array<string>();
            this.columns.forEach((column: ColumnDefinition) => {
                if (column.include && column.include.length > 0) {
                    let i: number = 0;
                    let found: boolean = false;
                    for(i = 0; i < includes.length; i++) {
                        if (column.include.indexOf(includes[i]) == 0) {
                            found = true;
                            includes[i] = column.include;
                            break;
                        }
                    }
                    if (!found) {
                        includes.push(column.include);
                    }
                }
            });

            if (includes.length > 0) {
                let includesParamValue: string = '';

                includes.forEach((include: string) => {
                    includesParamValue = includesParamValue + include + ',';
                });

                // this.params.push(new Param('includes', includesParamValue));
                let found: boolean = false;
                this.params.forEach((param: Param) => {
                    if (param.name === 'includes') {
                        param.value = includesParamValue;
                        found = true;
                    }
                });

                if (!found) {
                    this.params.push(new Param('includes', includesParamValue));
                }
            }
        }

        super.refresh(filters);
    }

    public doCustomProcessing() {
        // this.tableItems = new Array<TableItem<T>>();
        this.tableItems.length = 0;
        if (this.items != null) {
            this.items.forEach((item) => {
                let selected: boolean = false;

                this._selectedItems.forEach((sItem) => {
                    if (item.id === sItem.id) selected = true;
                });

                this.tableItems.push(new TableItem<T>(item, selected));
            });
        }
    }

    public selectItem(item: T) {
        if (this.rowSelection === "single") {
            this._selectedItems = new Array<T>();
            this._selectedItems.push(item);

            this.tableItems.forEach((tItem) => {
                tItem.selected = tItem.item.id === item.id ? true : false;
            });
        }
        else if (this.rowSelection === "multiple") {

            //let found: boolean = false;
            //this.selectedItems.forEach((sItem) => {
            //    if (sItem.id === item.id) {
            //        found = true;
            //    }
            //});

            //if (!found) {
            //    this.selectedItems.push(item);
            //}

            var index: number = this._selectedItems.indexOf(item);
            if (index < 0) {
                this._selectedItems.push(item);
            }

            this.tableItems.forEach((tItem) => {
                if (tItem.item.id === item.id) tItem.selected = true;
            });
        }

        if (this.notifyOnChange.toUpperCase() === "TRUE") {
            this.notifyCurrentSelection();
        }
    }

    public unselectItem(item: T) {
        if (this.rowSelection === "single") {
            this._selectedItems = new Array<T>();
        }
        else if (this.rowSelection === "multiple") {
            let index: number = -1;
            let currentIndex: number = 0;

            this._selectedItems.forEach((sItem: T) => {
                if (sItem.id === item.id)
                {
                    index  = currentIndex;
                }
                currentIndex++;
            });

            if (index > -1)
            {
                this._selectedItems.splice(index, 1);
            }
        }

        this.tableItems.forEach((tItem) => {
            if (tItem.item.id === item.id) tItem.selected = false;
        });

        if (this.notifyOnChange.toUpperCase() === "TRUE") {
            this.notifyCurrentSelection();
        }
    }

    public updateCheckState(checked: boolean) {
        if (checked) this.selectAll(); else this.unselectAll();
    }

    public selectAll() {
        this.tableItems.forEach((tItem: TableItem<T>) => {
            if (!tItem.selected) {
                this.selectItem(tItem.item);
            }
        });
    }

    public unselectAll() {
        this.tableItems.forEach((tItem: TableItem<T>) => {
            if (tItem.selected) {
                this.unselectItem(tItem.item);
            }
        });
    }

    public isAllChecked(): boolean {
        return this.tableItems.every(item => item.selected);
    }

    public get TableItems(): Array<TableItem<T>> {
        return this.tableItems;
    }
}