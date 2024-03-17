import { Component, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import * as _ from 'underscore';
import { AssetDepTotal } from '../../../model/api/assets/asset-dep-total';
import { AppData } from '../../../app-data';
import { Param } from '../../../model/common/param';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Material } from '../../../model/api/administration/material';
import { MaterialList } from '../materials/material.list';
import { MaterialListOrder } from '../materials/material-list-order';
import { MatDialog } from '@angular/material/dialog';
import { RequestBudgetForecastMaterialAdd } from '../../../model/api/requests/request-budget-forecast-material-add';
import { RequestBudgetForecastMaterialHttpService } from '../../../services/http/requests/request-budget-forecast-material.http.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
    selector: 'app-request-budget-forecast-validate-storno-list',
    templateUrl: './request-budget-forecast-validate-storno.list.html',
    styleUrls: ['request-budget-forecast-validate-storno.list.scss'],
    inputs: [ 'listTemplate', 'materials' ],
    outputs: [ 'listAfterViewInit', 'mappingFinished' ]
})
export class RequestBudgetForecastValidateStornoListComponent extends GenericTableList<any, number> implements AfterViewInit {

    first = 1;
    rows = 10;
    isExpanded: boolean = false;
    readOnly = true;
    expandedRows = {};
    public query = '';
    public filteredList = [];
    public elementRef;
    public listTemplate: string = 'REQUESTBUDGETFORECASTS';
    public loadType: string = '';
    public totals: AssetDepTotal = null;
    public allowLabel: string = '-';
    public materials: Material[];
    public set materialResults(value: Material[] | null) {
      this.materials = value;
    }

    selectedReqBGTMaterials: RequestBudgetForecastMaterialAdd[] = [];

    ref: DynamicDialogRef;

    @Output() public listAfterViewInit: EventEmitter<void> = new EventEmitter<null>();
    @Output() public mappingFinished: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(public myElement: ElementRef, public dialog: MatDialog,
      private requestBudgetForecastMaterial: RequestBudgetForecastMaterialHttpService, public notificationService: NotificationService ) {
        super('invNo', 'asc', 'inventory');

        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        // this.resetColumnDefinitions(AppData.ColumnDefinitions[this.listTemplate]);
        this.elementRef = myElement;
    }

    ngAfterViewInit(): void {
        // console.log('employee validate afterviewinit');
        this.listAfterViewInit.emit(null);
        this.mappingFinished.emit(false);
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listTemplate];
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

    // public setCurrentPageData(pageData: AssetDepPagedResult) {
    //     this.totals = pageData.totals;
    //     super.setCurrentPageData(pageData);
    // }

    public filter() {
        if (this.query !== '') {
            this.filteredList = this.tableItems.filter(function(el) {
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
            this.tableItems = this.tableItems.filter(function(el) {
                return el.item.invNo.toString().toLowerCase().indexOf(item.toLowerCase()) > -1;
            });
        }
    }

    public onAllowLabelUpdate(tableItem) {
       tableItem.item.isMinus = !!tableItem.item.isMinus;
       // tableItem.selected = !tableItem.selected;
       this.updateCheckStateEmp(true);
    }

    public onAllowMultipleUpdate(tableItem) {
      tableItem.item.storno = !!tableItem.item.storno;
      // tableItem.selected = !tableItem.selected;
      this.updateCheckStateEmp(true);
   }

    public onAllowUpdate(tableItem) {
        tableItem.item.isMinus = true;
        tableItem.selected = true;
     }

     public onNotAllowUpdate(tableItem) {
        tableItem.item.isMinus = false;
        tableItem.selected = false;
     }

     public updateCheckStateEmp(checked: boolean) {
        if (checked) { this.selectAllEmp(); } else { this.unselectAllEmp(); }
    }

    public selectAllEmp() {
        // alert(this.tableItems.length);
        this.tableItems.forEach((tItem) => {

             // alert(JSON.stringify(tItem.item.invNo));

            // if (!tItem.selected) {
            //     this.selectItemEmp(tItem.item);
            // }
            this.selectItemEmp(tItem.item);
        });
    }

    public unselectAllEmp() {
        this.tableItems.forEach((tItem) => {
            if (tItem.selected) {
                this.unselectItem(tItem.item);
            }
        });
    }

    public isAllCheckedEmp(): boolean {
        return this.tableItems.every(item => item.selected);
    }

    public selectItemEmp(item) {
        if (this.rowSelection === 'single') {
            this._selectedItems = new Array<any>();
            this._selectedItems.push(item);
            this.tableItems.forEach((tItem) => {
                tItem.selected = tItem.item.id === item.id ? true : false;
            });
        } else if (this.rowSelection === 'multiple') {


             const index: number = _.indexOf(this._selectedItems, item);

        //    var index = -1;
        //         for (var i = 0; i < this._selectedItems.length; ++i) {
        //             if (this._selectedItems[i].id === item.id) {
        //                 index = i;
        //                 break;
        //             }
        //         }
        //         console.log(index);

             // alert(index);
            if (index < 0) {
                this._selectedItems.push(item);
            }

            this.tableItems.forEach((tItem) => {
                if (tItem.item.id === item.id) { tItem.selected = true; }
                // if (tItem.item.id === item.id) tItem.item.isMinus = true;
            });
        }

        if (this.notifyOnChange.toUpperCase() === 'TRUE') {
            this.notifyCurrentSelection();
        }
    }

    public unselectItem(item) {
        if (this.rowSelection === 'single') {
            this._selectedItems = new Array<any>();
        } else if (this.rowSelection === 'multiple') {
            let index = -1;
            let currentIndex = 0;

            this._selectedItems.forEach((sItem) => {
                if (sItem.id === item.id) {
                    index  = currentIndex;
                }
                currentIndex++;
            });

            if (index > -1) {
                this._selectedItems.splice(index, 1);
            }
        }

        this.tableItems.forEach((tItem) => {
            if (tItem.item.id === item.id) { tItem.selected = false; }
            // if (tItem.item.id === item.id) tItem.item.isMinus = false;
        });

        if (this.notifyOnChange.toUpperCase() === 'TRUE') {
            this.notifyCurrentSelection();
        }
    }

    // show() {
    //   console.log(JSON.stringify(this.materials));
    //   this.ref = this.dialog.open(MaterialListOrder, {
    //       header: 'Choose a Product',
    //       width: '70%',
    //       contentStyle: {"max-height": "500px", "overflow": "auto"},
    //       baseZIndex: 10000,
    //       data: { item: this.materials }
    //   });

    //   this.ref.onClose.subscribe((product: Material) =>{
    //       if (product) {
    //           // this.messageService.add({severity:'info', summary: 'Product Selected', detail: product.name});
    //       }
    //   });
    // }


    public selectMaterial(tableItem) {
      let dialogRef = this.dialog.open(MaterialListOrder, {
        panelClass: 'large-modal',
        disableClose: false,
        width: '50%',
        data: { item: this.materials }
      });
      dialogRef.afterClosed().subscribe((materials: Material[]) => {
        // console.log('select ' + JSON.stringify(materials));
        let aIds: number[] = new Array<number>();
        let reqBGTMaterialsIds: RequestBudgetForecastMaterialAdd = new RequestBudgetForecastMaterialAdd();
        if(materials?.length > 0){
          materials.forEach(element => {
            let index: number = aIds.indexOf(element.id);
            if (index < 0) aIds.push(element.id);
          });
          reqBGTMaterialsIds.materialIds = aIds;
          reqBGTMaterialsIds.requestBudgetForecastId = tableItem.item.id;


          this.requestBudgetForecastMaterial.addMaterialByRequestBudgetForecast(reqBGTMaterialsIds).subscribe( (res) => {
            if (res.statusCode === 200) {
                this.notificationService.showSuccess('Datele au fost salvate cu success!', 'Adaugare mapare Produse/ WBS', 0, false, 0);
                this.refreshItems();
                this.mappingFinished.emit(true);
            } else if (res.statusCode === 404) {
                this.notificationService.showError('Nu exista', 'Adaugare mapare Produse/ WBS', 0, false, 0);
                tableItem.item.materials = '';
                this.refreshItems();
                this.mappingFinished.emit(false);
            }
    }, (error) => {
        this.notificationService.showError('Eroare salvare!', 'Adaugare mapare Produse/ WBS', 0, false, 0);
        tableItem.item.materials = '';
        this.refreshItems();
        this.mappingFinished.emit(false);
    });

          // console.log(JSON.stringify(reqBGTMaterialsIds))
        }
      //   if (material) {
      //     // this.messageService.add({severity:'info', summary: 'Product Selected', detail: product.name});
      // }
        //
      });
    }


    expandAll() {
      if(!this.isExpanded){
        this.tableItems.forEach(item => this.expandedRows[item.item.id] = true);

      } else {
        this.expandedRows={};
      }
      this.isExpanded = !this.isExpanded;
  }
}
