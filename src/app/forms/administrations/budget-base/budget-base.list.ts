// import { Component, ElementRef } from '@angular/core';
// import { AppData } from '../../../app-data';
// import { AssetCategoryTotal } from '../../../model/api/assets/asset-category-total';
// import { AssetDepTotal } from '../../../model/api/assets/asset-dep-total';
// import { Param } from '../../../model/common/param';
// import { GenericTableList } from '../../generic/generic.table.list';

// @Component({
//     selector: 'budget-list',
//     templateUrl: '../../administrations/budget/budget.list.html',
//     inputs: [ 'listTemplate' ],
// })
// export class BudgetList extends GenericTableList<any, number> {
//     public query = '';
//     public filteredList = [];
//     public elementRef;
//     public listTemplate: string = 'BUGETS';
//     public loadType: string = '';
//     public totals: AssetDepTotal = null;
//     public categoryTotals: AssetCategoryTotal = null;


//     constructor(public myElement: ElementRef) {
//         super('invNo', 'asc');

//         this.columns = AppData.ColumnDefinitions[this.listTemplate];
//         this.elementRef = myElement;
//     }

//     public refresh(filters: Array<Param>) {
//         this.columns = AppData.ColumnDefinitions[this.listTemplate];
//         super.refresh(filters);
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
// }

import { Component, ElementRef } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { Table, TableService } from 'primeng/table';
import { AppData } from '../../../app-data';
import { AssetDepTotal } from '../../../model/api/assets/asset-dep-total';
import { Param } from '../../../model/common/param';
import { GenericTableList } from '../../generic/generic.table.list';
@Component({
    selector: 'app-budget-base-list',
    // templateUrl: './budget-base.list.html',
    templateUrl: '../../generic/generic.table.list.html',
    styleUrls: ['./budget-base.list.scss'],
    inputs: [ 'listTemplate' ],
    providers: [Table, TableService]
})
export class BudgetBaseListComponent extends GenericTableList<any, number> {
// export class BudgetList extends GenericPrimeNgDataTableList<any, number> {
    public columns: any = [];

    public query = '';
    public filteredList = [];
    public elementRef;
    public listTemplate: string = 'BUDGETBASES';
    public loadType: string = '';
    public totals: AssetDepTotal = null;
    item: any;
    productDialog: boolean;
    selectedNodes3: TreeNode[];

    dataTree = {
      value: {
        name: 'Reports',
        owner: 'Eric',
        protected: true,
        backup: true
      },
      children: [
        {
          value: {
            name: 'Charts',
            owner: 'Stephanie',
            protected: false,
            backup: true
          },
          children: []
        },
        {
          value: {
            name: 'Sales',
            owner: 'Virginia',
            protected: false,
            backup: true
          },
          children: []
        },
        {
          value: {
            name: 'US',
            owner: 'Alison',
            protected: true,
            backup: false
          },
          children: [
            {
              value: {
                name: 'California',
                owner: 'Claire',
                protected: false,
                backup: false
              },
              children: []
            },
            {
              value: {
                name: 'Washington',
                owner: 'Colin',
                protected: false,
                backup: true
              },
              children: [
                {
                  value: {
                    name: 'Domestic',
                    owner: 'Oliver',
                    protected: true,
                    backup: false
                  },
                  children: []
                },
                {
                  value: {
                    name: 'International',
                    owner: 'Oliver',
                    protected: true,
                    backup: true
                  },
                  children: []
                }
              ]
            }
          ]
        }
      ]
    };



    // displayedColumns: string[] = ['name', 'count'];


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

        public setCurrentPageData(pageData: any) {
        this.totals = pageData.totals;
        super.setCurrentPageData(pageData);
    }

    public filter() {
        if (this.query !== ''){
            this.filteredList = this.tableItems.filter(function(el){
                return el.item.invNo.toString().toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredList = [];
        }
    }

    public select(item) {
        this.query = item;
        this.filteredList = [];
        if (item != null) {
            this.tableItems = this.tableItems.filter(function(el){
                return el.item.invNo.toString().toLowerCase().indexOf(item.toLowerCase()) > -1;
            });
        }
    }

    public filterCust(ev) {
        console.log(JSON.stringify(ev));
      }

      edit(item: any) {
        this.item = {...item};
        // this.productDialog = true;
    }

    progressBarClass(value): string {
        if (value < 70) {
            return 'redBar';
        }

        if (value < 90) {
            return 'yellowBar';
        }

        return 'greenBar';
    }
}



interface Node<T> {
  value: T;
  children: Node<T>[];
}
