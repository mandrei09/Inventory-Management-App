// import { HttpClient } from '@angular/common/http';
// import { Component, ElementRef } from '@angular/core';
// import { AppData } from '../../../app-data';
// import { AssetDepTotal } from '../../../model/api/assets/asset-dep-total';
// import { Param } from '../../../model/common/param';
// import { GenericTableList } from '../../generic/generic.table.list';

// @Component({
//     selector: 'app-asset-reco-list',
//     templateUrl: '../../assets/assets/asset-reco.list.html',
//     inputs: [ 'listTemplate' ],
// })

// export class AssetRecoListComponent extends GenericTableList<any, number> {
//     public query = '';
//     public filteredList = [];
//     public elementRef;
//     public listTemplate: string = 'ASSETRECOS';
//     public loadType: string = '';
//     public totals: AssetDepTotal = null;

//     employees: Customer[];

//     representatives: Representative[];

//     statuses: any[];

//     loading: boolean = true;

//     activityValues: number[] = [0, 100];


//     constructor(public myElement: ElementRef, private http: HttpClient ) {
//         super('invNo', 'asc');

//         this.columns = AppData.ColumnDefinitions[this.listTemplate];
//         this.elementRef = myElement;
      
//           this.representatives = [
//             { name: "Amy Elsner", image: "amyelsner.png" },
//             { name: "Anna Fali", image: "annafali.png" },
//             { name: "Asiya Javayant", image: "asiyajavayant.png" },
//             { name: "Bernardo Dominic", image: "bernardodominic.png" },
//             { name: "Elwin Sharvill", image: "elwinsharvill.png" },
//             { name: "Ioni Bowcher", image: "ionibowcher.png" },
//             { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
//             { name: "Onyama Limba", image: "onyamalimba.png" },
//             { name: "Stephen Shaw", image: "stephenshaw.png" },
//             { name: "XuXue Feng", image: "xuxuefeng.png" }
//           ];
      
//           this.statuses = [
//             { label: "Unqualified", value: "unqualified" },
//             { label: "Qualified", value: "qualified" },
//             { label: "New", value: "new" },
//             { label: "Negotiation", value: "negotiation" },
//             { label: "Renewal", value: "renewal" },
//             { label: "Proposal", value: "proposal" }
//           ];
//     }

//     public refresh(filters: Array<Param>) {
//         this.columns = AppData.ColumnDefinitions[this.listTemplate];
//         super.refresh(filters);
//     }

//     public setCurrentPageData(pageData: any) {
//         this.totals = pageData.totals;
//         super.setCurrentPageData(pageData);
//     }

//     public filter() {
//         if (this.query !== ''){
//             this.filteredList = this.tableItems.filter(function(el){
//                 return el.item.invNo.toString().toLowerCase().indexOf(this.query.toLowerCase()) > -1;
//             }.bind(this));
//         }else{
//             this.filteredList = [];
//         }
//     }

//     public select(item){
//         this.query = item;
//         this.filteredList = [];
//         if(item != null){
//             this.tableItems = this.tableItems.filter(function(el){
//                 return el.item.invNo.toString().toLowerCase().indexOf(item.toLowerCase()) > -1;
//             })
//         }
//     }

//     getCustomersLarge() {
//         return this.http.get<any>('assets/customers-large.json')
//             .toPromise()
//             .then(res => <Customer[]>res.data)
//             .then(data => data);
//     }
// }

// export interface Country {
//     name?: string;
//     code?: string;
//   }
  
//   export interface Representative {
//     name?: string;
//     image?: string;
//   }
  
//   export interface Customer {
//     id?: number;
//     name?: string;
//     country?: Country;
//     company?: string;
//     date?: string | Date;
//     status?: string;
//     activity?: number;
//     representative?: Representative;
//     verified?: boolean;
//     balance?: boolean;
//   }


import { Component, ElementRef } from '@angular/core';
import { AppData } from '../../../app-data';
import { AssetDepTotal } from '../../../model/api/assets/asset-dep-total';
import { Param } from '../../../model/common/param';
import { GenericPrimeNgDataTableList } from '../../generic/generic.prime-ng-data-table.list';
import { GenericTableList } from '../../generic/generic.table.list';

@Component({
    selector: 'app-asset-reco-list',
    // templateUrl: '../../generic/generic.prime-ng-data-table.list.html',
    templateUrl: '../../assets/assets/asset-reco.list.html',
    styleUrls: ['./asset-reco.list.scss'],
    inputs: [ 'listTemplate' ],
})
 export class AssetRecoListComponent extends GenericTableList<any, number> {
// export class AssetRecoListComponent extends GenericPrimeNgDataTableList<any,number> {
    public columns: any = [];

    public query = '';
    public filteredList = [];
    public elementRef;
    public listTemplate: string = 'ASSETRECOS';
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

    public filterCust(ev) {
        console.log(JSON.stringify(ev));
      }
}
