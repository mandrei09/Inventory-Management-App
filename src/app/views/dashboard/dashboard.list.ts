import { Component, ElementRef } from '@angular/core';
import { AppData } from '../../app-data';
import { GenericTableList } from '../../forms/generic/generic.table.list';
import { AssetDepTotal } from '../../model/api/assets/asset-dep-total';
import { Param } from '../../model/common/param';

@Component({
    selector: 'app-dashboard-list',
    templateUrl: 'dashboard.list.html',
    inputs: [ 'listTemplate' ],
})
export class DashboardListComponent extends GenericTableList<any, number> {
    public query = '';
    public filteredList = [];
    public elementRef;
    public listTemplate: string = 'DASHBOARDVIEW';
    public loadType: string = '';
    public totals: AssetDepTotal = null;


    constructor(public myElement: ElementRef) {
        super('invNo', 'asc');

        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        this.elementRef = myElement;
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        super.refresh(filters);
    }

    public setCurrentPageData(pageData: any) {
        this.totals = pageData.totals;
        super.setCurrentPageData(pageData);
    }

    public filter() {
        if (this.query !== ''){
            this.filteredList = this.tableItems.filter(function(el){
                return el.item.invNo.toString().toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }else{
            this.filteredList = [];
        }
    }

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
