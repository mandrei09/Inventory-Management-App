import { Component, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppData } from '../../../app-data';
import { AssetDepTotal } from '../../../model/api/assets/asset-dep-total';
import { Param } from '../../../model/common/param';
import { GenericPrimeNgDataTableList } from '../../generic/generic.prime-ng-data-table.list';
import { RequestBudgetForecastHttpService } from '../../../services/http/requests/request-budget-forecast.http.service';
import { RequestBudgetForecastNeedBudget } from '../../../model/api/requests/request-budget-forecast-need-budget';
import {GenericTableList} from '../../generic/generic.table.list';
@Component({
    selector: 'app-offer-material-view-ng-prime-validate',
    // templateUrl: './offer-material-view-ng-prime-validate.html',
    templateUrl: '../../generic/generic.table.list.html',
    styleUrls: ['./offer-material-view-ng-prime-validate.scss'],
    providers: [MessageService],
    inputs: [ 'listTemplate' ],
})
export class OfferMaterialViewNgPrimeValidateListComponent extends GenericTableList<any, number> {
    public columns: any = [];

    public query = '';
    public filteredList = [];
    public elementRef;
    public listTemplate: string = 'OFFERMATERIALS';
    public loadType: string = '';
    public totals: AssetDepTotal = null;
    productDialog: boolean;
    submitted: boolean;
    product: any;

    constructor(public myElement: ElementRef, private confirmationService: ConfirmationService, private messageService: MessageService, private requestBudgetForecastHttpService: RequestBudgetForecastHttpService) {
        super('id', 'asc');

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
        } else{
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

      editProduct(product: any) {
        this.product = {...product};
        this.productDialog = true;
    }

    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name.trim()) {
        // if (this.product.id) {
        //     this.tableItems[this.findIndexById(this.product.id)] = this.product;
        //     this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        // }
        // else {
        //     this.product.id = this.createId();
        //     this.product.image = 'product-placeholder.svg';
        //     this.products.push(this.product);
        //     this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        // }

        // this.products = [...this.products];
        // this.productDialog = false;
        // this.product = {};
    }
}

findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.tableItems.length; i++) {
        if (this.tableItems[i].item.id === id) {
            index = i;
            break;
        }
    }

    return index;
}

createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}


needBudget(item: any) {
  // this.confirmationService.confirm({
  //     message: 'Esti sigur ca vrei sa soliciti suplimentare buget ?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //         // this.products = this.products.filter(val => val.id !== product.id);
  //         // console.log(JSON.stringify(item));
  //         let req = new RequestBudgetForecastNeedBudget();
  //         req.requestBudgetForecastId = item.id;
  //         this.requestBudgetForecastHttpService.requestBFNeedBudget(req).subscribe( (res) => {
  //         if(res.success){
  //           this.product = {};
  //           this.messageService.add({severity:'warn', summary: 'Cerere buget', detail: 'Datele au fost salvate cu success', life: 3000});
  //         }
  //         })

  //     }
  // });
}

}
