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

import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConsoleService } from '@ng-select/ng-select/lib/console.service';
import { MessageService, TreeNode } from 'primeng/api';
import { Table, TableService } from 'primeng/table';
import { AppData } from '../../../app-data';
import { AssetDepTotal } from '../../../model/api/assets/asset-dep-total';
import { ForecastTotal } from '../../../model/api/assets/forecast-total';
import { Param } from '../../../model/common/param';
import { GenericPrimeNgDataTableList } from '../../generic/generic.prime-ng-data-table.list';
import { GenericTableList } from '../../generic/generic.table.list';


@Component({
    selector: 'app-budget-forecast-list',
    templateUrl: './budget-forecast.list.html',
    styleUrls: ['./budget-forecast.list.scss'],
    inputs: [ 'listTemplate' ],
    providers: [Table, TableService]
})
export class BudgetForecastListComponent extends GenericTableList<any, number> implements AfterViewInit {
// export class BudgetList extends GenericPrimeNgDataTableList<any, number> {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
    public columns: any = [];

    expandedElement: PeriodicElement | null;

    public query = '';
    public filteredList = [];
    public elementRef;
    public listTemplate: string = 'BUGETFORECASTS';
    public loadType: string = '';
    public totals: ForecastTotal = null;
    item: any;
    productDialog: boolean;
    selectedNodes3: TreeNode[];

    selection = new SelectionModel<any>(true, []);

    dataSourceMT: MatTableDataSource<any>;
    displayedColumns: string[] = ['id', 'code'];

    tables = [0];

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



    constructor(public myElement: ElementRef, private changeDetectorRefs: ChangeDetectorRef) {
        super('invNo', 'asc');

        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        this.elementRef = myElement;

        // setTimeout(() => {
        //   this.dataSourceMT = new MatTableDataSource(this.tableItems);

        //   this.paginator.length = this.tableItems.length;
        //   this.dataSourceMT.paginator = this.paginator;
        //   this.dataSourceMT.sort = this.sort;
        // }, 3000);

        this.displayedColumns.length = 37;
        this.displayedColumns.fill('filler');

        // The first two columns should be position and name; the last two columns: weight, symbol
        this.displayedColumns[0] = 'select';
        this.displayedColumns[1] = 'totalLeft';
        this.displayedColumns[2] = 'importValueOrder';
        this.displayedColumns[3] = 'totalRemLeft';
        this.displayedColumns[4] = 'budgetBaseProcentage';
        this.displayedColumns[5] = 'budgetBaseValueOrder';
        this.displayedColumns[6] = 'budgetBaseActuals';
        this.displayedColumns[7] = 'budgetBaseActualsYTD';
        this.displayedColumns[8] = 'budgetBaseActualsYTG';
        this.displayedColumns[9] = 'budgetBaseOwner';
        this.displayedColumns[10] = 'budgetBaseCode';
        this.displayedColumns[11] = 'budgetBaseProjectCode';
        this.displayedColumns[12] = 'budgetBaseAdmCenterName';
        this.displayedColumns[13] = 'budgetBaseDivision';
        this.displayedColumns[14] = 'budgetBaseInfo';
        this.displayedColumns[15] = 'budgetBaseAssetType';
        this.displayedColumns[16] = 'version';
        this.displayedColumns[17] = 'budgetManager';
        this.displayedColumns[18] = 'accMonth';
        this.displayedColumns[19] = 'appState';
        this.displayedColumns[20] = 'startMonth';
        this.displayedColumns[21] = 'depPeriod';
        this.displayedColumns[22] = 'depPeriodRem';
        this.displayedColumns[23] = 'april';
        this.displayedColumns[24] = 'may';
        this.displayedColumns[25] = 'june';
        this.displayedColumns[26] = 'july';
        this.displayedColumns[27] = 'august';
        this.displayedColumns[28] = 'september';
        this.displayedColumns[29] = 'octomber';
        this.displayedColumns[30] = 'november';
        this.displayedColumns[31] = 'december';
        this.displayedColumns[32] = 'january';
        this.displayedColumns[33] = 'february';
        this.displayedColumns[34] = 'march';
        this.displayedColumns[35] = 'totalRight';
        this.displayedColumns[36] = 'totalRemRight';
    }
  ngAfterViewInit(): void {
    this.dataSourceMT = new MatTableDataSource(this.tableItems);

    this.paginator.length = this.totalItems;
    this.dataSourceMT.paginator = this.paginator;
    this.dataSourceMT.sort = this.sort;

    if(this.totalItems < this.pageSize){
      console.log('GO TO FIRST PAGE');
      this.paginator.firstPage();
    }

    this.paginator.page.subscribe(
      (event) =>
      setTimeout(() => {
        // alert('DDD1');
        this.dataSourceMT = new MatTableDataSource(this.tableItems);
        // this.paginator.length = this.totalItems;
        // this.dataSourceMT.paginator = this.paginator;
        // this.dataSourceMT.sort = this.sort;
      }, 1000)
      );
  }

      public refresh(filters: Array<Param>) {
        this.paginator.pageIndex = 0;
        this.columns = AppData.ColumnDefinitions[this.listTemplate];


        super.refresh(filters);

        this.dataSourceMT = new MatTableDataSource(this.tableItems);
        setTimeout(() => {
          //alert('DDD');


          // this.paginator.length = this.totalItems;
          console.log(this.totalItems);
          console.log(this.pageSize);
          console.log(this.paginator.length);
          console.log(this.paginator.pageSize);
          if(this.paginator.length < this.paginator.pageSize){
            console.log('GO TO FIRST PAGE');
            this.paginator.pageIndex = 0;
            //this.refreshItems();
          }

          this.dataSourceMT = new MatTableDataSource(this.tableItems);
          // this.dataSourceMT.paginator = this.paginator;
          // this.dataSourceMT.sort = this.sort;
        }, 2000);

    }

        public setCurrentPageData(pageData: any) {
        this.totals = pageData.totals;
        super.setCurrentPageData(pageData);
    }

    public filter() {
        if (this.query !== '') {
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

    isSticky(buttonToggleGroup: MatButtonToggleGroup, id: string) {
      return (buttonToggleGroup.value || []).indexOf(id) !== -1;
    }

    isAllSelected() {
      const numSelected = this.selection?.selected?.length;
      const numRows = this.dataSourceMT?.data?.length;
      return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }

      this.selection?.select(...this.dataSourceMT?.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
      if (!row) {
        return `${this.isAllChecked() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

  //   public changePage(pageEvent: PageEvent) {
  //     console.log(JSON.stringify(pageEvent));
  //     if (pageEvent.pageIndex === 0 || pageEvent.pageIndex === 1) {
  //       this.currentPage = pageEvent.pageIndex + 1;
  //     } else {
  //       this.currentPage = pageEvent.pageIndex;
  //     }
  //     this.pageSize = pageEvent.pageSize;
  //     this.refreshItems();
  // }

  public changePage(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;
    this.refreshItems();
}
}



interface Node<T> {
  value: T;
  children: Node<T>[];
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  }, {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  }, {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`
  }, {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`
  }, {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`
  }, {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
  }, {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`
  }, {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`
  }, {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
];
