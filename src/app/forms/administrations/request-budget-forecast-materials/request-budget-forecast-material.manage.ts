import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppUtils } from '../../../common/app.utils';
import { RequestBudgetForecastHttpService } from '../../../services/http/requests/request-budget-forecast.http.service';
import { RequestBudgetForecast } from '../../../model/api/requests/request-budget-forecast';
import { MaterialHttpService } from '../../../services/http/administration/material.http.service';
import { RequestBudgetForecastMaterialHttpService } from '../../../services/http/requests/request-budget-forecast-material.http.service';
import { MaterialList } from '../materials/material.list';
import { RequestBudgetForecastMaterialListComponent } from './request-budget-forecast-material.list';
import { Material } from '../../../model/api/administration/material';
import { RequestBudgetForecastListComponent } from '../request-budget-forecasts/request-budget-forecast.list';


@Component({
    selector: 'app-request-budget-forecast-material-manage',
    templateUrl: 'request-budget-forecast-material.manage.html',
    styleUrls: ['request-budget-forecast-material.manage.scss'],
    providers: [ RequestBudgetForecastHttpService, MaterialHttpService, RequestBudgetForecastMaterialHttpService ]
})
export class RequestBudgetForecastMaterialManageComponent extends GenericManage<RequestBudgetForecast, number> {

    @ViewChild('requestBudgetForecastMaterialList') requestBudgetForecastMaterialList: RequestBudgetForecastMaterialListComponent;
    @ViewChild('materialListModal') materialListModal: ModalDirective;
    @ViewChild('materialList') materialList: MaterialList;
    @ViewChild('requestBudgetForecastListModal') requestBudgetForecastListModal: ModalDirective;
    @ViewChild('requestBudgetForecastList') requestBudgetForecastList: RequestBudgetForecastListComponent;

    public filter: string = '';
    public selectedMaterial: Material = null;
    public selectedRequestBudgetForecast: RequestBudgetForecast = null;
    isCollapsed: boolean = true;
    public selectedRequestBudgetForecastMaterial: any;

    constructor(public materialHttpService: MaterialHttpService,
      public requestBudgetForecastMaterialHttpService: RequestBudgetForecastMaterialHttpService,
      public requestBudgetForecastHttpService: RequestBudgetForecastHttpService) {

        super();
    }

    ngAfterViewInit () {
        this.refresh();
    }

    public onRequestBudgetForecastMaterialListSelectionChanged(offerMaterials: Array<any>) {
        this.selectedRequestBudgetForecastMaterial = this.requestBudgetForecastMaterialList.selectedItem;
    }

    public onMaterialListCancel() {
        this.materialListModal.hide();
    }

    public onBudgetForecastMaterialListCancel() {
        this.requestBudgetForecastListModal.hide();
    }

    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("materialIds", AppUtils.getIdsList<Material, number>([ this.selectedMaterial ])));
        params.push(new Param("requestBudgetForecastIds", AppUtils.getIdsList<RequestBudgetForecast, number>([ this.selectedRequestBudgetForecast ])));


        this.requestBudgetForecastMaterialList.refresh(params);
    }

    public selectMaterial() {

        this.materialListModal.show();
        this.materialList.refresh(null);
    }

    public selectBudgetForecast() {
        this.requestBudgetForecastListModal.show();
        this.requestBudgetForecastList.refresh(null);
    }

    public setSelectedMaterial() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedMaterial = this.materialList.selectedItem;
                this.materialListModal.hide();
                this.refresh();
                break;
            default:
                break;
        }
    }

    public setSelectedRequestBudgetForecast() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedRequestBudgetForecast = this.requestBudgetForecastList.selectedItem;
                this.requestBudgetForecastListModal.hide();
                this.refresh();
                break;
            default:
                break;
        }
    }

    public unselectMaterial() {
        this.selectedMaterial = null;
        this.refresh();
    }

    public unselectRequestBudgetForecast() {
        this.selectedRequestBudgetForecast = null;
        this.refresh();
    }


    public exportToExcel() {

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.requestBudgetForecastMaterialHttpService.get(1, 1000000, 'code', 'asc', params, null).subscribe(
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
