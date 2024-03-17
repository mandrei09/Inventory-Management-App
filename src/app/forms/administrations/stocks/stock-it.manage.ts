import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ExpAccount } from '../../../model/api/administration/exp-account';
import { Material } from '../../../model/api/administration/material';
import { Stock } from '../../../model/api/administration/stock';
import { PagedResult } from '../../../model/common/paged-result';
import { Param } from '../../../model/common/param';
import { StockHttpService } from '../../../services/http/administration/stock.http.service';
import { GenericManage } from '../../generic/generic.manage';
import { StockDetailComponent } from './stock.detail';
import { StockListComponent } from './stock.list';
import { saveAs as fileSaveAs } from 'file-saver-es';

@Component({
    selector: 'app-stock-it-manage',
    templateUrl: 'stock-it.manage.html',
    providers: [ ]
})
export class StockITManageComponent extends GenericManage<Stock, number> {

     @ViewChild('stockDetailModal') stockDetailModal: ModalDirective;
     @ViewChild('stockList')  stockList: StockListComponent;
     @ViewChild('stockDetail') stockDetail: StockDetailComponent;


    public filter: string = '';
    isCollapsed: boolean = true;

    constructor(
        public stockHttpService: StockHttpService) {
        super();
    }

     public detailInitialize() {
        this.stockDetailModal.show();
    }

    public addNewItem() {
        super.addNewItem();
    }

    public editItem() {
        super.editItem();
    }

    public detailTerminate() {
        this.stockDetailModal.hide();
    }

    public refresh() {
      let params: Array<Param> = null;
        params = this.getFilters();
        this.stockList.refresh(params);
    }

    public getFilters(): Array<Param> {
      const params: Array<Param> = new Array<Param>();
      params.push(new Param('filter', this.filter));
      return params;
  }

    public exportToExcel() {

      let params: Array<Param> = null;

      params = this.getFilters();
      this.stockHttpService
          .export(params)
          .subscribe((blob) => {
              fileSaveAs(blob.body, 'stock-initial.xlsx');
          });
  }

    collapsed(event: any): void {
        // console.log(event);
      }
      expanded(event: any): void {
        // console.log(event);
      }
}

