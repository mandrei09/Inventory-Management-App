import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { EmployeeCostCenter } from '../../../model/api/administration/employee-cost-center';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppUtils } from '../../../common/app.utils';
import { OfferMaterialHttpService } from '../../../services/http/administration/offer-material.http.service';
import { OfferHttpService } from '../../../services/http/administration/offer.http.service';
import { MaterialHttpService } from '../../../services/http/administration/material.http.service';
import { OfferMaterial } from '../../../model/api/administration/offer-material';
import { OfferMaterialListComponent } from './offer-material.list';
import { OfferList } from '../offer/offer.list';
import { MaterialList } from '../materials/material.list';
import { Offer } from '../../../model/api/administration/offer';
import { Material } from '../../../model/api/administration/material';


@Component({
    selector: 'app-offer-material-manage',
    templateUrl: 'offer-material.manage.html',
    styleUrls: ['offer-material.manage.scss'],
    providers: [ OfferMaterialHttpService, OfferHttpService, MaterialHttpService ]
})
export class OfferMaterialManageComponent extends GenericManage<OfferMaterial, number> {

    @ViewChild('offerMaterialList') offerMaterialList: OfferMaterialListComponent;
    @ViewChild('offerListModal') offerListModal: ModalDirective;
    @ViewChild('offerList') offerList: OfferList;
    @ViewChild('materialListModal') materialListModal: ModalDirective;
    @ViewChild('materialList') materialList: MaterialList;

    public filter: string = '';
    public selectedOffer: Offer = null;
    public selectedMaterial: Material = null;
    isCollapsed: boolean = true;
    public selectedOfferMaterial: any;

    constructor(public offerHttpService: OfferHttpService,
      public offerMaterialHttpService: OfferMaterialHttpService,
      public materialHttpService: MaterialHttpService) {

        super();
    }

    ngAfterViewInit () {
        this.refresh();
    }

    public onOfferMaterialListSelectionChanged(offerMaterials: Array<any>) {
        this.selectedOfferMaterial = this.offerMaterialList.selectedItem;
    }

    public onOfferListCancel() {
        this.offerListModal.hide();
    }

    public onMaterialListCancel() {
        this.materialListModal.hide();
    }

    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("offerIds", AppUtils.getIdsList<Offer, number>([ this.selectedOffer ])));
        params.push(new Param("materialIds", AppUtils.getIdsList<Material, number>([ this.selectedMaterial ])));


        this.offerMaterialList.refresh(params);
    }

    public selectOffer() {

        this.offerListModal.show();
        this.offerList.refresh(null);
    }

    public selectMaterial() {
        this.materialListModal.show();
        this.materialList.refresh(null);
    }

    public setSelectedOffer() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedOffer = this.offerList.selectedItem;
                this.offerListModal.hide();
                this.refresh();
                break;
            default:
                break;
        }
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

    public unselectOffer() {
        this.selectedOffer = null;
        this.refresh();
    }

    public unselectMaterial() {
        this.selectedMaterial = null;
        this.refresh();
    }


    public exportToExcel() {

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.offerMaterialHttpService.get(1, 1000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<EmployeeCostCenter>) => {

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
