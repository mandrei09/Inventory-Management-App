import { Directive, Input } from '@angular/core';
import { IEntity } from '../../model/i-entity';
import { GenericTableList } from './generic.table.list';
@Directive()
export class GenericPrimeNgDataOrderTableList<T extends IEntity<V>, V> extends GenericTableList<T, V> {
    // selectedInvStates: InvState[];
    first = 1;
    rows = this.pageSize;

    public loadData(event: any) {
        // event.first = First row offset
        // event.rows = Number of rows per page
        // event.sortField = Field name to sort in single sort mode
        // event.sortOrder = Sort order as number, 1 for asc and -1 for dec in single sort mode
        // multiSortMeta: An array of SortMeta objects used in multiple columns sorting. Each SortMeta has field and order properties.
        // filters: Filters object having field as key and filter value, filter matchMode as value

        // let sortColumn: string = event.sortField === undefined ? this.sortColumn : event.sortField;

        let sortColumn = '';
        if (event.sortField === undefined) {
            sortColumn = this.sortColumn;
        } else {
            sortColumn = event.sortField;
            this.sortDirection = event.sortOrder === -1 ? 'desc' : 'asc';
        }

        let dotIndex = -1;
        dotIndex = sortColumn.lastIndexOf('.');
        // if (dotIndex >= 0) sortColumn = sortColumn.substring(dotIndex + 1);

        this.currentPage = (event.first / event.rows) + 1;
        this.pageSize = event.rows;
        this.sortColumn = sortColumn;

        if (this.initialized)
        console.log('1');
        setTimeout(() => {
            this.refreshItems();
          }, 0);

    }

    paginate(event) {
        this.currentPage = event.first;
        this.pageSize = event.rows;
        this.refreshItems();
        console.log('currentPaginationPage = first: ' + this.currentPage + ' rows: ' + this.pageSize);
        }

        getValue(event: Event): string {
            return (event.target as HTMLInputElement).value;
          }

    isNumber(value: string | number): boolean {
        return ((value != null) &&
                (value !== '') &&
                !isNaN(Number(value.toString())));
      }
}
