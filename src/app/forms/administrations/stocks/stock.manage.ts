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

@Component({
    selector: 'app-stock-manage',
    templateUrl: 'stock.manage.html',
    providers: [ ]
})
export class StockManageComponent extends GenericManage<Stock, number> {

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
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        this.stockList.refresh(params);
    }

    public exportToExcel() {

        let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.stockHttpService.get(1, 1000000, 'name', 'asc', params, null).subscribe(
            (data: PagedResult<ExpAccount>) => {

                const options = {
                    sheetid: 'centre_logistice',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                // alasql(`SELECT id as [Id],
                //     name as [Denumire]
                //     INTO XLSX("centre_logistice.xlsx",?) FROM ?`, [ options, data.items ]);

            });
    }

    collapsed(event: any): void {
        // console.log(event);
      }
      expanded(event: any): void {
        // console.log(event);
      }
}

