import {Directive, EventEmitter, Output, ViewChild} from '@angular/core';
import { AppConfig } from '../../config';
import { GenericList } from '../../forms/generic/generic.list';
import { ColumnDefinition } from '../../model/common/column-definition';
import { Param } from '../../model/common/param';
import { TableItem } from '../../model/common/table-item';
import { TableItemTree } from '../../model/common/table-item-tree';
import { IEntity } from '../../model/i-entity';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Sort} from '@angular/material/sort';
@Directive()
export class GenericTableList<T extends IEntity<V>, V> extends GenericList<T, V> {

    public matDataSource: any;
    public displayedColumns: Array<string> = [];
    @ViewChild(MatPaginator) matPaginator!: MatPaginator;

    @Output() public itemMouseOver: EventEmitter<T> = new EventEmitter<T>();
    @Output() public itemMouseLeave: EventEmitter<T> = new EventEmitter<T>();


    private _hidePaginator: boolean = false;
    public set hidePaginator(value: string) {
      this._hidePaginator = value.toLowerCase() === 'true';
    }

    public get showPaginator(): boolean {
      return !this._hidePaginator;
    }

    public tableItems: Array<TableItem<T>> = new Array<TableItem<T>>();
    // public tableItemsTree: Array<TableItemTree<T>> = new Array<TableItemTree<T>>();
    public columns: Array<ColumnDefinition> = new Array<ColumnDefinition>();
    public listFontSize: number = 9;
    public filterSearch = '';
    public rateDate: Date;
    public uomId = 0;
    public uoms: any = [
      { id: 262, code:	'USD', name: '$'},
      { id: 271, code:	'EUR', name: '€'},
      { id: 277, code:	'BGN', name: '??'},
      { id: 279, code:	'GBP', name: '£'},
      { id: 311, code:	'HUF', name: 'Ft'},
      { id: 331, code:	'CHF', name: 'CHF'},
      { id: 356, code:	'PLN', name: 'zl'},
      { id: 358, code:	'RON', name: 'lei'}
  ];
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
        this.initializeTable();
    }

    public initializeTable() {
      this.displayedColumns = new Array<string>();

      if (this.showSelectionCheckBox === 'true') {
        this.displayedColumns.push('select');
      }

      // this.updateIncludes();

      this.columns.forEach((columnDefinition) => {
        if ((columnDefinition.active === undefined) || (columnDefinition.active)) {
          this.displayedColumns.push(columnDefinition.headerCode);
        }
      });
      this.displayedColumns.push('actions');
    }

    public refresh(filters: Array<Param>) {

        // console.log('columns: ' + JSON.stringify(this.columns));

        // if ((this.dynamicQuery === 'true') && (this.columns != null) && (this.params.length == 0)) {
        if ((this.dynamicQuery === 'true') && (this.columns != null)) {
            const includes: Array<string> = new Array<string>();
            this.columns.forEach((column: ColumnDefinition) => {
                if (column.include && column.include.length > 0) {
                    let i = 0;
                    let found = false;
                    for (i = 0; i < includes.length; i++) {
                        if (column.include.indexOf(includes[i]) === 0) {
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
                let includesParamValue = '';

                includes.forEach((include: string) => {
                    includesParamValue = includesParamValue + include + ',';
                });

                // this.params.push(new Param('includes', includesParamValue));
                let found = false;
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
        if (this.items !== undefined) {
            this.items.forEach((item) => {
                let selected = false;

                this._selectedItems.forEach((sItem) => {
                    if (item.id === sItem.id) { selected = true; }
                });

                this.tableItems.push(new TableItem<T>(item, selected));
            });
        }

        this.matDataSource = new MatTableDataSource<TableItem<T>>(this.tableItems);

        // if (this.data !== undefined) {
        //     this.data.forEach((item) => {
        //         let selected = false;

        //         this._selectedItems.forEach((sItem) => {
        //             if (item.id === sItem.id) { selected = true; }
        //         });

        //         this.tableItemsTree.push(new TableItemTree<T>(item, selected));
        //     });
        // }
    }

    public changePage(pageEvent: PageEvent) {
        this.currentPage = pageEvent.pageIndex + 1;
        this.pageSize = pageEvent.pageSize;
        this.refreshItems();
    }

    public sortData(sort: Sort) {
      let sortColumn = '';
      this.columns.forEach((columnDefinition: ColumnDefinition) => {
        if (columnDefinition.headerCode === sort.active) {
          sortColumn = columnDefinition.sortBy;
          if (columnDefinition.include.length > 0) { sortColumn = columnDefinition.include + '.' + sortColumn; }
        }
      });

      this.sortColumn = sortColumn; // sort.active;
      this.sortDirection = sort.direction;
      if (this.paging && this.showPaginator) { this.matPaginator.pageIndex = 0; }
      this.currentPage = 1;
      this.refreshItems();
    }

    public selectItem(item: T) {
        if (this.rowSelection === 'single') {
            this._selectedItems = new Array<T>();
            this._selectedItems.push(item);

            this.tableItems.forEach((tItem) => {
                tItem.selected = tItem.item.id === item.id ? true : false;
            });
        } else if (this.rowSelection === 'multiple') {

            // let found: boolean = false;
            // this.selectedItems.forEach((sItem) => {
            //    if (sItem.id === item.id) {
            //        found = true;
            //    }
            // });

            // if (!found) {
            //    this.selectedItems.push(item);
            // }

            const index: number = this._selectedItems.indexOf(item);
            if (index < 0) {
                this._selectedItems.push(item);
            }

            this.tableItems.forEach((tItem) => {
                if (tItem.item.id === item.id) { tItem.selected = true; }
            });
        }

        if (this.notifyOnChange.toUpperCase() === 'TRUE') {
            this.notifyCurrentSelection();
        }
    }

    public unselectItem(item: T) {
        if (this.rowSelection === 'single') {
            this._selectedItems = new Array<T>();
        } else if (this.rowSelection === 'multiple') {
            let index = -1;
            let currentIndex = 0;

            this._selectedItems.forEach((sItem: T) => {
                if (sItem.id === item.id) {
                    index  = currentIndex;
                }
                currentIndex++;
            });

            if (index > -1) {
                this._selectedItems.splice(index, 1);
            }
        }

        this.tableItems.forEach((tItem) => {
            if (tItem.item.id === item.id) { tItem.selected = false; }
        });

        if (this.notifyOnChange.toUpperCase() === 'TRUE') {
            this.notifyCurrentSelection();
        }
    }

    public updateCheckState(checked: boolean) {
        if (checked) { this.selectAll(); } else { this.unselectAll(); }
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

    public clearFilter() {
        this.filterSearch = '';
        this.applySimpleSearchFilter(this.filterSearch);
    }

  public itemComparer(item1: T, item2: T): boolean {
    return item1.id === item2.id;
  }

    // @ts-ignore
  public itemIsSelected(item: T): boolean {
      let selected = false;
      this._selectedItems.forEach((sItem: T) => {
        if (this.itemComparer(sItem, item)) {
          selected = true;
        }
      });

      return selected;
    }

    public updateItemSelection(tableItem: TableItem<T>) {

      // if ((tableItem.disabled !== undefined) && (tableItem.disabled !== null) && tableItem.disabled) { return; }

      const selected = this.itemIsSelected(tableItem.item);
      if (selected) {
        this.unselectItem(tableItem.item);
      } else {
        this.selectItem(tableItem.item);
      }
    }

    public updateAllSelection(checked: boolean) {
      if (checked) { this.selectAll(); } else { this.unselectAll(); }
    }

    public isAllSelected(): boolean {
      return this.items.every(item => this.itemIsSelected(item));
    }

    public get TableItems(): Array<TableItem<T>> {
        return this.tableItems;
    }

    public onUomUpdate(ev, tableItem) {
   }

   public onRateUpdate(tableItem) {
  }

  public onRateDateUpdate(event, tableItem) {
  }
}
