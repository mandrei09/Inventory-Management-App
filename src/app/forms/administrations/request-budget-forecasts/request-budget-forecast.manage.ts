import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppUtils } from '../../../common/app.utils';
import { RequestBudgetForecastHttpService } from '../../../services/http/requests/request-budget-forecast.http.service';
import { RequestHttpService } from '../../../services/http/administration/request.http.service';
import { BudgetForecastHttpService } from '../../../services/http/administration/budget-forecast.http.service';
import { RequestBudgetForecast } from '../../../model/api/requests/request-budget-forecast';
import { RequestBudgetForecastListComponent } from './request-budget-forecast.list';
import { RequestList } from '../request/request.list';
import { BudgetForecastListComponent } from '../budget-forecast/budget-forecast.list';
import { Request } from '../../../model/api/administration/request';
import { BudgetForecast } from '../../../model/api/budget/budget-forecast';


@Component({
    selector: 'app-request-budget-forecast-manage',
    templateUrl: 'request-budget-forecast.manage.html',
    styleUrls: ['request-budget-forecast.manage.scss'],
    providers: [ RequestBudgetForecastHttpService, RequestHttpService, BudgetForecastHttpService ]
})
export class RequestBudgetForecastManageComponent extends GenericManage<RequestBudgetForecast, number> {

    @ViewChild('requestBudgetForecastList') requestBudgetForecastList: RequestBudgetForecastListComponent;
    @ViewChild('requestListModal') requestListModal: ModalDirective;
    @ViewChild('requestList') requestList: RequestList;
    @ViewChild('budgetForecastListModal') budgetForecastListModal: ModalDirective;
    @ViewChild('budgetForecastList') budgetForecastList: BudgetForecastListComponent;

    public filter: string = '';
    public selectedRequest: Request = null;
    public selectedBudgetForecast: BudgetForecast = null;
    isCollapsed: boolean = true;
    public selectedRequestBudgetForecast: any;

    constructor(public requestHttpService: RequestHttpService,
      public requestBudgetForecastHttpService: RequestBudgetForecastHttpService,
      public budgetForecastHttpService: BudgetForecastHttpService) {

        super();
    }

    ngAfterViewInit () {
        this.refresh();
    }

    public onRequestBudgetForecastListSelectionChanged(offerMaterials: Array<any>) {
        this.selectedRequestBudgetForecast = this.requestBudgetForecastList.selectedItem;
    }

    public onRequestListCancel() {
        this.requestListModal.hide();
    }

    public onBudgetForecastListCancel() {
        this.budgetForecastListModal.hide();
    }

    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("requestIds", AppUtils.getIdsList<Request, number>([ this.selectedRequest ])));
        params.push(new Param("budgetForecastIds", AppUtils.getIdsList<BudgetForecast, number>([ this.selectedBudgetForecast ])));


        this.requestBudgetForecastList.refresh(params);
    }

    public selectRequest() {

        this.requestListModal.show();
        this.requestList.refresh(null);
    }

    public selectBudgetForecast() {
        this.budgetForecastListModal.show();
        this.budgetForecastList.refresh(null);
    }

    public setSelectedRequest() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedRequest = this.requestList.selectedItem;
                this.requestListModal.hide();
                this.refresh();
                break;
            default:
                break;
        }
    }

    public setSelectedBudgetForecast() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedBudgetForecast = this.budgetForecastList.selectedItem;
                this.budgetForecastListModal.hide();
                this.refresh();
                break;
            default:
                break;
        }
    }

    public unselectRequest() {
        this.selectedRequest = null;
        this.refresh();
    }

    public unselectBudgetForecast() {
        this.selectedBudgetForecast = null;
        this.refresh();
    }


    public exportToExcel() {

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.requestBudgetForecastHttpService.get(1, 1000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<RequestBudgetForecast>) => {

                let options = {
                    sheetid: 'Administrare',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                // let res = alasql(`SELECT id as [Id],
                //                     code as [Cod],
                //                     name as [Denumire],
                //                     divisionName as [Localitate / Judet]
                //                     INTO XLSX("Centre de cost.xlsx",?) FROM ?`,[ options, data.items ]);

            });
    }

    collapsed(event: any): void {
        // console.log(event);
      }

      expanded(event: any): void {
        // console.log(event);
      }
}
