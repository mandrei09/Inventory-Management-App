import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { EmployeeCostCenter } from '../../../model/api/administration/employee-cost-center';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppUtils } from '../../../common/app.utils';
import { MaterialHttpService } from '../../../services/http/administration/material.http.service';
import { MaterialList } from '../materials/material.list';
import { Material } from '../../../model/api/administration/material';
import { OrderHttpService } from '../../../services/http/administration/order.http.service';
import { OrderMaterialHttpService } from '../../../services/http/administration/order-material.http.service';
import { OrderMaterialListComponent } from './order-material.list';
import { OrderList } from '../order/order.list';
import { Order } from '../../../model/api/administration/order';
import { OrderMaterial } from '../../../model/api/administration/order-material';


@Component({
    selector: 'app-order-material-manage',
    templateUrl: 'order-material.manage.html',
    styleUrls: ['order-material.manage.scss'],
    providers: [ OrderMaterialHttpService, OrderHttpService, MaterialHttpService ]
})
export class OrderMaterialManageComponent extends GenericManage<OrderMaterial, number> implements AfterViewInit {

    @ViewChild('orderMaterialList') orderMaterialList: OrderMaterialListComponent;
    @ViewChild('orderListModal') orderListModal: ModalDirective;
    @ViewChild('orderList') orderList: OrderList;
    @ViewChild('materialListModal') materialListModal: ModalDirective;
    @ViewChild('materialList') materialList: MaterialList;

    public filter: string = '';
    public selectedOrder: Order = null;
    public selectedMaterial: Material = null;
    isCollapsed: boolean = true;
    public selectedOrderMaterial: any;

    constructor(public orderHttpService: OrderHttpService,
      public orderMaterialHttpService: OrderMaterialHttpService,
      public materialHttpService: MaterialHttpService) {

        super();
    }

    ngAfterViewInit () {
        this.refresh();
    }

    public onOrderMaterialListSelectionChanged(orderMaterials: Array<any>) {
        this.selectedOrderMaterial = this.orderMaterialList.selectedItem;
    }

    public onOrderListCancel() {
        this.orderListModal.hide();
    }

    public onMaterialListCancel() {
        this.materialListModal.hide();
    }

    public refresh() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('orderIds', AppUtils.getIdsList<Order, number>([ this.selectedOrder ])));
        params.push(new Param('materialIds', AppUtils.getIdsList<Material, number>([ this.selectedMaterial ])));


        this.orderMaterialList.refresh(params);
    }

    public selectOrder() {

        this.orderListModal.show();
        this.orderList.refresh(null);
    }

    public selectMaterial() {
        this.materialListModal.show();
        this.materialList.refresh(null);
    }

    public setSelectedOrder() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedOrder = this.orderList.selectedItem;
                this.orderListModal.hide();
                this.refresh();
                break;
            default:
                break;
        }
    }

    public setSelectedMaterial() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedMaterial = this.materialList.selectedItem;
                this.materialListModal.hide();
                this.refresh();
                break;
            default:
                break;
        }
    }

    public unselectOrder() {
        this.selectedOrder = null;
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

        this.orderMaterialHttpService.get(1, 1000000, 'code', 'asc', params, null).subscribe(
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
                //                     INTO XLSX('Centre de cost.xlsx',?) FROM ?`,[ options, data.items ]);

            });
    }

    collapsed(event: any): void {
        // console.log(event);
      }
      expanded(event: any): void {
        // console.log(event);
      }
}
