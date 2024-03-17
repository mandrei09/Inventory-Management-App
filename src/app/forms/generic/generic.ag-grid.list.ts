import { Component } from '@angular/core';
import { GenericTableList } from './generic.table.list';
import { IEntity } from '../../model/i-entity';
import { GridOptions } from 'ag-grid-community';
import {
  ColDef,
  ColumnApi,
  ColumnResizedEvent,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';
import { InvState } from '../../model/api/inventory/inv-state';
import { Employee } from '../../model/api/administration/employee';
import { PropertyFilterEntity } from '../../model/api/common/property-filter-entity';

export class GenericAgGridList<T extends IEntity<V>, V> extends GenericTableList<T, V> {

  invStates: InvState[];
    transferEmployees: Employee[];
    selectedInvStates: number[];
    selectedTransferEmployees: number[];
    propertyFilters = new Array<PropertyFilterEntity>();

    // private gridApi!: GridApi<any>;
    private gridColumnApi!: ColumnApi;
    public gridOptions: GridOptions = <GridOptions>{
      columnDefs: [
        { field: 'id', maxWidth: 75 },
        { field: 'athlete', minWidth: 190 },
        { field: 'age' },
        { field: 'year' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
      ],

      defaultColDef: {
        flex: 10,
        minWidth: 90,
        resizable: true,
        wrapText: false,     // <-- HERE
        autoHeight: true,   // <-- & HERE
      },

      // use the server-side row model
      // rowModelType: 'serverSide',
      // serverSideStoreType: 'partial',

      // enable pagination
      pagination: true,

      // 10 rows per page (default is 100)
      paginationPageSize: 10,

      // fetch 10 rows per block as page size is 10 (default is 100)
      cacheBlockSize: 10,

      animateRows: true,

    };

    public columnDefs: any[] = null;

    public itemAdded(addedItem: T) {
        super.itemAdded(addedItem);
        this.refreshGrid();
    }

    public itemUpdated(updatedItem: T) {
        super.itemUpdated(updatedItem);
        this.refreshGrid();
    }

    public itemDeleted(deletedItem: T) {
        super.itemDeleted(deletedItem);
        this.refreshGrid();
    }

    refreshGrid() {
        var newItemList: Array<T> = [];
        if (this.items) {
            this.items.forEach((item) => {
                newItemList.push(item);
            });
        }
        this.items = newItemList;
    }

    public onSelectionChanged($event) {
        this.selectedItems = this.gridOptions.api.getSelectedRows();

        // if (String(this.notifyOnChange) === "true") {
        if (this.notifyOnChange) {
            this.notifyCurrentSelection();
        }
    }

    autoSizeAll(skipHeader: boolean) {
      const allColumnIds: string[] = [];
      this.gridColumnApi.getAllColumns()!.forEach((column) => {
        allColumnIds.push(column.getId());
      });
      this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
    }
}
