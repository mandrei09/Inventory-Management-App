import { Component, ElementRef } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { AppData } from '../../../app-data';
import { AssetCategoryTotal } from '../../../model/api/assets/asset-category-total';
import { AssetDepTotal } from '../../../model/api/assets/asset-dep-total';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'offer-list',
    // templateUrl: '../../administrations/offer/offer.list.html',
    // templateUrl: '../../generic/generic.table.list.html',
    templateUrl: '../../assets/assets/assets-filters-list/assets-filters.list.html',
    styleUrls: ['../../assets/assets/asset.list.scss'],
    inputs: [ 'listTemplate' ],
})
export class OfferList extends GenericTableList<any, number> {

  public _code: string = null;
  public get code(): string { return this._code; }
  public set code(value: string) {
    this._code = value;
    this.getOfferColumnFilters();
  }

  public query = '';
  public filteredList = [];
  public elementRef;
  public listTemplate: string = 'OFFERS';
  public loadType: string = '';
  public totals: AssetDepTotal = null;
  public categoryTotals: AssetCategoryTotal = null;
  products: any;

  constructor(public myElement: ElementRef) {
      super('invNo', 'asc');

      this.columns = AppData.ColumnDefinitions[this.listTemplate];
      this.initializeTable();
      this.elementRef = myElement;
  }

  public refresh(filters: Array<Param>) {
      this.columns = AppData.ColumnDefinitions[this.listTemplate];
      this.initializeTable();
      super.refresh(filters);
  }

  public getOfferColumnFilters() {
    const params = new Array<Param>();
    let code: string;

    let assetColumnFilter: OfferColumnFilter;

    if (this.code) code = this.code;

    assetColumnFilter = new OfferColumnFilter(
      code,
    );

    params.push(new Param('columnFilter', JSON.stringify(assetColumnFilter)));

    this.refresh(params);

    return params;
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

  loadData(event: LazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
        this.tableItems = [...this.tableItems];
    }, 1000);
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
import { OfferColumnFilter } from '../../../model/api/offer/offer-column-filter';

// @Component({
//     selector: 'asset-list',
//     templateUrl: 'asset.list.html'
// })
// export class AssetList extends GenericTableList<AssetSimpleDetail, number> {
//     constructor() {
//         super('assetName', 'asc');
//     }
// }
