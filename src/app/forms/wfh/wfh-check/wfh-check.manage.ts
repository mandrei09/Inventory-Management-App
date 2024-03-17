import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../../services/notification.service';
import { DictionaryItemHttpService } from '../../../services/http/administration/dictionary-item.http.service';
import { BrandHttpService } from '../../../services/http/assets/brand.http.service';
import { ModelHttpService } from '../../../services/http/assets/model.http.service';
import { BudgetManagerHttpService } from '../../../services/http/administration/budget-manager.http.service';
import { WFHCheck } from '../../../model/api/wfh/wfh-check';
import { WFHCheckListComponent } from './wfh-check.list';
import { WFHCheckDetailComponent } from './wfh-check.detail';
import { BrandList } from '../../assets/brands/brand.list';
import { ModelList } from '../../assets/models/model.list';
import { DictionaryItemListComponent } from '../../administrations/dictionary-item/dictionary-item.list';
import { BudgetManagerList } from '../../administrations/budget-manager/budget-manager.list';
import { DictionaryItem } from '../../../model/api/administration/dictionary-item';
import { Brand } from '../../../model/api/assets/brand';
import { Model } from '../../../model/api/assets/model';
import { BudgetManager } from '../../../model/api/assets/budget-manager';
import { WFHCheckHttpService } from '../../../services/http/wfh/wfh-check.http.service';

@Component({
    selector: 'app-wfh-check-manage',
    templateUrl: 'wfh-check.manage.html',
    styleUrls: ['wfh-check.manage.scss'],
    providers: [ DictionaryItemHttpService, BrandHttpService, ModelHttpService, BudgetManagerHttpService ]
})
export class WFHCheckManageComponent extends GenericManage<WFHCheck, number> {

    @ViewChild('wfhCheckDetail') public wfhCheckDetail: WFHCheckDetailComponent;
    @ViewChild('wfhCheckList') public wfhCheckList: WFHCheckListComponent;
    @ViewChild('wfhCheckDetailModal') wfhCheckDetailModal: ModalDirective;
    @ViewChild('brandListModal') brandListModal: ModalDirective;
    @ViewChild('brandList') public brandList: BrandList;
    @ViewChild('modelListModal') modelListModal: ModalDirective;
    @ViewChild('modelList') public modelList: ModelList;
    @ViewChild('dictionaryItemListModal') dictionaryItemListModal: ModalDirective;
    @ViewChild('dictionaryItemList') public dictionaryItemList: DictionaryItemListComponent;
    @ViewChild('budgetManagerListModal') budgetManagerListModal: ModalDirective;
    @ViewChild('budgetManagerList') budgetManagerList: BudgetManagerList;

    public filter: string = '';
    isCollapsed: boolean = true;
    public selectedDictionaryItem: DictionaryItem = null;
    public selectedBrand: Brand = null;
    public selectedModel: Model = null;
    public selectedBudgetManager: BudgetManager = null;

    constructor(public wfhCheckHttpService: WFHCheckHttpService,
                public notificationHttpService: NotificationService,
                public dictionaryItemHttpService: DictionaryItemHttpService, public brandHttpService: BrandHttpService,
                public modelHttpService: ModelHttpService,
                public budgetManagerHttpService: BudgetManagerHttpService) {
        super();
    }

    public addNewItem() {
        super.addNewItem();

        this.wfhCheckDetail.dictionaryItem = null;
        this.wfhCheckDetail.brand = null;
        this.wfhCheckDetail.model = null;
        this.wfhCheckDetail.budgetManager = null;
    }

    public editItem() {
        super.editItem();

        const wfhCheck: WFHCheck = this.selectedItem as WFHCheck;

        this.wfhCheckDetail.dictionaryItem = null;

        if (wfhCheck != null && wfhCheck.dictionaryItem != null) {
            this.dictionaryItemHttpService
                .getById(wfhCheck.dictionaryItem.id)
                .subscribe((dictionaryItem: DictionaryItem) => {
                    this.wfhCheckDetail.dictionaryItem = dictionaryItem;
                });
        }

        this.wfhCheckDetail.brand = null;

        if (wfhCheck != null && wfhCheck.brand != null) {
            this.brandHttpService
                .getById(wfhCheck.brand.id)
                .subscribe((brand: Brand) => {
                    this.wfhCheckDetail.brand = brand;
                });
        }

        this.wfhCheckDetail.model = null;

        if (wfhCheck != null && wfhCheck.model != null) {
            this.modelHttpService
                .getById(wfhCheck.model.id)
                .subscribe((model: Model) => {
                    this.wfhCheckDetail.model = model;
                });
        }

        this.wfhCheckDetail.budgetManager = null;

        if ((wfhCheck != null && wfhCheck.budgetManager != null)) {
            this.budgetManagerHttpService
                .getById(wfhCheck.budgetManager.id)
                .subscribe((budgetManager: BudgetManager) => {
                    this.wfhCheckDetail.budgetManager = budgetManager;
                });
        }
    }

    public detailInitialize() {
        super.detailInitialize();
        this.wfhCheckDetailModal.show();
    }

    public detailTerminate() {
        super.detailTerminate();
        this.wfhCheckDetailModal.hide();
    }

    public selectBrand() {
        this.brandListModal.show();
        this.brandList.refresh(null);
    }

    public selectModel() {
        this.modelListModal.show();
        this.modelList.refresh(null);
    }

    public selectDictionaryItem() {
        this.dictionaryItemListModal.show();
        this.dictionaryItemList.refresh(null);
    }

    public onWFHCHeckDetailDictionaryItemNeeded() {
        this.wfhCheckDetailModal.hide();
        this.selectDictionaryItem();
    }

    public onBudgetManagerListCancel() {
        this.budgetManagerListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.wfhCheckDetailModal.show();
        }
    }

    public getFilters(): Array<Param> {
        const params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));


        return params;
    }

    public refresh() {
        let params: Array<Param> = null;

        params = this.getFilters();
        this.wfhCheckList.refresh(params);
    }

    public onWFHCheckDetailBrandNeeded() {
        this.wfhCheckDetailModal.hide();
        this.selectBrand();
    }

    public onBrandListCancel() {
        this.brandListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.wfhCheckDetailModal.show();
        }
    }

    public setSelectedBrands() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedBrand = this.brandList.selectedItem;
                this.brandListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.wfhCheckDetail.brand = this.brandList.selectedItem;
                this.brandListModal.hide();
                this.wfhCheckDetailModal.show();
                break;
        }
    }

    public unselectBrand() {
        this.selectedBrand = null;
        this.refresh();
    }

    public onWFHCheckDetailModelNeeded() {
        this.wfhCheckDetailModal.hide();
        this.selectModel();
    }

    public onModelListCancel() {
        this.modelListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.wfhCheckDetailModal.show();
        }
    }

    public setSelectedModels() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedModel = this.modelList.selectedItem;
                this.modelListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.wfhCheckDetail.model = this.modelList.selectedItem;
                this.modelListModal.hide();
                this.wfhCheckDetailModal.show();
                break;
        }
    }

    public unselectModel() {
        this.selectedModel = null;
        this.refresh();
    }

    public onWFHCheckDetailDictionaryItemNeeded() {
        this.wfhCheckDetailModal.hide();
        this.selectDictionaryItem();
    }

    public onDictionaryItemListCancel() {
        this.dictionaryItemListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.wfhCheckDetailModal.show();
        }
    }

    public setSelectedDictionaryItems() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedDictionaryItem = this.dictionaryItemList.selectedItem;
                this.dictionaryItemListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.wfhCheckDetail.dictionaryItem = this.dictionaryItemList.selectedItem;
                this.dictionaryItemListModal.hide();
                this.wfhCheckDetailModal.show();
                break;
        }
    }

    public unselectDictionaryItem() {
        this.selectedDictionaryItem = null;
        this.refresh();
    }

    public onWFHCheckDetailBudgetManagerNeeded() {
      this.wfhCheckDetailModal.hide();
      this.selectBudgetManager();
  }


    public selectBudgetManager() {
        this.budgetManagerListModal.show();
        this.budgetManagerList.refresh(null);
    }

    public setSelectedBudgetManager() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedBudgetManager = this.budgetManagerList.selectedItem;
                this.budgetManagerListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.wfhCheckDetail.budgetManager = this.budgetManagerList.selectedItem;
                this.budgetManagerListModal.hide();
                this.wfhCheckDetailModal.show();
                break;
            default:
                break;
        }
    }

    public unselectBudgetManager() {
        this.selectedBudgetManager = null;
        this.refresh();
    }

    public exportToExcel() {

        // let params: Array<Param> = null;

        // params = this.getFilters();
        // this.costCenterHttpService
        //     .export(params)
        //     .subscribe((blob) => {
        //         fileSaveAs(blob, 'cost_centers.xlsx');
        //     });
    }

    collapsed(event: any): void {
        // console.log(event);
      }
      expanded(event: any): void {
        // console.log(event);
      }
}
