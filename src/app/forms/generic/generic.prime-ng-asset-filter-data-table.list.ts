import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { AssetFilter } from '../../model/api/assets/asset.filter';
import { PropertyFilterEntity } from '../../model/api/common/property-filter-entity';
import { InvState } from '../../model/api/inventory/inv-state';
import { Param } from '../../model/common/param';
import { IEntity } from '../../model/i-entity';
import { GenericTableList } from './generic.table.list';
import { Employee } from '../../model/api/administration/employee';
@Directive()
export class GenericPrimeNgAssetFilterDataTableList<T extends IEntity<V>, V> extends GenericTableList<T, V> {
    @Input() public showValues: boolean = false;
    @Input() public clearFilters: boolean = false;
    public _clearFilters: boolean = null;
    @Output() public jsonFilterEvent = new EventEmitter<AssetFilter>();
    @Output() public propertyFilterEvent = new EventEmitter<Array<PropertyFilterEntity>>();
    // invStates: InvState[];
    // transferEmployees: Employee[];
    // selectedInvStates: number[];
    // selectedTransferEmployees: number[];
    // propertyFilters = new Array<PropertyFilterEntity>();
    // invNo = '';
    // subNo = '';
    // name = '';
    // serialNumber = '';
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

        // console.log(this.initialized);
        if (this.initialized){
         // console.log('1');
        setTimeout(() => {

        //   const assetFilter: AssetFilter = new AssetFilter();

        //     if (this.selectedInvStates != null) {
        //       assetFilter.invStateIds = new Array<number>();
        //       this.selectedInvStates.forEach((id) => {
        //           assetFilter.invStateIds.push(id);
        //       });
        //   }

        //   if (this.selectedTransferEmployees != null) {
        //     assetFilter.transferEmployeeIds = new Array<number>();
        //     this.selectedTransferEmployees.forEach((id) => {
        //         assetFilter.transferEmployeeIds.push(id);
        //     });
        // }


            // if(this.propertyFilters.length == 0){
            //   this.invNo = '';
            //   this.subNo = '';
            //   this.name = '';
            //   this.serialNumber = '';
            // }
            // this.params.push(new Param('propertyFilters', JSON.stringify(this.propertyFilters)));
            // this.params.push(new Param('jsonFilter', JSON.stringify(assetFilter)));
            // this.jsonFilterEvent.emit(assetFilter);
            // this.propertyFilterEvent.emit(this.propertyFilters);
            // this.propertyFilters = new Array<PropertyFilterEntity>();
            //this.params = new Array<Param>();
            // this.refreshItems();
            console.log('AAA');
            console.log(this._clearFilters);
          }, 0);
        }
    }

    public setMyPagination(event) {
      //event.first: Index of first record being displayed
      //event.rows: Number of rows to display in new page
      //event.page: Index of the new page
      //event.pageCount: Total number of pages
      let startRow = event.first + 1;
      let endRow =  startRow + event.rows;
      let totalRows = this.tableItems.length;
      console.log("showing "+startRow +" to "+ endRow +" of "+ totalRows  +" entries");

      // this.currentPage = event.first/event.rows + 1;
      // this.pageSize = event.rows;
      // this.refreshItems();
  }

    // public paginate(event) {
    //   let pageIndex = event.first/event.rows + 1;
    //   // console.log(pageIndex);
    //   // console.log(event);
    //     this.currentPage = event.first/event.rows + 1;
    //     this.pageSize = event.rows;
    //     this.refreshItems();
    //     // console.log('currentPaginationPage = first: ' + this.currentPage + ' rows: ' + this.pageSize);
    //     }

        getValue(event: Event): string {
            return (event.target as HTMLInputElement).value;
          }

    isNumber(value: string | number): boolean {
        return ((value != null) &&
                (value !== '') &&
                !isNaN(Number(value.toString())));
      }

      // filterInvState(event){

      //   // console.log(event);
      //   this.selectedInvStates = new Array<number>();
      //   event.map((item) => this.selectedInvStates.push(item.id));
      //   // console.log(event);
      // }

      // filterTransferEmployees(event){

      //   // console.log(event);
      //   this.selectedTransferEmployees = new Array<number>();
      //   event.map((item) => this.selectedTransferEmployees.push(item.id));
      //   // console.log(event);
      // }

      // filterProperty(event, include, sortBy){
      //   // console.log('1: ' + event.target.value);
      //   //  console.log('2: ' + include);
      //   //  console.log('3: ' + sortBy);

      //   if(sortBy == 'InvNo' || sortBy == 'Asset.InvNo'){
      //     this.invNo = event.target.value;
      //   }

      //   if(sortBy == 'SubNo' || sortBy == 'Asset.SubNo'){
      //     this.subNo = event.target.value;
      //   }

      //   if(sortBy == 'Name' || sortBy == 'Asset.Name'){
      //     this.name = event.target.value;
      //   }

      //   if(sortBy == 'SerialNumber' || sortBy == 'Asset.SerialNumber'){
      //     this.serialNumber = event.target.value;
      //   }


      //   this.propertyFilters = new Array<PropertyFilterEntity>();
      //   let propertyFilter = new PropertyFilterEntity(include + sortBy , event.target.value);
      //   this.propertyFilters.push(propertyFilter);
      //   // this.selectedInvStates = new Array<number>();
      //   // event.map((item) => this.selectedInvStates.push(item.id));
      //   // console.log(event);

      // }

      // public set clearFilters(value: boolean){
      //   this._clearFilters = value;
      //   console.log(value);
      //   this.propertyFilters = new Array<PropertyFilterEntity>();
      //   this.selectedInvStates = new Array<number>();
      //   this.selectedTransferEmployees = new Array<number>();
      // }

      exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.tableItems);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "products");
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        import("file-saver").then(FileSaver => {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data: Blob = new Blob([buffer], {
                type: EXCEL_TYPE
            });
            FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        });
    }
}
