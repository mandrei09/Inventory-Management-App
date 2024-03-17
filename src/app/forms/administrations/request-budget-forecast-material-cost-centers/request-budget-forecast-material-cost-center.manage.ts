import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppUtils } from '../../../common/app.utils';
import { RequestBudgetForecastMaterialHttpService } from '../../../services/http/requests/request-budget-forecast-material.http.service';
import { RequestBudgetForecastMaterialCostCenterHttpService } from '../../../services/http/requests/request-budget-forecast-material-cost-center.http.service';
import { CostCenterHttpService } from '../../../services/http/administration/cost-center.http.service';
import { RequestBudgetForecastMaterialCostCenter } from '../../../model/api/requests/request-budget-forecast-material-cost-center';
import { RequestBudgetForecastMaterialCostCenterListComponent } from './request-budget-forecast-material-cost-center.list';
import { CostCenterListComponent } from '../cost-centers/cost-center.list';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { RequestBudgetForecastMaterial } from '../../../model/api/requests/request-budget-forecast-material';
import { RequestBudgetForecastMaterialListComponent } from '../request-budget-forecast-materials/request-budget-forecast-material.list';


@Component({
    selector: 'app-request-budget-forecast-material-cost-center-manage',
    templateUrl: 'request-budget-forecast-material-cost-center.manage.html',
    styleUrls: ['request-budget-forecast-material-cost-center.manage.scss'],
    providers: [ RequestBudgetForecastMaterialHttpService, CostCenterHttpService, RequestBudgetForecastMaterialCostCenterHttpService ]
})
export class RequestBudgetForecastMaterialCostCenterManageComponent extends GenericManage<RequestBudgetForecastMaterialCostCenter, number> {

    @ViewChild('requestBudgetForecastMaterialCostCenterList') requestBudgetForecastMaterialCostCenterList: RequestBudgetForecastMaterialCostCenterListComponent;
    @ViewChild('costCenterListModal') costCenterListModal: ModalDirective;
    @ViewChild('costCenterList') costCenterList: CostCenterListComponent;
    @ViewChild('requestBudgetForecastMaterialListModal') requestBudgetForecastMaterialListModal: ModalDirective;
    @ViewChild('requestBudgetForecastMaterialList') requestBudgetForecastMaterialList: RequestBudgetForecastMaterialListComponent;

    public filter: string = '';
    public selectedCostCenter: CostCenter = null;
    public selectedRequestBudgetForecastMaterial: RequestBudgetForecastMaterial = null;
    isCollapsed: boolean = true;
    public selectedRequestBudgetForecastMaterialCostCenter: any;

    constructor(public costCenterHttpService: CostCenterHttpService,
      public requestBudgetForecastMaterialHttpService: RequestBudgetForecastMaterialHttpService,
      public requestBudgetForecastMaterialCostCenterHttpService: RequestBudgetForecastMaterialCostCenterHttpService) {

        super();
    }

    ngAfterViewInit () {
        this.refresh();
    }

    public onRequestBudgetForecastMaterialCostCeterListSelectionChanged(offerMaterials: Array<any>) {
        this.selectedRequestBudgetForecastMaterialCostCenter = this.requestBudgetForecastMaterialCostCenterList.selectedItem;
    }

    public onCostCenterListCancel() {
        this.costCenterListModal.hide();
    }

    public onBudgetForecastMaterialListCancel() {
        this.requestBudgetForecastMaterialListModal.hide();
    }

    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("costCenterIds", AppUtils.getIdsList<CostCenter, number>([ this.selectedCostCenter ])));
        params.push(new Param("requestBudgetForecastMaterialIds", AppUtils.getIdsList<RequestBudgetForecastMaterial, number>([ this.selectedRequestBudgetForecastMaterial ])));


        this.requestBudgetForecastMaterialCostCenterList.refresh(params);
    }

    public selectCostCenter() {

        this.costCenterListModal.show();
        this.costCenterList.refresh(null);
    }

    public selectBudgetForecastMaterial() {
        this.requestBudgetForecastMaterialListModal.show();
        this.requestBudgetForecastMaterialList.refresh(null);
    }

    public setSelectedCostCenter() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedCostCenter = this.costCenterList.selectedItem;
                this.costCenterListModal.hide();
                this.refresh();
                break;
            default:
                break;
        }
    }

    public setSelectedRequestBudgetForecastMaterial() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedRequestBudgetForecastMaterial = this.requestBudgetForecastMaterialList.selectedItem;
                this.requestBudgetForecastMaterialListModal.hide();
                this.refresh();
                break;
            default:
                break;
        }
    }

    public unselectCostCenter() {
        this.selectedCostCenter = null;
        this.refresh();
    }

    public unselectRequestBudgetForecastMaterial() {
        this.selectedRequestBudgetForecastMaterial = null;
        this.refresh();
    }


    public exportToExcel() {

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.requestBudgetForecastMaterialHttpService.get(1, 1000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<RequestBudgetForecastMaterial>) => {

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
