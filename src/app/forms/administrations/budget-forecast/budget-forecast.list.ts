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

import { SelectionModel } from "@angular/cdk/collections";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { MatButtonToggleGroup } from "@angular/material/button-toggle";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ConsoleService } from "@ng-select/ng-select/lib/console.service";
import { MessageService, TreeNode } from "primeng/api";
import { Table, TableService } from "primeng/table";
import { AppData } from "../../../app-data";
import { AssetDepTotal } from "../../../model/api/assets/asset-dep-total";
import { ForecastTotal } from "../../../model/api/assets/forecast-total";
import { Param } from "../../../model/common/param";
import { GenericPrimeNgDataTableList } from "../../generic/generic.prime-ng-data-table.list";
import { GenericTableList } from "../../generic/generic.table.list";

@Component({
  selector: "app-budget-forecast-list",
  templateUrl: "./budget-forecast.list.html",
  styleUrls: ["./budget-forecast.list.scss"],
  inputs: ["listTemplate"],
  providers: [Table, TableService],
})
export class BudgetForecastListComponent
  extends GenericTableList<any, number>
  implements AfterViewInit
{
  // export class BudgetList extends GenericPrimeNgDataTableList<any, number> {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public columns: any = [];

  public TRANSLOCO = "page_budget_forecast_list_component";
  public query = "";
  public filteredList = [];
  public elementRef;
  public listTemplate: string = "BUGETFORECASTS";
  public loadType: string = "";
  public totals: ForecastTotal = null;
  item: any;
  productDialog: boolean;
  selectedNodes3: TreeNode[];

  selection = new SelectionModel<any>(true, []);

  dataSourceMT: MatTableDataSource<any>;
  displayedColumns: string[] = ["id", "code"];

  tables = [0];

  constructor(
    public myElement: ElementRef,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    super("modifiedAt", "desc");

    this.columns = AppData.ColumnDefinitions[this.listTemplate];
    this.elementRef = myElement;

    this.displayedColumns.length = 30;
    this.displayedColumns.fill("filler");

    let columnIndex = 0;

    this.displayedColumns[columnIndex++] = "select";
    this.displayedColumns[columnIndex++] = "budgetBaseCode";
    this.displayedColumns[columnIndex++] = "budgetBaseProjectCode";
    this.displayedColumns[columnIndex++] = "totalLeft";
    this.displayedColumns[columnIndex++] = "importValueOrder";
    this.displayedColumns[columnIndex++] = "totalRemLeft";
    this.displayedColumns[columnIndex++] = "budgetBaseProcentage";
    this.displayedColumns[columnIndex++] = "budgetBaseValueOrder";
    this.displayedColumns[columnIndex++] = "budgetBaseActuals";
    this.displayedColumns[columnIndex++] = "budgetBaseActualsYTD";
    this.displayedColumns[columnIndex++] = "budgetBaseActualsYTG";
    this.displayedColumns[columnIndex++] = "budgetBaseOwner";
    this.displayedColumns[columnIndex++] = "budgetBaseDivision";
    this.displayedColumns[columnIndex++] = "budgetBaseInfo";
    this.displayedColumns[columnIndex++] = "budgetManager";
    this.displayedColumns[columnIndex++] = "accMonth";
    this.displayedColumns[columnIndex++] = "april";
    this.displayedColumns[columnIndex++] = "may";
    this.displayedColumns[columnIndex++] = "june";
    this.displayedColumns[columnIndex++] = "july";
    this.displayedColumns[columnIndex++] = "august";
    this.displayedColumns[columnIndex++] = "september";
    this.displayedColumns[columnIndex++] = "octomber";
    this.displayedColumns[columnIndex++] = "november";
    this.displayedColumns[columnIndex++] = "december";
    this.displayedColumns[columnIndex++] = "january";
    this.displayedColumns[columnIndex++] = "february";
    this.displayedColumns[columnIndex++] = "march";
    this.displayedColumns[columnIndex++] = "totalRight";
    this.displayedColumns[columnIndex++] = "totalRemRight";
  }

  ngAfterViewInit(): void {
    this.dataSourceMT = new MatTableDataSource(this.tableItems);

    this.paginator.length = this.totalItems;
    this.dataSourceMT.paginator = this.paginator;
    this.dataSourceMT.sort = this.sort;

    if (this.totalItems < this.pageSize) {
      this.paginator.firstPage();
    }

    this.paginator.page.subscribe((event) =>
      setTimeout(() => {
        this.dataSourceMT = new MatTableDataSource(this.tableItems);
      }, 1000)
    );
  }

  public refresh(filters: Array<Param>) {
    this.paginator.pageIndex = 0;
    this.columns = AppData.ColumnDefinitions[this.listTemplate];

    super.refresh(filters);

    this.dataSourceMT = new MatTableDataSource(this.tableItems);
    setTimeout(() => {
      if (this.paginator.length < this.paginator.pageSize) {
        this.paginator.pageIndex = 0;
      }
      this.dataSourceMT = new MatTableDataSource(this.tableItems);
    }, 2000);
  }

  public setCurrentPageData(pageData: any) {
    this.totals = pageData.totals;
    super.setCurrentPageData(pageData);
  }

  public filter() {
    if (this.query !== "") {
      this.filteredList = this.tableItems.filter(
        function (el) {
          return (
            el.item.invNo
              .toString()
              .toLowerCase()
              .indexOf(this.query.toLowerCase()) > -1
          );
        }.bind(this)
      );
    } else {
      this.filteredList = [];
    }
  }

  public select(item) {
    this.query = item;
    this.filteredList = [];
    if (item != null) {
      this.tableItems = this.tableItems.filter(function (el) {
        return (
          el.item.invNo.toString().toLowerCase().indexOf(item.toLowerCase()) >
          -1
        );
      });
    }
  }

  public filterCust(ev) {
    console.log(JSON.stringify(ev));
  }

  edit(item: any) {
    this.item = { ...item };
    // this.productDialog = true;
  }

  progressBarClass(value): string {
    if (value < 70) {
      return "redBar";
    }

    if (value < 90) {
      return "yellowBar";
    }

    return "greenBar";
  }

  isSticky(buttonToggleGroup: MatButtonToggleGroup, id: string) {
    return (buttonToggleGroup.value || []).indexOf(id) !== -1;
  }

  isAllSelected() {
    const numSelected = this.selection?.selected?.length;
    const numRows = this.dataSourceMT?.data?.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection?.select(...this.dataSourceMT?.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllChecked() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.position + 1
    }`;
  }

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
