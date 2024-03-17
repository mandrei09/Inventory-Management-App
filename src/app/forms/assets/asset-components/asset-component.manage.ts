import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { AssetComponentDetail as AssetComponentDetailUI } from "./asset-component.detail";
import { AssetComponentList } from './asset-component.list';
import { AssetComponent } from '../../../model/api/assets/asset-component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AssetEntityListComponent } from '../assets/asset-entity.list';
import { EmployeeListComponent } from '../../administrations/employees/employee.list';
import { SubTypeList } from '../../administrations/sub-types/sub-type.list';
import { Asset } from '../../../model/api/assets/asset';
import { Employee } from '../../../model/api/administration/employee';
import { SubType } from '../../../model/api/administration/sub-type';
import { AssetHttpService } from '../../../services/http/assets/asset.http.service';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { SubTypeHttpService } from '../../../services/http/administration/sub-type.http.service';
import { AssetComponentDetail } from '../../../model/api/assets/asset-component-detail';
import { AssetComponentHttpService } from '../../../services/http/assets/asset-component.http.service';
import { AssetComponentDetailHttpService } from '../../../services/http/assets/asset-component-detail.http.service';
import { AppUtils } from '../../../common/app.utils';
@Component({
    selector: 'asset-component-manage',
    templateUrl: 'asset-component.manage.html',
    styleUrls: ['asset-component.manage.scss'],
})
export class AssetComponentManage extends GenericManage<AssetComponent, number> {

    @ViewChild('assetComponentDetailModal') assetComponentDetailModal: ModalDirective;
    @ViewChild('assetComponentList') assetComponentList: AssetComponentList;
    @ViewChild('assetComponentDetail') assetComponentDetail: AssetComponentDetailUI;
    @ViewChild('assetEntityListModal') assetEntityListModal: ModalDirective;
    @ViewChild('assetEntityList') assetEntityList: AssetEntityListComponent;
    @ViewChild('employeeListModal') employeeListModal: ModalDirective;
    @ViewChild('employeeList') employeeList: EmployeeListComponent;
    @ViewChild('subTypeListModal') subTypeListModal: ModalDirective;
    @ViewChild('subTypeList') subTypeList: SubTypeList;

    public filter: string = '';
    public selectedAsset: Asset = null;
    public selectedEmployee: Employee = null;
    public selectedSubType: SubType = null;
    isCollapsed: boolean = true;
    pageSize = 10;
    showExportBtn = true;
    constructor(
        public assetHttpService: AssetHttpService,
        public employeeHttpService: EmployeeHttpService,
        public subTypeHttpService: SubTypeHttpService,
        public assetComponentHttpService: AssetComponentHttpService,
        public assetComponentDetailHttpService: AssetComponentDetailHttpService,
        ) {

        super();
    }
    

    public addNewItem() {
        super.addNewItem();

        this.assetComponentDetail.asset = null;
        this.assetComponentDetail.employee = null;
        this.assetComponentDetail.subType = null;
    }

    public editItem() {
        super.editItem();

        let assetComponent: AssetComponentDetail = this.selectedItem as AssetComponentDetail;

        this.assetComponentDetail.asset = null;
        this.assetComponentDetail.employee = null;
        this.assetComponentDetail.subType = null;

        if (assetComponent != null && assetComponent.asset != null) {
            this.assetHttpService
                .getById(assetComponent.asset.id)
                .subscribe((asset: Asset) => {
                    this.assetComponentDetail.asset = asset;
                });
        }

        if (assetComponent != null && assetComponent.employee != null) {
            this.employeeHttpService
                .getById(assetComponent.employee.id)
                .subscribe((employee: Employee) => {
                    this.assetComponentDetail.employee = employee;
                });
        }

        if (assetComponent != null && assetComponent.subType != null) {
            this.subTypeHttpService
                .getById(assetComponent.subType.id)
                .subscribe((subType: SubType) => {
                    this.assetComponentDetail.subType = subType;
                });
        }
    }

    public detailInitialize() {
        super.detailInitialize();
        this.assetComponentDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.assetComponentDetailModal.hide();
    }

    public onAssetComponentDetailAssetNeeded() {
        this.assetComponentDetailModal.hide();
        this.selectAsset();
    }

    public onAssetListCancel() {
        this.assetEntityListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.assetComponentDetailModal.show();
        }
    }


    public onAssetComponentDetailEmployeeNeeded() {
        this.assetComponentDetailModal.hide();
        this.selectEmployee();
    }

    public onEmployeeListCancel() {
        this.employeeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.assetComponentDetailModal.show();
        }
    }

    public onAssetComponentDetailSubTypeNeeded() {
        this.assetComponentDetailModal.hide();
        this.selectSubType();
    }

    public onSubTypeListCancel() {
        this.subTypeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.assetComponentDetailModal.show();
        }
    }

    public refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('pageSize', this.pageSize.toString()));
        params.push(new Param('assetIds', AppUtils.getIdsList<Asset, number>([ this.selectedAsset ])));
        params.push(new Param('employeeIds', AppUtils.getIdsList<Employee, number>([ this.selectedEmployee ])));
        params.push(new Param('subTypeIds', AppUtils.getIdsList<SubType, number>([ this.selectedSubType ])));
        this.assetComponentList.refresh(params);
    }

    public selectAsset() {
        this.assetEntityListModal.show();
        this.assetEntityList.refresh(null);
    }

    public setSelectedAsset() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedAsset = this.assetEntityList.selectedItem;
                this.assetEntityListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.assetComponentDetail.asset = this.assetEntityList.selectedItem;
                this.assetEntityListModal.hide();
                this.assetComponentDetailModal.show();
                break;
        }
    }


    public unselectAsset() {
        this.selectedAsset = null;
        this.refresh();
    }


    public selectEmployee() {
        this.employeeListModal.show();
        this.employeeList.refresh(null);
    }

    public setSelectedEmployee() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedEmployee = this.employeeList.selectedItem;
                this.employeeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.assetComponentDetail.employee = this.employeeList.selectedItem;
                this.employeeListModal.hide();
                this.assetComponentDetailModal.show();
                break;
        }
    }


    public unselectEmployee() {
        this.selectedEmployee = null;
        this.refresh();
    }

    public selectSubType() {
        this.subTypeListModal.show();
        this.subTypeList.refresh(null);
    }

    public setSelectedSubType() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedSubType = this.subTypeList.selectedItem;
                this.subTypeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.assetComponentDetail.subType = this.subTypeList.selectedItem;
                this.subTypeListModal.hide();
                this.assetComponentDetailModal.show();
                break;
        }
    }


    public unselectSubType() {
        this.selectedSubType = null;
        this.refresh();
    }

    public exportToExcel() {
        this.showExportBtn = false;
         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.assetComponentDetailHttpService.get(1, 1000000, 'code', 'asc', params, null).subscribe(
            (data: PagedResult<AssetComponent>) => {

                let options = {
                    sheetid: 'Accesorii',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                // let res = alasql(`SELECT id as [Id],
                //                     code as [Cod],
                //                     name as [Denumire]
                //                     INTO XLSX("Accesorii.xlsx",?) FROM ?`,[ options, data.items ]);

            });
    }

    collapsed(event: any): void {
      // console.log(event);
    }
  
    expanded(event: any): void {
      // console.log(event);
    }

    public onPageUpdate(number: number) {
        this.pageSize = number;
        this.refresh();
    }
}
