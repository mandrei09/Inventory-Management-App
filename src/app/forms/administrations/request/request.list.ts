import { Component, ElementRef } from '@angular/core';
import { AppData } from '../../../app-data';
import { AssetCategoryTotal } from '../../../model/api/assets/asset-category-total';
import { AssetDepTotal } from '../../../model/api/assets/asset-dep-total';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
import {SelectItem} from 'primeng/api';

@Component({
    selector: 'app-request-list',
    templateUrl: '../../generic/generic.table.list.html',
    inputs: [ 'listTemplate' ]
})
export class RequestList extends GenericTableList<any, number> {
    public query = '';
    public filteredList = [];
    public elementRef;
    public listTemplate: string = 'REQUESTS';
    public loadType: string = '';
    public totals: AssetDepTotal = null;
    public categoryTotals: AssetCategoryTotal = null;

    public sortOptions: SelectItem[];
    public sortOrder: number;

    public sortField: string;
    public sortKey: string;



    constructor(public myElement: ElementRef) {
        super('code', 'desc');

        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        this.initializeTable();
        this.elementRef = myElement;
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        this.initializeTable();
        super.refresh(filters);
    }

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
            this.sortDirection = event.sortOrder === -1 ? 'asc' : 'desc';
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

    public onSortChange(event) {
      let value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      }
      else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }

    // public setCurrentPageData(pageData: AssetDepPagedResult) {
    //     this.totals = pageData.totals;
    //     this.categoryTotals = pageData.assetCategoryTotals;
    //     super.setCurrentPageData(pageData);
    // }

    // public filter() {
    //     if (this.query !== ''){
    //         this.filteredList = this.tableItems.filter(function(el){
    //             return el.item.invNo.toString().toLowerCase().indexOf(this.query.toLowerCase()) > -1;
    //         }.bind(this));
    //     }else{
    //         this.filteredList = [];
    //     }
    // }

    public select(item){
        this.query = item;
        this.filteredList = [];
        if(item != null){
            this.tableItems = this.tableItems.filter(function(el){
                return el.item.invNo.toString().toLowerCase().indexOf(item.toLowerCase()) > -1;
            })
        }
    }

//    public handleClick(event){
//         let clickedComponent = event.target;
//         let inside = false;
//         do {
//             if (clickedComponent === this.elementRef.nativeElement) {
//                 inside = true;
//             }
//            clickedComponent = clickedComponent.parentNode;
//         } while (clickedComponent);
//          if(!inside){
//              this.filteredList = [];
//              this.totalItems = this.tableItems.length;
//              if(this.query == ''){
//                 this.refresh(null);
//              }
//          }
//      }


    //   getSum(column) : number {

    //     let sum = 0;
    //     for(let i = 0; i < this.tableItems.length; i++) {
    //         sum += this.tableItems[i][column];
    //     }
    //     return sum;
    // }


}


// import { Component } from '@angular/core';
// import { GenericTableList } from '../../generic/generic.table.list';

// import { AssetSimpleDetail } from '../../../model/api/assets/asset-simple-detail';

// @Component({
//     selector: 'asset-list',
//     templateUrl: 'asset.list.html'
// })
// export class AssetList extends GenericTableList<AssetSimpleDetail, number> {
//     constructor() {
//         super('assetName', 'asc');
//     }
// }
