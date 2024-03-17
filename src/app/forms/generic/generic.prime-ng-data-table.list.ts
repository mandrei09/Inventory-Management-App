import { Directive, Input } from '@angular/core';
import { InvState } from '../../model/api/inventory/inv-state';
import { IEntity } from '../../model/i-entity';
import { GenericTableList } from './generic.table.list';
@Directive()
export class GenericPrimeNgDataTableList<T extends IEntity<V>, V> extends GenericTableList<T, V> {
    @Input() public showValues: boolean = false;
    invStates: InvState[];
    // selectedInvStates: InvState[];
    first = 1;
    rows = 5;

    public loadData(event: any) {
        // event.first = First row offset
        // event.rows = Number of rows per page
        // event.sortField = Field name to sort in single sort mode
        // event.sortOrder = Sort order as number, 1 for asc and -1 for dec in single sort mode
        // multiSortMeta: An array of SortMeta objects used in multiple columns sorting. Each SortMeta has field and order properties.
        // filters: Filters object having field as key and filter value, filter matchMode as value

        // let sortColumn: string = event.sortField === undefined ? this.sortColumn : event.sortField;

        // this.invStates = [
        //     {id: 1, parentCode: '', mask: '', isDeleted: false, state: '', name: 'New York', code: 'NY', notSync: '', isLocked: false},
        //     {id: 1, parentCode: '', mask: '', isDeleted: false, state: '', name: 'Rome', code: 'RM', notSync: '', isLocked: false},
        //     {id: 1, parentCode: '', mask: '', isDeleted: false, state: '', name: 'London', code: 'LDN', notSync: '', isLocked: false},
        //     {id: 1, parentCode: '', mask: '', isDeleted: false, state: '', name: 'Istanbul', code: 'IST', notSync: '', isLocked: false},
        //     {id: 1, parentCode: '', mask: '', isDeleted: false, state: '', name: 'Paris', code: 'PRS', notSync: '', isLocked: false}
        // ];


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
        // this.initialized = true;

        console.log(this.initialized);
        if (this.initialized){
         // console.log('1');
        setTimeout(() => {
            this.refreshItems();
          }, 0);
        }
    }

    public paginate(event) {
      let pageIndex = event.first/event.rows + 1;
      // console.log(pageIndex);
      // console.log(event);
        this.currentPage = event.first/event.rows + 1;
        this.pageSize = event.rows;
        this.refreshItems();
        // console.log('currentPaginationPage = first: ' + this.currentPage + ' rows: ' + this.pageSize);
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
