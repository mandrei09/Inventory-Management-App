import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Param } from '../../../model/common/param';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { PartnerHttpService } from '../../../services/http/documents/partner.http.service';
import { Employee } from '../../../model/api/administration/employee';
import { Partner } from '../../../model/api/documents/partner';
import { TypeList } from '../types/type.list';
import { SubTypeList } from '../sub-types/sub-type.list';
import { OrderOpDetailList } from '../order-ops/order-op.detail.list';
import { OfferList } from '../offer/offer.list';
import { BudgetList } from '../budget/budget.list';
import { AdministrationHttpService } from '../../../services/http/administration/administration.http.service';
import { CostCenterHttpService } from '../../../services/http/administration/cost-center.http.service';
import { MasterTypeHttpService } from '../../../services/http/assets/master-type.http.service';
import { TypeHttpService } from '../../../services/http/administration/type.http.service';
import { SubTypeHttpService } from '../../../services/http/administration/sub-type.http.service';
import { EntityFileHttpService } from '../../../services/http/common/entity-file.http.service';
import { AccMonthHttpService } from '../../../services/http/accounting/acc-month.http.service';
import { OrderOpHttpService } from '../../../services/http/administration/order-op.http.service';
import { MasterTypeListComponent } from '../../assets/master-types/master-type.list';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { EmployeeListComponent } from '../employees/employee.list';
import { AccMonthListComponent } from '../../accounting/acc-month.list';
import { PartnerListComponent } from '../../documents/partners/partner.list';
import { UomListComponent } from '../../assets/uoms/uom.list';
import { CostCenterListComponent } from '../cost-centers/cost-center.list';
import { AdministrationListComponent } from '../administrations/administration.list';
import { CompanyListComponent } from '../../assets/companies/company.list';
import { ProjectList } from '../../assets/projects/project.list';
import { EntityFileListComponent } from '../../common/entity-file.list';
import { EntityFile } from '../../../model/api/common/entity-file';
import { OrderSave } from '../../../model/api/administration/order-save';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { MonthEntity } from '../../../model/api/common/month-entity';
import { Offer } from '../../../model/api/administration/offer';
import { Budget } from '../../../model/api/administration/budget';
import { CodePartnerEntity } from '../../../model/api/common/code-partner-entity';
import { OrderHttpService } from '../../../services/http/administration/order.http.service';
import { AppData } from '../../../app-data';
import { ProjectHttpService } from '../../../services/http/assets/project.http.service';
import { CompanyHttpService } from '../../../services/http/assets/company.http.service';
import { OfferHttpService } from '../../../services/http/administration/offer.http.service';
import { BudgetHttpService } from '../../../services/http/administration/budget.http.service';
import { UomHttpService } from '../../../services/http/assets/uom.http.service';
import { MasterType } from '../../../model/api/assets/master-type';
import { Type } from '../../../model/api/administration/type';
import { SubType } from '../../../model/api/administration/sub-type';
import { Administration } from '../../../model/api/administration/administration';
import { Company } from '../../../model/api/assets/company';
import { Project } from '../../../model/api/assets/project';

import { AccMonth } from '../../../model/api/accounting/acc-month';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { Uom } from '../../../model/api/assets/uom';
import { AppConfig } from '../../../config';
import { Contract } from '../../../model/api/administration/contract';
import { ContractListComponent } from '../contracts/contract.list';
import { ContractHttpService } from '../../../services/http/administration/contract.http.service';
import { OfferMaterialHttpService } from '../../../services/http/administration/offer-material.http.service';
import { AppUtils } from '../../../common/app.utils';
import { OfferMaterialListComponent } from '../offer-materials/offer-material.list';
import { ContractFilter } from '../../../model/api/administration/contract.filter';
import { NotificationService } from '../../../services/notification.service';
import { MaterialList } from '../materials/material.list';
import { OfferMaterialAdd } from '../../../model/api/assets/offer-material-add';
import { Material } from '../../../model/api/administration/material';
import { MaterialHttpService } from '../../../services/http/administration/material.http.service';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators
 } from '@angular/forms';
import { OfferMaterialUpdate } from '../../../model/api/administration/offer-material-update';
import { EmailManagerHttpService } from '../../../services/http/administration/email-manager.http.service';
import { OrderMaterialUpdate, StockMaterialUpdate } from '../../../model/api/administration/order-material-update';
import { RateHttpService } from '../../../services/http/administration/rate.http.service';
import { BudgetFilter } from '../../../model/api/administration/budget.filter';
import { BudgetBaseListComponent } from '../budget-base/budget-base.list';
import { BudgetBase } from '../../../model/api/budget/budget-base';
import { BudgetBaseHttpService } from '../../../services/http/administration/budget-base.http.service';
import { OrderType } from '../../../model/api/order/order-type';
import { OrderTypeListComponent } from '../../orders/order-type/order-type.list';
import { OrderTypeHttpService } from '../../../services/http/orders/order-type.http.service';
import { Rate } from '../../../model/api/administration/rate';
import { RateListComponent } from '../../assets/rates/rate.list';
import { OfferITMaterialUpdate } from '../../../model/api/administration/offer-it-material-update';
import { OfferITMaterialAdd } from '../../../model/api/assets/offer-it-material-add';
import { StockListComponent } from '../stocks/stock.list';
import { StockHttpService } from '../../../services/http/administration/stock.http.service';
import { Stock } from '../../../model/api/administration/stock';
import { StockOrderListComponent } from '../stocks/stock-order.list';
import { CreateAssetSAPResult } from '../../../model/api/result/create-asset-SAP-result';
import { BudgetForecastUIListComponent } from '../budget-forecast/budget-forecast.ui.list';
import { BudgetForecast } from '../../../model/api/budget/budget-forecast';
import { BudgetForecastHttpService } from '../../../services/http/administration/budget-forecast.http.service';
import { OrderResult } from '../../../model/api/result/order-result';
import { RequestBudgetForecastHttpService } from '../../../services/http/requests/request-budget-forecast.http.service';
import { RequestBudgetForecastListComponent } from '../request-budget-forecasts/request-budget-forecast.list';
import { Request } from '../../../model/api/administration/request';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MaterialListOrder } from '../materials/material-list-order';
import { RequestBudgetForecastMaterialHttpService } from '../../../services/http/requests/request-budget-forecast-material.http.service';
import { RequestBudgetForecastMaterialListComponent } from '../request-budget-forecast-materials/request-budget-forecast-material.list';
import { RequestBudgetForecast } from '../../../model/api/requests/request-budget-forecast';
import { RequestBudgetForecastMaterialAdd } from '../../../model/api/requests/request-budget-forecast-material-add';
import { RequestBudgetForecastContractAdd } from '../../../model/api/requests/request-budget-forecast-contract-add';
import { RequestResult } from '../../../model/api/result/request-result';
import { RequestBudgetForecastMaterialUpdate } from '../../../model/api/requests/request-budget-forecast-material-update';
import { RequestFilter } from '../../../model/api/requests/request.filter';
import { Message, MessageService } from 'primeng/api';
import { OrderStockSave } from '../../../model/api/administration/order-stock-save';
import { AssetHttpService } from '../../../services/http/assets/asset.http.service';
import { Plant } from '../../../model/api/assets/plant';
import { PlantHttpService } from '../../../services/http/assets/plant.http.service';
import { PlantListComponent } from '../../assets/plants/plant.list';
import { AssetEntity } from '../../../model/api/common/asset-entity';
import { AssetEntityListComponent } from '../../assets/assets/asset-entity.list';
import { RequestBudgetForecastMaterialUpdateAssetParent } from '../../../model/api/requests/request-budget-forecast-material-update-asset-parent';
import { RequestBudgetForecastMaterialMultiple } from '../../../model/api/administration/RequestBudgetForecastMaterialMultiple';

@Component({
    selector: 'app-order-detail-ui',
    templateUrl: 'order.detail.ui.html',
    styleUrls: ['order.detail.ui.scss'],
    providers: [
        AdministrationHttpService,
        CostCenterHttpService,
        MasterTypeHttpService,
        TypeHttpService,
        SubTypeHttpService,
        EntityFileHttpService,
        EmployeeHttpService,
        AccMonthHttpService,
        OrderOpHttpService,
        ContractHttpService,
        PartnerHttpService ]
})
export class OrderDetailUIComponent implements OnInit, AfterViewInit  {

    @ViewChild('masterTypeList') public masterTypeList: MasterTypeListComponent;
    @ViewChild('masterTypeListModal') public masterTypeListModal: ModalDirective;

    @ViewChild('typeList') public typeList: TypeList;
    @ViewChild('typeListModal') public typeListModal: ModalDirective;

    @ViewChild('subTypeList') public subTypeList: SubTypeList;
    @ViewChild('subTypeListModal') public subTypeListModal: ModalDirective;

    @ViewChild('employeeList') public employeeList: EmployeeListComponent;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

    @ViewChild('accMonthList') public accMonthList: AccMonthListComponent;
    @ViewChild('accMonthListModal') public accMonthListModal: ModalDirective;

    @ViewChild('partnerList') public partnerList: PartnerListComponent;
    @ViewChild('partnerListModal') public partnerListModal: ModalDirective;

    @ViewChild('uomList') public uomList: UomListComponent;
    @ViewChild('uomListModal') public uomListModal: ModalDirective;

    
    

    @ViewChild('costCenterList') public costCenterList: CostCenterListComponent;
    @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;

    @ViewChild('administrationList') public administrationList: AdministrationListComponent;
    @ViewChild('administrationListModal') public administrationListModal: ModalDirective;

    @ViewChild('companyList') public companyList: CompanyListComponent;
    @ViewChild('companyListModal') public companyListModal: ModalDirective;

    @ViewChild('orderTypeList') public orderTypeList: OrderTypeListComponent;
    @ViewChild('orderTypeListModal') public orderTypeListModal: ModalDirective;

    @ViewChild('offerList') public offerList: OfferList;
    @ViewChild('offerListModal') public offerListModal: ModalDirective;

    @ViewChild('contractList') public contractList: ContractListComponent;
    @ViewChild('contractListModal') public contractListModal: ModalDirective;

    @ViewChild('budgetBaseList') public budgetBaseList: BudgetBaseListComponent;
    @ViewChild('budgetBaseListModal') public budgetBaseListModal: ModalDirective;

    // @ViewChild('budgetForecastList') public budgetForecastList: BudgetForecastUIListComponent;
    // @ViewChild('budgetForecastListModal') public budgetForecastListModal: ModalDirective;

    @ViewChild('projectList') public projectList: ProjectList;
    @ViewChild('projectListModal') public projectListModal: ModalDirective;

    @ViewChild('orderOpDetailList') public orderOpList: OrderOpDetailList;
    @ViewChild('entityFileList') public entityFileList: EntityFileListComponent;

    @ViewChild('offerITMaterialList') public offerITMaterialList: OfferMaterialListComponent;
    @ViewChild('offerMaterialList') public offerMaterialList: OfferMaterialListComponent;

    @ViewChild('materialListModal') public materialListModal: ModalDirective;
    @ViewChild('materialList') public materialList: MaterialList;

    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
    @ViewChild('fileInput') fileInput;

    @ViewChild('startAccMonthList') public startAccMonthList: AccMonthListComponent;
    @ViewChild('startAccMonthListModal') public startAccMonthListModal: ModalDirective;

    @ViewChild('rateList') public rateList: RateListComponent;
    @ViewChild('rateListModal') public rateListModal: ModalDirective;

    
    

    @ViewChild('plantInitialList') public plantInitialList: PlantListComponent;
    @ViewChild('plantInitialListModal') public plantInitialListModal: ModalDirective;

    @ViewChild('plantFinalList') public plantFinalList: PlantListComponent;
    @ViewChild('plantFinalListModal') public plantFinalListModal: ModalDirective;

    @ViewChild('assetEntityList') public assetEntityList: AssetEntityListComponent;
    @ViewChild('assetEntityListModal') public assetEntityListModal: ModalDirective;

    @ViewChild('stockList') public stockList: StockOrderListComponent;
    @ViewChild('requestBudgetForecastList') public requestBudgetForecastList: RequestBudgetForecastListComponent;
    @ViewChild('requestBudgetForecastMaterialList') public requestBudgetForecastMaterialList: RequestBudgetForecastMaterialListComponent;

    @ViewChild('requestBudgetForecastMaterialAllList') public requestBudgetForecastMaterialAllList: RequestBudgetForecastMaterialListComponent;

    ref: DynamicDialogRef;

    assetToUpdate = new Array<OfferITMaterialUpdate>();
    requestBFMUpdate = new Array<RequestBudgetForecastMaterialUpdate>();
    requestBFMAssetParent = new Array<RequestBudgetForecastMaterialUpdateAssetParent>();
    hide = true;
    forma: FormGroup;
    formSubmit: boolean = false;
    sumOfQuantity: any = 0;
    // sumOfQuantityRequestBGF: any = 0;
    // sumOfValueRequestBGF: any = 0;
    // sumOfPrice: number = 0;
    sumOfTotal: any = 0;
    sumOfTotalInOtherCurrency: number = 0;
    // budgetValue: number = 0;
    //budgetInOtherCurrencyValue: number = 0;
    // contractValue: number = 0;
    // contractInOtherCurrencyValue: number = 0;
    // contractRemValue: number = 0;
    // contractRemInOtherCurrencyValue: number = 0;

    iniQuantity: number = 0;
    iniPrice: number = 0;
    // contractCurrency: Rate = null;
    // showOtherCurrency = false;
    quantityIT = 0;
    valueIT = 0;
    orderCheck = false;
    blocked: boolean = false;
    showStock = false;

    options: FormGroup;
    hideRequiredControl = new FormControl(false);
    floatLabelControl = new FormControl('auto');

    public startAccMonth: AccMonth = null;
    public selectedOfferMaterial: any;
    public guid = Guid.newGuid();
    public materials: Material[];

    model = {
        quantity: 0,
        price: 0,
     };

    public entityTypeCode: string = 'ORDER';
    public entityFile: EntityFile = null;
    public confirmationMessage: string = '';
    public operationType: OperationType = OperationType.NotSet;

    public material: CodeNameEntity = null;


    public id: number = 0;
    public order: OrderSave = new OrderSave();
    public orderStock: OrderStockSave = new OrderStockSave();
    public filesToUpload: Array<File>;
    public selectedAssetOp: any;
    public isSaved: boolean = true;

    // public quantityRemBudget = 0;
    public valueRemBudget = 0;
    public valueRemOffer = 0;
    // public isInvalidQuantity = false;
    // public isInvalidValue = false;

    public amountOK = false;
    public currencyOK = false;
    public supplierOK = false;

    public get allowSaving(): boolean {
        return this.order != null &&
        this.order.name != null && this.order.name.trim().length > 3 &&
        (this.order.quantity > 0)  &&
        this.order.price > 0 &&
        this.uom != null &&
        this.offer != null &&
        // (this.budgetForecast != null) &&
        (this.order.valueIni > 0);
    }

    public costCenter: CodeNameEntity = null;
    public employee: Employee = null;
    public accMonth: AccMonth = null;
    public company: CodeNameEntity = null;
    // public orderType: CodeNameEntity = null;
    // public offer: Offer = null;
    // public budgetBase: BudgetBase = null;
    // public budgetForecast: BudgetForecast = null;
    public contract: Contract = null;
    public account: CodeNameEntity = null;
    public partner: CodePartnerEntity = null;
    public uom: CodeNameEntity = null;
    public masterType: CodeNameEntity = null;
    public project: CodeNameEntity = null;
    public interCompany: CodeNameEntity = null;
    public type: CodeNameEntity = null;
    public subType: CodeNameEntity = null;
    public administration: CodeNameEntity = null;
    //public subCategory: SubCategory = null;
    
    public plantInitial: Plant = null;
    public plantFinal: Plant = null;
    public readOnlyForm: boolean = false;
    public get isAdmin(): boolean { return AppData.UserIsAdmin; }
    public assetEntity: AssetEntity = null;

    public needContractAmount: boolean = false;
    // public needBudgetAmount: boolean = false;

    public rate: Rate = null;
    public stock: Stock = null;

    msgs1: Message[];

    public orderType: CodeNameEntity = null;
    public offer: Offer = null;

    public _orderTypeItemSelect: OrderType[] = [];
    public get orderTypeItemSelect(): OrderType[] { return this._orderTypeItemSelect; }
    public set orderTypeItemSelect(value: OrderType[]) {
      this._orderTypeItemSelect = value;
      this.setSelectedOrderType(value);
    }

    public _offerItemSelect: Offer[] = [];
    public get offerItemSelect(): Offer[] { return this._offerItemSelect; }
    public set offerItemSelect(value: Offer[]) {
      this._offerItemSelect = value;
      this.setSelectedOffer(value);
    }

    public catsIds = '';

    // public _subCategoryItemSelect: any[] = [];
    // public get subCategoryItemSelect(): any[] { return this._subCategoryItemSelect; }
    // public set subCategoryItemSelect(value: any[]) {
    //   this._subCategoryItemSelect = value;

    //   this.catsIds = '';
    //   value.forEach(element => {
    //     if (element.category != null) {
    //       this.catsIds += element?.category?.id + ',';
    //     }
    //   });

    //   this.setSelectedSubCategory(value);
    // }

    // public setSelectedSubCategory(value) {
    //   this.stockList.refresh(null);
    //   // const items: Array<SubCategory> = this.subCategoryList.selectedItems;
    //   const items: Array<SubCategory> = value;
    //   this.subCategory = ((items != null) && (items.length === 1)) ? items[0] : null;
    //
    //   const params = new Array<Param>();
    //   params.push(new Param('categoryIds', AppUtils.getIdsList<CodeNameEntity, number>([ this.subCategory != null && this.subCategory.category != null  ? this.subCategory.category : null ])));
    //   params.push(new Param('subCategoryIds', AppUtils.getIdsList<CodeNameEntity, number>([ this.subCategory != null  ? this.subCategory : null ])));
    //   this.stockList.refresh(params);
    //   this.subCategoryListModal.hide();
    // }


    public _plantInitialItemSelect: Plant[] = [];
    public get plantInitialItemSelect(): Plant[] { return this._plantInitialItemSelect; }
    public set plantInitialItemSelect(value: Plant[]) {
      this._plantInitialItemSelect = value;
      this.setSelectedPlantFinal(value);
    }

    public _plantFinalItemSelect: Plant[] = [];
    public get plantFinalItemSelect(): Plant[] { return this._plantFinalItemSelect; }
    public set plantFinalItemSelect(value: Plant[]) {
      this._plantFinalItemSelect = value;

      const items: Array<Plant> = value;
      this.plantFinal = ((items != null) && (items.length === 1)) ? items[0] : null;
    }

    public get plantInitialParams(): Array<Param> {
      const params = new Array<Param>();
      params.push(new Param('plantActualIds', AppUtils.getIdsList<CodeNameEntity, number>([ this.plantFinal != null ? this.plantFinal : null ])));

      return params;
    }

    public get subCategoryParams(): Array<Param> {
      const params = new Array<Param>();
      params.push(new Param('categoryIds', this.catsIds));

      return params;
    }

    public get plantFinalParams(): Array<Param> {
      const params = new Array<Param>();

      return params;
    }

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public orderHttpService: OrderHttpService,
        public masterTypeHttpService: MasterTypeHttpService,
        
        public typeHttpService: TypeHttpService,
        public subTypeHttpService: SubTypeHttpService,
        public accMonthHttpService: AccMonthHttpService,
        public employeeHttpService: EmployeeHttpService,
        public costCenterHttpService: CostCenterHttpService,
        public projectHttpService: ProjectHttpService,
        public companyHttpService: CompanyHttpService,
        public offerHttpService: OfferHttpService,
        public contractHttpService: ContractHttpService,
        public budgetHttpService: BudgetHttpService,
        public budgetBaseHttpService: BudgetBaseHttpService,
        public orderOpHttpService: OrderOpHttpService,
        public partnerHttpService: PartnerHttpService,
        public uomHttpService: UomHttpService,
        public administrationHttpService: AdministrationHttpService,
        public offerMaterialHttpService: OfferMaterialHttpService,
        public notificationService: NotificationService,
        public materialHttpService: MaterialHttpService,
        public emailManagerHttpService: EmailManagerHttpService,
        public orderTypeHttpService: OrderTypeHttpService,
        public rateHttpService: RateHttpService,
        public stockHttpService: StockHttpService,
        public budgetForecastHttpService: BudgetForecastHttpService,
        public requestBudgetForecastHttpService: RequestBudgetForecastHttpService,
        public requestBudgetForecastMaterialHttpService: RequestBudgetForecastMaterialHttpService,
        public dialogService: DialogService,
        public assetHttpService: AssetHttpService,
        
        public plantHttpService: PlantHttpService,
        private messageService: MessageService,
        private fb: FormBuilder,
        public entityFileHttpService: EntityFileHttpService) {
            this.options = fb.group({
                hideRequired: this.hideRequiredControl,
                floatLabel: this.floatLabelControl,
              });
        this.route.params.subscribe((params: Params) => {
            if (params['id']) {
                this.id = +params['id'];
            }
        });
    }
    ngOnInit(): void {
       //  throw new Error('Method not implemented.');
       this.msgs1 = [
        {severity:'success', summary:'Success', detail:'Message Content', closable: false, sticky: true},
        {severity:'info', summary:'Info', detail:'Message Content', closable: false, sticky: true},
        {severity:'warn', summary:'Warning', detail:'Message Content', closable: false, sticky: true},
        {severity:'error', summary:'Error', detail:'Message Content', closable: false, sticky: true}
    ];
    }
    ngAfterViewInit() {
        // if ((this.assetFullDetail !== null) && (this.assetFullDetail.id === 0)) this.refreshDocumentTypes();
        if (this.id > 0) {
            this.orderHttpService.getDetailById(this.id)
                .subscribe((asset: any) => {
                    // this.asset = asset;
                       this.updateDetails(asset);

                    if (asset.validated) {
                        // this.refreshAssetOperations();
                        this.refreshEntityFiles();
                    } else {
                       // this.refreshAssetTypes();
                       // this.refreshDocumentTypes();
                    }
                });
        }
    }

    public refreshEntityFiles() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('entityTypeCode', 'ASSET'));
        params.push(new Param('entityId', this.order.id.toString()));

        this.entityFileList.refresh(params);
    }

    // public refreshAssetOperations() {
    //     const params: Array<Param> = new Array<Param>();

    //     params.push(new Param('assetId', this.id.toString()));
    //     this.orderOpList.refresh(params);
    // }

    public updateDetails(order: any) {
        this.order.id = order.id;
        this.order.code = order.code;
        this.order.name = order.name;
        // this.order.companyId = order.companyId;
        this.order.offerId = order.offerId;
        // this.order.projectId = order.projectId;
        // this.order.administrationId = order.administrationId;
        // this.order.masterTypeId = order.masterTypeId;
        // this.order.typeId = order.typeId;
        // this.order.subTypeId = order.subTypeId;
        // this.order.employeeId = order.employeeId;
        // this.order.accMonthId = order.accMonthId;
        // this.order.interCompanyId = order.interCompanyId;
        // this.order.partnerId = order.partnerId;
        // this.order.uomId = order.uomId;
        // this.order.accountId = order.accountId;
        // this.order.costCenterId = order.costCenterId;
        this.order.valueIni = order.valueIni;
        this.order.valueFin = order.valueFin;
        this.order.quantity = order.quantity;
        this.order.info = order.info;
        this.order.price = order.price;
        this.order.validated = order.validated;

        this.company = order.company;
        this.offer = order.offer;
        // this.budgetForecast = order.budgetForecast;
        this.project = order.project;
        this.administration = order.administration;
        this.masterType = order.masterType;
        this.type = order.type;
        this.subType = order.subType;
        this.employee = order.employee;
        this.accMonth = order.accMonth;
        this.interCompany = order.interCompany;
        this.partner = order.partner;
        this.account = order.account;
        this.costCenter = order.costCenter;
        this.uom = order.uom;

        // this.quantityRemBudget = order.budget.quantityRem;
        this.valueRemBudget = order.budget.valueFin;
        this.valueRemOffer = order.offer.valueFin;
    }

           /*begin MASTERTYPE */
           public selectMasterType() {

            this.masterTypeList.refresh(null);
            this.masterTypeListModal.show();
        }

        public setSelectedMasterType() {
            const items: Array<MasterType> = this.masterTypeList.selectedItems;
            this.masterType = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.masterTypeListModal.hide();
        }

        /*end MASTERTYPE */

          /*begin TYPE */
          public selectType() {

            const params = new Array<Param>();

            params.push(new Param('masterTypeIds', this.masterType != null ? this.masterType.id.toString() : null));

            this.typeList.refresh(params);
            this.typeListModal.show();
        }
        public setSelectedType() {
            const items: Array<Type> = this.typeList.selectedItems;
            this.type = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.typeListModal.hide();
        }

        /*end TYPE */

          /*begin SUBTYPE */
          public selectSubType() {

            const params = new Array<Param>();

            params.push(new Param('typeIds', this.type != null ? this.type.id.toString() : null));


            this.subTypeList.refresh(params);
            this.subTypeListModal.show();
        }
        public setSelectedSubType() {
            const items: Array<SubType> = this.subTypeList.selectedItems;
            this.subType = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.subTypeListModal.hide();
        }

        /*end asset type*/

               /*begin ADMINISTRATION */
               public selectAdministration() {

                this.administrationList.refresh(null);
                this.administrationListModal.show();
            }
            public setSelectedAdministration() {
                const items: Array<Administration> = this.administrationList.selectedItems;
                this.administration = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.administrationListModal.hide();
            }

            /*end ASSETNATURE *


               /*begin COMPANY */
               public selectCompany() {

                this.companyList.refresh(null);
                this.companyListModal.show();
            }
            public setSelectedCompany() {
                const items: Array<Company> = this.companyList.selectedItems;
                this.company = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.companyListModal.hide();
            }

            /*end COMPANY */

                /*begin ORDR TYPE */
                public selectOrderType() {

                this.orderTypeList.refresh(null);
                this.orderTypeListModal.show();
            }
            public setSelectedOrderType(value) {
                const items: Array<OrderType> = this.orderTypeList.selectedItems;
                // const items: Array<OrderType> = value;
                this.orderType = ((items != null) && (items.length === 1)) ? items[0] : null;
                // this.orderTypeListModal.hide();

                if (this.orderType != null && this.orderType.code === 'C-IT') {
                  setTimeout(() => {
                    if(this.stockList != undefined) {
                      this.stockList.refresh(null);
                    }
                  }, 1000);
                };
            }

            /*end COMPANY */


               /*begin OFFER */
               public selectOffer() {

                this.offerList.refresh(null);
                this.offerListModal.show();
            }
            public setSelectedOffer(value) {
                const items: Array<Offer> = this.offerList.selectedItems;
                // const items: Array<Offer> = value;
                // this.offer = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.offer = ((items != null) && (items.length === 1)) ? items[0] : null;
                // this.valueRemOffer = this.offer.valueFin;
                // this.offerListModal.hide();

                if (this.orderType != null && this.orderType.code !== 'C-IT') {
                    const params: Array<Param> = new Array<Param>();

                    params.push(new Param('offerIds', AppUtils.getIdsList<Offer, number>([ this.offer != null ? this.offer : null ])));
                    this.offerMaterialList.refresh(params);
                    this.requestBudgetForecastList.refresh(params);

                    params.push(new Param('requestIds', AppUtils.getIdsList<Request, number>([ this.offer != null ? this.offer.request : null ])));
                    this.requestBudgetForecastList.refresh(params);

                    setTimeout(() => {
                      const requestFilter: RequestFilter = new RequestFilter();

                      let selectedRequestBudgetForecastMaterialAlls = new Array<any>();
                      this.requestBudgetForecastMaterialAllList.selectedItems = selectedRequestBudgetForecastMaterialAlls;

                    if (this.requestBudgetForecastList != null) {
                      let params: Array<Param> = new Array<Param>();
                      requestFilter.requestBudgetForecastIds = new Array<number>();
                      this.requestBudgetForecastList.items.forEach((requestBGF) => {
                          requestFilter.requestBudgetForecastIds.push(requestBGF.id);
                      });

                      params.push(new Param('jsonFilter', JSON.stringify(requestFilter)));
                      // this.requestBudgetForecastMaterialAllList.refresh(params);
                  }
                    }, 5000);

                    setTimeout(() => {
                      this.sumOfQuantity = 0;
                      this.sumOfTotal = 0;
                      this.sumOfTotalInOtherCurrency = 0;
                      this.materials = [];

                      this.offerMaterialList.items.forEach(offer => {
                        this.materials.push(new Material(offer.material.id, offer.material.code, offer.material.name, null, null, null, null, null, null, 0, 0, '', ''));
                          // this.sumOfQuantity = +offer.quantity + this.sumOfQuantity;
                          // this.sumOfTotal = +(offer.priceRon * offer.quantity) + this.sumOfTotal;
                          // if (this.showOtherCurrency) {
                          //     this.sumOfTotalInOtherCurrency = +((offer.priceRon * offer.quantity) / this.contract.contractAmount.rate.value) + this.sumOfTotalInOtherCurrency;
                          // }
                      });
                    }, 5000);

                } else {
                    // const params: Array<Param> = new Array<Param>();

                    // params.push(new Param('offerIds', AppUtils.getIdsList<Offer, number>([ this.offer != null ? this.offer : null ])));
                    // this.offerITMaterialList.refresh(params);
                    this.stockList.refresh(null);
                }

                this.sumOfQuantity = 0;
                // this.sumOfPrice = 0;
                this.sumOfTotal = 0;
                this.sumOfTotalInOtherCurrency = 0;
                this.iniQuantity = 0;
                this.iniPrice = 0;

                // this.offerMaterialList.items.forEach(offer => {
                //     this.sumOfQuantity = +offer.quantity + this.sumOfQuantity;
                //     // this.sumOfPrice = +offer.price + this.sumOfPrice;
                //     this.iniQuantity = +offer.quantity + this.iniQuantity;
                //     this.iniPrice = +offer.price + this.iniPrice;
                //     this.sumOfTotal = +(offer.price * offer.quantity);
                // });


                // this.offerMaterialList.TableItems.forEach(offer => {
                //     // this.sumOfQuantity = +offer.quantity + this.sumOfQuantity;
                //     // // this.sumOfPrice = +offer.price + this.sumOfPrice;
                //     // this.iniQuantity = +offer.quantity + this.iniQuantity;
                //     // this.iniPrice = +offer.price + this.iniPrice;
                //     // this.sumOfTotal = +(offer.price * offer.quantity);
                // });


                // console.log(this.iniQuantity);
                // console.log(this.iniPrice);
            }

            /*end OFFER */


            //  /*begin BUDGET BASE */
            //  public selectBudgetBase() {

            //     // this.budgetValue = 0;
            //     // this.budgetInOtherCurrencyValue = 0;

            //     const params = new Array<Param>();
            //     const budgetFilter: BudgetFilter = new BudgetFilter();

            //     if(this.orderType != null && this.orderType.code !== 'C-IT'){

            //     if (this.offer != null && this.offer.admCenter != null) {
            //         budgetFilter.admCenterIds = new Array<number>();
            //         budgetFilter.admCenterIds.push(this.offer.admCenter.id);
            //       }

            //       if (this.offer != null && this.offer.assetType != null) {
            //         budgetFilter.assetTypeIds = new Array<number>();
            //         budgetFilter.assetTypeIds.push(this.offer.assetType.id);
            //       }

            //       if (this.offer != null && this.offer.budgetBase != null) {
            //         budgetFilter.budgetBaseIds = new Array<number>();
            //         budgetFilter.budgetBaseIds.push(this.offer.budgetBase.id);
            //       }
            //     }


            //       params.push(new Param('pageSize', '5'));
            //       params.push(new Param('jsonFilter', JSON.stringify(budgetFilter)));


            //     this.budgetBaseList.refresh(params);
            //     this.budgetBaseListModal.show();
            // }
            // public setSelectedBudgetBase() {
            //     const items: Array<BudgetBase> = this.budgetBaseList.selectedItems;
            //     this.budgetBase = ((items != null) && (items.length === 1)) ? items[0] : null;

            //     if (this.budgetBase != null) {
            //       // this.quantityRemBudget = this.budget.quantityRem;
            //       // this.valueRemBudget = this.budget.valueFin;
            //       this.budgetValue = this.budgetBase.valueFin;

            //       if (this.showOtherCurrency) {
            //           this.budgetInOtherCurrencyValue = this.budgetBase.valueFin / this.contract.contractAmount.rate.value;
            //           // this.contractValue = this.contract.contractAmount.amount * this.contractCurrency.value;
            //           // this.contractInOtherCurrencyValue = this.contract.contractAmount.amount;

            //           // this.contractRemValue = this.contract.contractAmount.amountRem * this.contractCurrency.value;
            //           // this.contractRemInOtherCurrencyValue = this.contract.contractAmount.amountRem;
            //       }
            //     }

            //     this.budgetBaseListModal.hide();
            // }

            // /*end BUDGET  BASE*/


          //    /*begin BUDGET FORECAST */
          //    public selectBudgetForecast() {

          //     const params = new Array<Param>();
          //     const budgetFilter: BudgetFilter = new BudgetFilter();

          //     if(this.orderType != null && this.orderType.code !== 'C-IT'){

          //     if (this.offer != null && this.offer.admCenter != null) {
          //         budgetFilter.admCenterIds = new Array<number>();
          //         budgetFilter.admCenterIds.push(this.offer.admCenter.id);
          //       }

          //       if (this.offer != null && this.offer.assetType != null) {
          //         budgetFilter.assetTypeIds = new Array<number>();
          //         budgetFilter.assetTypeIds.push(this.offer.assetType.id);
          //       }

          //       if (this.offer != null && this.offer.budgetForecast != null) {
          //         budgetFilter.budgetForecastIds = new Array<number>();
          //         budgetFilter.budgetForecastIds.push(this.offer.budgetForecast.id);
          //       }
          //     }
          //       params.push(new Param('pageSize', '5'));
          //       params.push(new Param('jsonFilter', JSON.stringify(budgetFilter)));


          //     this.budgetForecastList.refresh(params);
          //     this.budgetForecastListModal.show();
          // }
          // public setSelectedBudgetForecast() {
          //     const items: Array<BudgetForecast> = this.budgetForecastList.selectedItems;
          //     this.budgetForecast = ((items != null) && (items.length === 1)) ? items[0] : null;

          //     if (this.budgetForecast != null) {
          //       this.budgetValue = this.budgetForecast.totalRem;

          //       if (this.showOtherCurrency) {
          //           this.budgetInOtherCurrencyValue = this.budgetForecast.totalRem / this.contract.contractAmount.rate.value;
          //       }
          //     }
          //     this.budgetForecastListModal.hide();
          // }

          // /* end BUDGET FORECAST */


                //  /*begin CONTRACT */
                //  public selectContract() {
                //     // this.showOtherCurrency = false;
                //     const params = new Array<Param>();
                //     const contractFilter: ContractFilter = new ContractFilter();

                //     if (this.offer != null && this.offer.partner != null) {
                //         contractFilter.partnerIds = new Array<number>();
                //         contractFilter.partnerIds.push(this.offer.partner.id);
                //       }

                //       if (this.offer != null && this.offer.uom != null) {
                //         contractFilter.uomIds = new Array<number>();
                //         contractFilter.uomIds.push(this.offer.uom.id);
                //       }

                //       params.push(new Param('pageSize', '5'));
                //       params.push(new Param('jsonFilter', JSON.stringify(contractFilter)));

                //     this.contractList.refresh(params);
                //     this.contractListModal.show();
                // }
                // public setSelectedContract() {

                //     const items: Array<Contract> = this.contractList.selectedItems;

                //     this.contract = ((items != null) && (items.length === 1)) ? items[0] : null;

                //     if (this.contract != null) {

                //         // this.contractRemValue = this.contract.contractAmount.amountRem * this.contractCurrency.value;
                //         // this.contractRemInOtherCurrencyValue = this.contract.contractAmount.amountRem;

                //         if (this.contract.contractID === 'IT') {
                //             this.amountOK = true;
                //             this.supplierOK = true;
                //             this.showOtherCurrency = false;
                //         } else if (this.contract.contractID === 'NO-C' ) {
                //           this.amountOK = true;
                //           this.supplierOK = true;

                //           this.sumOfQuantity = 0;
                //           // this.sumOfPrice = 0;
                //           this.sumOfTotal = 0;
                //           this.sumOfTotalInOtherCurrency = 0;
                //           this.iniQuantity = 0;
                //           this.iniPrice = 0;

                //           this.showOtherCurrency = false;
                //           // this.contractValue = res[0].contractAmount.amount;
                //           // this.contractRemValue = this.contract.contractAmount.amountRem;
                //           this.offerMaterialList.items.forEach(offer => {
                //           this.sumOfQuantity = +offer.quantity + this.sumOfQuantity;
                //           // this.sumOfPrice = +offer.price + this.sumOfPrice;
                //           this.iniQuantity = +offer.quantity + this.iniQuantity;
                //           this.iniPrice = +offer.price + this.iniPrice;
                //           this.sumOfTotal = +(offer.priceRon * offer.quantity) + this.sumOfTotal;
                //       });
                //         } else {
                //             this.contractHttpService.getContractByID(this.contract.contractID).subscribe( (res) => {
                //                 if (res.length > 0) {

                //                     if (this.contract.contractAmount.amount = res[0].contractAmount.amount) {
                //                         this.notificationService.showSuccess('OK', 'Verificare valoare!');
                //                         this.amountOK = true;
                //                     } else {
                //                         this.notificationService.showError('NOT OK', 'Verificare valoare!');
                //                         this.amountOK = false;
                //                     }

                //                     if (this.contract.contractAmount.uom.code = res[0].contractAmount.currency) {
                //                         this.notificationService.showSuccess('OK', 'Verificare moneda!');
                //                         this.currencyOK = true;
                //                     } else {
                //                         this.notificationService.showError('NOT OK', 'Verificare moneda!');
                //                         this.currencyOK = false;
                //                     }

                //                     if (this.contract.partner.registryNumber = res[0].supplier.systemID) {
                //                         this.notificationService.showSuccess('OK', 'Verificare furnizor!');
                //                         this.supplierOK = true;
                //                     } else {
                //                         this.notificationService.showError('NOT OK', 'Verificare furnizor!');
                //                         this.supplierOK = false;
                //                     }

                //                     // this.contract.contractAmount = res[0].contractAmount;

                //                     this.sumOfQuantity = 0;
                //                     // this.sumOfPrice = 0;
                //                     this.sumOfTotal = 0;
                //                     this.sumOfTotalInOtherCurrency = 0;
                //                     this.iniQuantity = 0;
                //                     this.iniPrice = 0;
                //                     // this.budgetInOtherCurrencyValue = 0;
                //                     // this.budgetValue = 0;

                //                     // if (this.currencyOK && res[0].contractAmount.currency !== 'RON') {
                //                     //     this.getCurrency(res[0].contractAmount.currency).subscribe(() => {
                //                     //         this.showOtherCurrency = true;
                //                     //         // console.log(JSON.stringify(this.contractCurrency));

                //                     //             this.contractValue = res[0].contractAmount.amount * this.contractCurrency.value;
                //                     //             this.contractInOtherCurrencyValue = res[0].contractAmount.amount;

                //                     //             this.contractRemValue = this.contract.contractAmount.amountRem * this.contractCurrency.value;
                //                     //             this.contractRemInOtherCurrencyValue = this.contract.contractAmount.amountRem;

                //                     //             this.offerMaterialList.items.forEach(offer => {
                //                     //                 this.sumOfQuantity = +offer.quantity + this.sumOfQuantity;
                //                     //                 // this.sumOfPrice = +offer.price + this.sumOfPrice;
                //                     //                 this.iniQuantity = +offer.quantity + this.iniQuantity;
                //                     //                 this.iniPrice = +offer.price + this.iniPrice;
                //                     //                 this.sumOfTotal = +(offer.price * offer.quantity) + this.sumOfTotal;
                //                     //                 this.sumOfTotalInOtherCurrency = +((offer.price * offer.quantity) / this.contractCurrency.value) + this.sumOfTotalInOtherCurrency;
                //                     //         });
                //                     //     });
                //                     // } else {
                //                     //         this.showOtherCurrency = false;
                //                     //         this.contractValue = res[0].contractAmount.amount;
                //                     //         this.contractRemValue = this.contract.contractAmount.amountRem;
                //                     //         this.offerMaterialList.items.forEach(offer => {
                //                     //             this.sumOfQuantity = +offer.quantity + this.sumOfQuantity;
                //                     //             // this.sumOfPrice = +offer.price + this.sumOfPrice;
                //                     //             this.iniQuantity = +offer.quantity + this.iniQuantity;
                //                     //             this.iniPrice = +offer.price + this.iniPrice;
                //                     //             this.sumOfTotal = +(offer.price * offer.quantity) + this.sumOfTotal;
                //                     //     });
                //                     // }

                //                     const contractIds: RequestBudgetForecastContractAdd = new RequestBudgetForecastContractAdd();
                //                     contractIds.contractId = this.contract.id;
                //                     contractIds.requestBudgetForecastId = this.requestBudgetForecastList.selectedItem != null ? this.requestBudgetForecastList.selectedItem.id : 0;

                //                     this.requestBudgetForecastHttpService.addContractByRequestBudgetForecast(contractIds).subscribe((res: RequestResult)=> {
                //                       if(res.success){
                //                         this.notificationService.showSuccess(res.message, 'Mapare contract');

                //                         if (this.currencyOK && res[0].contractAmount.currency !== 'RON') {
                //                           this.showOtherCurrency = true;
                //                           // console.log(JSON.stringify(this.contractCurrency));

                //                           // this.contractValue = res[0].contractAmount.amount * this.contractCurrency.value;
                //                           // this.contractInOtherCurrencyValue = res[0].contractAmount.amount;

                //                           // this.contractRemValue = this.contract.contractAmount.amountRem * this.contractCurrency.value;
                //                           // this.contractRemInOtherCurrencyValue = this.contract.contractAmount.amountRem;

                //                           this.offerMaterialList.items.forEach(offer => {
                //                           this.sumOfQuantity = +offer.quantity + this.sumOfQuantity;
                //                           // this.sumOfPrice = +offer.price + this.sumOfPrice;
                //                           this.iniQuantity = +offer.quantity + this.iniQuantity;
                //                           this.iniPrice = +offer.price + this.iniPrice;
                //                           this.sumOfTotal = +(offer.priceRon * offer.quantity) + this.sumOfTotal;
                //                           this.sumOfTotalInOtherCurrency = +((offer.priceRon * offer.quantity) / this.contract.contractAmount.rate.value) + this.sumOfTotalInOtherCurrency;
                //                           });
                //                         } else {
                //                                   this.showOtherCurrency = false;
                //                                   // this.contractValue = res[0].contractAmount.amount;
                //                                   // this.contractRemValue = this.contract.contractAmount.amountRem;
                //                                   this.offerMaterialList.items.forEach(offer => {
                //                                   this.sumOfQuantity = +offer.quantity + this.sumOfQuantity;
                //                                   // this.sumOfPrice = +offer.price + this.sumOfPrice;
                //                                   this.iniQuantity = +offer.quantity + this.iniQuantity;
                //                                   this.iniPrice = +offer.price + this.iniPrice;
                //                                   this.sumOfTotal = +(offer.priceRon * offer.quantity) + this.sumOfTotal;
                //                               });
                //                         }
                //                       }else {
                //                         this.notificationService.showError(res.message, 'Mapare contract');
                //                       }

                //             // if (this.offer != null && this.offer.request != null && this.offer.budget != null) {
                //             //     this.budget = this.offer.budget;
                //             //     this.budgetValue = this.budget.valueFin;
                //             //     // if (this.showOtherCurrency) {
                //             //     //     this.budgetInOtherCurrencyValue = this.budget.valueFin / this.contractCurrency.value;
                //             //     // }
                //             //     if (this.showOtherCurrency) {
                //             //         this.budgetInOtherCurrencyValue = this.budget.valueFin / this.contract.contractAmount.rate.value;
                //             //         // this.contractValue = this.contract.contractAmount.amount * this.contractCurrency.value;
                //             //         // this.contractInOtherCurrencyValue = this.contract.contractAmount.amount;

                //             //         // this.contractRemValue = this.contract.contractAmount.amountRem * this.contractCurrency.value;
                //             //         // this.contractRemInOtherCurrencyValue = this.contract.contractAmount.amountRem;
                //             //     }
                //             // }

                //             // if (this.offer != null && this.offer.request != null && this.offer.budgetForecast != null) {
                //             //     this.budgetForecast = this.offer.budgetForecast;
                //             //     this.budgetValue = this.budgetForecast.totalRem;
                //             //     // if (this.showOtherCurrency) {
                //             //     //     this.budgetInOtherCurrencyValue = this.budget.valueFin / this.contractCurrency.value;
                //             //     // }
                //             //     if (this.showOtherCurrency) {
                //             //         this.budgetInOtherCurrencyValue = this.budgetForecast.totalRem / this.contract.contractAmount.rate.value;
                //             //         // this.contractValue = this.contract.contractAmount.amount * this.contractCurrency.value;
                //             //         // this.contractInOtherCurrencyValue = this.contract.contractAmount.amount;

                //             //         // this.contractRemValue = this.contract.contractAmount.amountRem * this.contractCurrency.value;
                //             //         // this.contractRemInOtherCurrencyValue = this.contract.contractAmount.amountRem;
                //             //     }
                //             // }
                //                     })
                //                 }
                //                 // console.log(JSON.stringify(res.contractAmount));
                //             });
                //         }



                //     }
                //     // if (this.budget != null) {
                //     //   // this.quantityRemBudget = this.budget.quantityRem;
                //     //   this.valueRemBudget = this.budget.valueFin;
                //     // }
                //     this.contractListModal.hide();
                // }
                // /*end CONTRACT */


                 /*begin NEW CONTRACT */
                 public selectContract() {
                  // this.showOtherCurrency = false;
                  const params = new Array<Param>();
                  const contractFilter: ContractFilter = new ContractFilter();

                  if (this.offer != null && this.offer.partner != null) {
                      contractFilter.partnerIds = new Array<number>();
                      contractFilter.partnerIds.push(this.offer.partner.id);
                    }

                    if (this.offer != null && this.offer.uom != null) {
                      contractFilter.uomIds = new Array<number>();
                      contractFilter.uomIds.push(this.offer.uom.id);
                    }

                    params.push(new Param('pageSize', '5'));
                    params.push(new Param('jsonFilter', JSON.stringify(contractFilter)));

                  this.contractList.refresh(params);
                  this.contractListModal.show();
              }
              public setSelectedContract() {

                  const items: Array<Contract> = this.contractList.selectedItems;

                  this.contract = ((items != null) && (items.length === 1)) ? items[0] : null;

                  if (this.contract != null) {

                    const contractIds: RequestBudgetForecastContractAdd = new RequestBudgetForecastContractAdd();
                          contractIds.contractId = this.contract.id;
                          contractIds.requestBudgetForecastId = this.requestBudgetForecastList.selectedItem != null ? this.requestBudgetForecastList.selectedItem.id : 0;

                          this.requestBudgetForecastHttpService.addContractByRequestBudgetForecast(contractIds).subscribe((res: RequestResult)=> {
                            if(res.success){
                              this.notificationService.showSuccess(res.message, 'Mapare contract', 0, false, 0);
                              this.contractListModal.hide();
                              this.requestBudgetForecastMaterialList.refresh(null);
                              this.requestBudgetForecastList.refresh(null);
                            }else {
                              this.notificationService.showError(res.message, 'Mapare contract', 0, false, 0);
                              this.contractListModal.hide();
                              this.requestBudgetForecastMaterialList.refresh(null);
                              this.requestBudgetForecastList.refresh(null);
                            }
                          })
                  }
              }
              /*end  NEW CONTRACT */

               /*begin PROJECT */
               public selectProject() {

                this.projectList.refresh(null);
                this.projectListModal.show();
            }
            public setSelectedProject() {
                const items: Array<Project> = this.projectList.selectedItems;
                this.project = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.projectListModal.hide();
            }
            /*end PROJECT */

    /*begin employee*/
    public selectEmployee() {
        this.employeeList.refresh(null);
        this.employeeListModal.show();
    }

    public setSelectedEmployee() {
        const items: Array<Employee> = this.employeeList.selectedItems;
        this.employee = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.employeeListModal.hide();
    }
    /*end employee*/

     /*begin AccMonth*/
     public selectAccMonth() {
        this.accMonthList.refresh(null);
        this.accMonthListModal.show();
    }

    public setSelectedAccMonth() {
        const items: Array<AccMonth> = this.accMonthList.selectedItems;
        this.accMonth = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.accMonthListModal.hide();
    }
    /*end AccMonth */


        /* begin costcenter */
        public selectCostCenter() {

            this.costCenterList.refresh(null);
            this.costCenterListModal.show();
        }
        public setSelectedCostCenter() {
            const items: Array<CostCenter> = this.costCenterList.selectedItems;
            this.costCenter = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.costCenterListModal.hide();
        }
        /*end costcenter */

    /*begin partner*/
    public selectPartner() {
        this.partnerList.refresh(null);
        this.partnerListModal.show();
    }

    public setSelectedPartner() {
        const items: Array<Partner> = this.partnerList.selectedItems;
         this.partner = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.partnerListModal.hide();
    }

    /*end UOM*/

        /*begin partner*/
        public selectUom() {
          this.uomList.refresh(null);
          this.uomListModal.show();
      }

      public setSelectedUom() {
          const items: Array<Uom> = this.uomList.selectedItems;
           this.uom = ((items != null) && (items.length === 1)) ? items[0] : null;
          this.uomListModal.hide();
      }

      /*end UOM*/


      


     public cancelChanges() {
        // this.ngLocation.back();
        this.router.navigate(['/procurement/order']);
    }

    public onDeleteAsset() {
        this.operationType = OperationType.Delete;
        this.confirmationMessage = 'Stergeti inregistrarea curenta?';
        this.confirmationModal.show();
    }

    public deleteAsset() {
        this.orderHttpService.delete(this.order.id)
            .subscribe(() => this.router.navigate(['/assetdepdetails']));
    }

    public onValidateAsset() {
        this.operationType = OperationType.AssetValidation;
        this.confirmationMessage = 'Validati inregistrarea curenta?';
        this.confirmationModal.show();
    }

    public validateBudget() {
        this.order.validated = true;
        this.saveOrder();
    }

    public addNewOperation() {
        // let assets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
        // assets.push(new AssetSimpleDetail(this.asset.id, this.asset.invNo, this.asset.assetName,
        //     '', this.asset.partner, this.asset.assetType, this.asset.accState, this.asset.usageStartDate, '', ''));
        // AppData.AssetList = assets;
        // this.router.navigate(['/newoperation']);
    }

    public onAssetInvFullDetailSelectionChanged(offerMaterials: Array<any>) {
        // let inisumOfQuantity = this.sumOfQuantity;
        this.sumOfQuantity = 0;
        // this.sumOfPrice = 0;
        this.sumOfTotal = 0;
        this.sumOfTotalInOtherCurrency = 0;

        // this.offerMaterialList.items.forEach(offer => {
        //     // console.log(JSON.stringify(offer));
        //     this.sumOfQuantity = +offer.quantity + this.sumOfQuantity;
        //     // this.sumOfPrice = +offer.price + this.sumOfPrice;
        //     // this.iniQuantity = +offer.quantity + this.iniQuantity;
        //     // this.iniPrice = +offer.price + this.iniPrice;
        //     this.sumOfTotal = +(offer.priceRon * offer.quantity) + this.sumOfTotal;
        //     if (this.showOtherCurrency) {
        //          this.sumOfTotalInOtherCurrency = +((offer.priceRon * offer.quantity) / this.contract.contractAmount.rate.value) + this.sumOfTotalInOtherCurrency;

        //         // this.sumOfTotalInOtherCurrency = +((offer.price * offer.quantity)) + this.sumOfTotalInOtherCurrency;
        //     }
        // });

        // if (inisumOfQuantity < this.sumOfQuantity) {
        //     console.log('Mai mare');
        // }

        // console.log(JSON.stringify(offerMaterials));
        // this.sumOfNumber = 0;

        // offerMaterials.forEach(offer => {
        //     this.sumOfNumber += (offer.price * offer.quantity);
        //     console.log(this.sumOfNumber);
        // });

        // this.selectedMaterials = ((assets != null) && (assets.length === 1)) ? assets[0] : null;
    }

    public onRequestBudgetForecastSelectionChanged(event) {
      // console.log(JSON.stringify(event));
      // this.sumOfQuantityRequestBGF = 0;
      // this.sumOfValueRequestBGF = 0;

      // this.requestBudgetForecastList.items.forEach(requestBGF => {
      //     this.sumOfQuantityRequestBGF = +requestBGF.quantity + this.sumOfQuantityRequestBGF;
      //     this.sumOfValueRequestBGF = +requestBGF.value + this.sumOfValueRequestBGF;
      // });

      // const params: Array<Param> = new Array<Param>();

      // params.push(new Param('requestBudgetForecastIds', AppUtils.getIdsList<RequestBudgetForecast, number>([ this.offer != null ? this.offer : null ])));
      // this.requestBudgetForecastMaterialList.refresh(params);
  }

  public setSelectedItem($event) {

    const requestFilter: RequestFilter = new RequestFilter();

    let selectedRequestBudgetForecastMaterials = new Array<any>();
    this.requestBudgetForecastMaterialList.selectedItems = selectedRequestBudgetForecastMaterials;

  let params: Array<Param> = new Array<Param>();

  if (this.requestBudgetForecastList != null) {
    requestFilter.requestBudgetForecastIds = new Array<number>();
    this.requestBudgetForecastList.selectedItems.forEach((requestBGF) => {
        requestFilter.requestBudgetForecastIds.push(requestBGF.id);
    });
}
   params.push(new Param('requestBudgetForecastIds', ''));
   params.push(new Param('showAll', 'false'));
   params.push(new Param('jsonFilter', JSON.stringify(requestFilter)));

  // params.push(new Param('requestBudgetForecastIds', AppUtils.getIdsList<RequestBudgetForecast, number>([
  //   this.requestBudgetForecastList.selectedItem != null ? this.requestBudgetForecastList.selectedItem : null ])));
    this.requestBudgetForecastMaterialList.refresh(params);


}

    onAssetEmployeeValidateListAfterViewInit() {
        // this.iniQuantity = 0;
        // this.iniPrice = 0;

        // this.offerMaterialList.items.forEach(offer => {
        //     this.iniQuantity = +offer.quantity + this.sumOfQuantity;
        //     this.iniPrice = +offer.price + this.sumOfPrice;
        // });
        // console.log(this.iniQuantity);
        // console.log(this.iniPrice);
    }


    public saveOrder() {

    this.order.orderMaterialUpdates = new Array<OrderMaterialUpdate>();
    this.order.requestBudgetForecasts = new Array<number>();

    this.offerMaterialList.items.filter(a => a.quantity > 0).forEach(element => {
      this.order.orderMaterialUpdates.push(new OrderMaterialUpdate(element.id, element.quantity, element.price, element.priceRon, (element.quantity * element.price), (element.quantity * element.priceRon), element.preAmount));
    });

    this.requestBudgetForecastList.items.forEach(element => {
      this.order.requestBudgetForecasts.push(element.id);
    });
      this.isSaved = false;
      // this.order.companyId = this.company != null ? this.company.id : null;
      this.order.offerId = this.offer != null ? this.offer.id : null;
      // this.order.budgetId = this.budget != null ? this.budget.id : null;
       // this.order.budgetBaseId = this.budgetBase != null ? this.budgetBase.id : null;
       // this.order.budgetForecastId = this.budgetForecast != null ? this.budgetForecast.id : null;
      this.order.orderTypeId = this.orderType != null ? this.orderType.id : null;
      // this.order.needBudgetAmount = this.needBudgetAmount;
      // this.order.projectId = this.project != null ? this.project.id : null;
      // this.order.administrationId = this.administration != null ? this.administration.id : null;
      // this.order.masterTypeId = this.masterType != null ? this.masterType.id : null;
      // this.order.typeId = this.type != null ? this.type.id : null;
      // this.order.subTypeId = this.subType != null ? this.subType.id : null;
      // this.order.employeeId = this.employee != null ? this.employee.id : null;
      // this.order.accMonthId = this.accMonth != null ? this.accMonth.id : null;
      // this.order.interCompanyId = this.interCompany != null ? this.interCompany.id : null;
      // this.order.partnerId = this.partner != null ? this.partner.id : null;
      // this.order.uomId = this.contract != null && this.contract.contractAmount != null && this.contract.contractAmount.uom != null ? this.contract.contractAmount.uom.id : null;
      // this.order.accountId = this.account != null ? this.account.id : null;
      // this.order.costCenterId = this.costCenter != null ? this.costCenter.id : null;
      // this.order.contractId = this.contract != null ? this.contract.id : null;
      // this.order.rateId = this.contract.contractAmount.rate.id;
      this.order.sumOfTotalInOtherCurrency = this.sumOfTotalInOtherCurrency;
      // this.order.valueIni = this.model.quantity * this.model.price;
      // this.order.quantity = this.model.quantity;
      this.order.startAccMonthId = this.startAccMonth != null ? this.startAccMonth.id : null;
      this.order.validated = true;
      this.orderCheck = true;
      this.blocked = true;
      this.orderHttpService.addNewOrder(this.order)
    .subscribe((result: OrderResult) => {
        if (result.success) {
          this.notificationService.showInfo(result.message, 'P.O. nou', 2000, false, 0);
          this.router.navigate(['/procurement/order']);
          this.orderCheck = false;
          this.blocked = false;
        } else if (!result.success) {
            this.notificationService.showError('Motiv: ' + result.message + '!', 'Eroare salvare date', 0, false, 0);
            this.isSaved = true;
        }
    });
    }

    public saveOrderStock() {

      this.orderStock.stockMaterialUpdates = new Array<number>();
      // this.orderStock.requestBudgetForecasts = new Array<number>();

      if (this.orderType != null && this.orderType.code === 'C-IT') {
              // this.order.orderMaterialUpdates.push(new OrderMaterialUpdate(0, this.quantityIT, this.valueIT, this.valueIT, this.sumOfTotal, this.sumOfTotal, 0));
              // this.offerITMaterialList.items.filter(a => a.quantity > 0).forEach(element => {
              //     this.order.orderMaterialUpdates.push(new OrderMaterialUpdate(element.id, element.quantity, element.price, element.priceRon, (element.quantity * element.price), (element.quantity * element.priceRon), element.preAmount));
              // });

              this.stockList.items.filter(a => a.quantity > 0).forEach(element => {
                  this.orderStock.stockMaterialUpdates.push(element.id);
              });
              this.isSaved = false;
              // this.orderStock.offerId = this.offer != null ? this.offer.id : null;
              // this.order.budgetBaseId = this.budgetBase != null ? this.budgetBase.id : null;
              // this.order.budgetForecastId = this.budgetForecast != null ? this.budgetForecast.id : null;
              this.orderStock.orderTypeId = this.orderType != null ? this.orderType.id : null;
              this.orderStock.plantInitialId = this.plantInitial != null ? this.plantInitial.id : null;
              this.orderStock.plantFinalId = this.plantFinal != null ? this.plantFinal.id : null;
              //this.orderStock.categoryId = this.subCategory != null && this.subCategory.category != null ? this.subCategory.category.id : null;
              // this.order.needBudgetAmount = this.needBudgetAmount;
              // this.order.contractId = this.contract != null ? this.contract.id : null;
              // this.orderStock.sumOfTotalInOtherCurrency = this.sumOfTotalInOtherCurrency;
              // this.orderStock.startAccMonthId = this.startAccMonth != null ? this.startAccMonth.id : null;
              this.orderStock.validated = true;
              this.orderCheck = true;
              this.blocked = true;
            //   this.orderHttpService.addNewOrder(this.order)
            //   .subscribe((assetId: number) => {
            //       if (assetId > 0) {
            //           if (assetId === 1) {
            //               this.notificationService.showInfo('Comanda nu a fost plasata. Valoare comenzii depaseste valoarea disponibila!', 'Adaugare comanda noua');
            //           } else {
            //               this.notificationService.showSuccess('Comanda a fost plasat cu success', 'Adaugare comanda noua');
            //           }
            //           this.router.navigate(['/procurement/order']);
            //           this.id = assetId;
            //       } else {
            //           this.notificationService.showError('Eroare plasare comanda', 'Adaugare comanda noua');
            //       }
            // });


            this.orderHttpService.addNewOrderStock(this.orderStock)
            .subscribe((result: OrderResult) => {
                if (result.success) {
                  this.notificationService.showInfo(result.message, 'Comanda noua', 2000, false, 0);
                  this.router.navigate(['/procurement/order']);
                  this.orderCheck = false;
                  this.blocked = false;
                } else if (!result.success) {
                    this.notificationService.showError('Motiv: ' + result.message + '!', 'Eroare salvare date', 0, false, 0);
                    this.isSaved = true;
                }
            });
        }
      }

    public saveCheckOrder() {
         this.orderStock.stockMaterialUpdates = new Array<number>();
        // this.order.orderMaterialUpdates = new Array<OrderMaterialUpdate>();
        if (this.orderType != null && this.orderType.code === 'C-IT') {
                // this.order.orderMaterialUpdates.push(new OrderMaterialUpdate(0, this.quantityIT, this.valueIT, this.valueIT, this.sumOfTotal, this.sumOfTotal, 0));
                // this.offerITMaterialList.items.filter(a => a.quantity > 0).forEach(element => {
                //     this.order.orderMaterialUpdates.push(new OrderMaterialUpdate(element.id, element.quantity, element.price, element.priceRon, (element.quantity * element.price), (element.quantity * element.priceRon), element.preAmount));
                // });
                // this.stockList.items.filter(a => a.quantity > 0 && a.validated === false).forEach(element => {
                //     this.order.orderMaterialUpdates.push(new StockMaterialUpdate(element.id, element.quantity, element.value, element.value, (element.quantity * element.value), (element.quantity * element.value), element.preAmount));
                // });
                this.stockList.items.forEach(element => {
                  this.orderStock.stockMaterialUpdates.push(element.id);
              });
                this.isSaved = false;
                // this.orderStock.offerId = this.offer != null ? this.offer.id : null;
                 // this.order.budgetBaseId = this.budgetBase != null ? this.budgetBase.id : null;
                // this.order.budgetForecastId = this.budgetForecast != null ? this.budgetForecast.id : null;
                this.orderStock.orderTypeId = this.orderType != null ? this.orderType.id : null;
                this.orderStock.plantInitialId = this.plantInitial != null ? this.plantInitial.id : null;
                this.orderStock.plantFinalId = this.plantFinal != null ? this.plantFinal.id : null;
                //this.orderStock.categoryId = this.subCategory != null && this.subCategory.category != null ? this.subCategory.category.id : null;
                // this.order.needBudgetAmount = this.needBudgetAmount;
                // this.order.contractId = this.contract != null ? this.contract.id : null;
                // this.orderStock.sumOfTotalInOtherCurrency = this.sumOfTotalInOtherCurrency;
                // this.orderStock.startAccMonthId = this.startAccMonth != null ? this.startAccMonth.id : null;
                this.orderStock.validated = true;
                this.orderCheck = true;
                this.blocked = true;
                this.orderHttpService.addNewOrderCheck(this.orderStock)
                .subscribe((result: CreateAssetSAPResult) => {
                    // if (assetId > 0) {
                    //     if (assetId === 1) {
                    //         this.notificationService.showInfo('Comanda nu a fost plasata. Valoare comenzii depaseste valoarea disponibila!', 'Adaugare comanda noua');
                    //     } else {
                    //         this.notificationService.showSuccess('Comanda a fost plasat cu success', 'Adaugare comanda noua');
                    //     }
                    //     this.router.navigate(['/procurement/order']);
                    //     this.id = assetId;
                    // } else {
                    //     this.notificationService.showError('Eroare plasare comanda', 'Adaugare comanda noua');
                    // }
                    this.orderCheck = false;
                    this.blocked = false;
                    if (result.success) {
                      this.notificationService.showSuccess('Datele au fost verificate!', 'Verificare date', 3000, true, 3000);
                      this.stockList.refresh(null);
                      // this.router.navigate(['/procurement/order']);
                  } else if (!result.success) {
                      this.notificationService.showError('Motiv: ' + result.errorMessage + '!', 'Eroare Verificare date', 0, false, 0);
                  }
              });
          }
        }

    public onConfirmationApproved() {

        switch (this.operationType) {
            case OperationType.AssetValidation:
                this.validateBudget();
                break;
            case OperationType.Delete:
                this.deleteAsset();
                break;
            case OperationType.ProcessAssetOp:
                this.processAssetOp();
                break;
            case OperationType.DeleteOfferMaterial:
                this.onDeleteOfferMaterial();
                break;
                case OperationType.DeleteRequestBudgetForecastMaterial:
                  this.deleteRequestBudgetForecastMaterial();
                  break;
            default:
                break;
        }

        this.operationType = OperationType.NotSet;
        this.confirmationModal.hide();
    }

    public onConfirmationCanceled() {
        this.operationType = OperationType.NotSet;
        this.confirmationModal.hide();
    }

    public onAssetOpDetailListSelectionChanged(assetOpDetails: Array<any>) {
        this.selectedAssetOp = this.orderOpList.selectedItem;
    }

    public onEntityFileListSelectionChanged(entityFiles: Array<EntityFile>) {
        this.entityFile = ((entityFiles != null) && (entityFiles.length === 1)) ? entityFiles[0] : null;
    }

    public showReport() {
        let reportType = '';
        let validReport = false;

        if (this.selectedAssetOp != null) {
           console.log('TIP DOCUMENT: ', this.selectedAssetOp.documentType.code);
            // switch(this.selectedAssetOp.documentTypeCode) {
                switch (this.selectedAssetOp.documentType.code) {
                case AppConfig.DOCUMENT_TYPE_TRANSFER:
                    reportType = 'movementproviding';
                    validReport = true;
                    break;
                case AppConfig.DOCUMENT_TYPE_CASS:
                    reportType = 'annulement';
                    validReport = true;
                    break;
                case AppConfig.DOCUMENT_TYPE_INVENTORY:
                    reportType = 'movementproviding';
                    validReport = true;
                    break;
                default:
                    break;
            }

            if (validReport) {
                // window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.documentId}`);
               console.log(this.selectedAssetOp);
                if (AppConfig.DOCUMENT_TYPE_INVENTORY) {
                    window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}&assetOpId=${this.selectedAssetOp.id}`);
                } else {
                    window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}`);
                }
            }
        }
    }

    // public parseDate(dateString: string): Date {
    //     if (dateString) {
    //         return new Date(dateString);
    //     } else {
    //         return null;
    //     }
    // }

    public parseDate(dateString: any): Date {
        if (dateString.value) {
            return new Date(dateString.value);
        } else {
            return null;
        }
    }


    public onProcessAssetOp() {
        this.operationType = OperationType.ProcessAssetOp;
        this.confirmationMessage = 'Procesati operatia selectata?';
        this.confirmationModal.show();
    }

    public processAssetOp() {
        this.orderOpHttpService.process(this.orderOpList.selectedItem.id).subscribe((data) => {
            // this.refreshAssetOperations();
        });
    }

    public onChangeQuantity(event: any): void {
      // this.isInvalidQuantity = this.order.quantity > this.quantityRemBudget;
      this.order.valueIni = this.order.price * this.order.quantity;
      this.onChangeValue(event);
  }

  public onChangeValue(event: any): void {
    this.order.valueIni = this.order.price * this.order.quantity;
    // this.isInvalidValue = this.order.valueIni > this.valueRemBudget;
}

public onChangePrice(event: any): void {
// alert(this.order.price * this.order.quantity);
  this.order.valueIni = this.order.price * this.order.quantity;
  this.onChangeValue(event);
}

/* MATERIAL */

public selectMaterial() {
    this.materialListModal.show();
    const params: Array<Param> = Array<Param>();
    params.push(new Param('exceptMaterialIds', AppUtils.getIdsList<CodeNameEntity, number>(this.selectedMaterials())));
    params.push(new Param('hasSubCategory', 'true'));
    this.materialList.refresh(params);
}

public selectRequestBudgetForecastMaterial() {
  const params: Array<Param> = Array<Param>();
  // this.offerMaterialList.items.forEach(element => {
  //   console.log(JSON.stringify(element));
  //   params.push(new Param('materialIds', AppUtils.getIdsList<Material, number>(element.material)));
  // });
  let matIds = '';
  this.materials.forEach(element => {
    if(matIds === ''){
      matIds = matIds + element.id;
    } else {
      matIds = matIds + ',' + element.id;
    }

  });

  params.push(new Param('materialIds', matIds));
  params.push(new Param('exceptMaterialIds', AppUtils.getIdsList<CodeNameEntity, number>(this.selectedRequestBudgetForecastMaterials())));
  params.push(new Param('hasSubCategory', 'true'));
  this.materialList.refresh(params);
  this.materialListModal.show();
}

private selectedMaterials(): Array<CodeNameEntity> {
    const mappedMaterials: Array<CodeNameEntity> = new Array<CodeNameEntity>();

    if (this.offerITMaterialList.items.length > 0) {
        this.offerITMaterialList.items.forEach(element => {
            mappedMaterials.push(element.material);
        });
    }
    return mappedMaterials;
}

private selectedRequestBudgetForecastMaterials(): Array<CodeNameEntity> {
  const mappedMaterials: Array<CodeNameEntity> = new Array<CodeNameEntity>();

  if (this.requestBudgetForecastMaterialList.items.length > 0) {
      this.requestBudgetForecastMaterialList.items.forEach(element => {
          mappedMaterials.push(element.material);
      });
  }
  return mappedMaterials;
}


// public setSelectedMaterial() {
//     const items: Array<any> = this.materialList.selectedItems;
//     this.material = ((items != null) && (items.length === 1)) ? items[0] : null;
//     this.materialListModal.hide();

//     const aIds: number[] = new Array<number>();
//     const materialsIds: OfferITMaterialAdd = new OfferITMaterialAdd();
//     items.forEach(item => {
//         const index: number = aIds.indexOf(item.id);
//         if (index < 0) { aIds.push(item.id); }
//     });

//     materialsIds.materialIds = aIds;
//     materialsIds.offerId =  this.offer != null ? this.offer.id : 0;
//     materialsIds.emailManagerId = 0;
//     materialsIds.rateId = this.rate.id;
//     materialsIds.guid = this.guid;

//     this.offerMaterialHttpService.addMaterialByOrder(materialsIds).subscribe( (res) => {
//             if (res.statusCode === 200) {
//                 this.notificationService.showSuccess('Datele au fost salvate cu success!', 'Adauga mapare material', 0, false, 0);
//                 this.materialList.refresh(null);

//                 const params: Array<Param> = new Array<Param>();
//                 params.push(new Param('offerIds', AppUtils.getIdsList<Offer, number>([ this.offer != null ? this.offer : null ])));
//                 params.push(new Param('guid', this.guid));
//                 this.offerITMaterialList.refresh(params);
//                 this.materialList.selectedItems = new Array<Material>();
//             } else if (res.statusCode === 404) {
//                 this.notificationService.showError('Nu exista', 'Adauga materiale', 0, false, 0);
//                 this.materialList.selectedItems = new Array<Material>();
//             }
//     }, (error) => {
//         this.notificationService.showError('Eroare salvare!', 'Adauga mapare material', 0, false, 0);
//         this.materialList.selectedItems = new Array<Material>();
//     });
// }

public setSelectedMaterial() {
  const items: Array<any> = this.materialList.selectedItems;
  this.material = ((items != null) && (items.length === 1)) ? items[0] : null;
  this.materialListModal.hide();

  const aIds: number[] = new Array<number>();
  const materialsIds: RequestBudgetForecastMaterialAdd = new RequestBudgetForecastMaterialAdd();
  items.forEach(item => {
      const index: number = aIds.indexOf(item.id);
      if (index < 0) { aIds.push(item.id); }
  });

  materialsIds.materialIds = aIds;
  materialsIds.offerId = this.offer != null ? this.offer.id : 0;
  materialsIds.requestBudgetForecastId = this.requestBudgetForecastList.selectedItem != null ? this.requestBudgetForecastList.selectedItem.id : 0;

  this.requestBudgetForecastMaterialHttpService.addMaterialByRequestBudgetForecast(materialsIds).subscribe( (res) => {
          if (res.statusCode === 200) {
              this.notificationService.showSuccess('Datele au fost salvate cu success!', 'Adauga mapare material', 0, false, 0);
              this.materialList.refresh(null);

              const params: Array<Param> = new Array<Param>();
              params.push(new Param('requestBudgetForecastIds', AppUtils.getIdsList<RequestBudgetForecast, number>([
                this.requestBudgetForecastList.selectedItem != null ? this.requestBudgetForecastList.selectedItem : null ])));
              this.requestBudgetForecastMaterialList.refresh(params);
              this.requestBudgetForecastList.refresh(null);
              this.materialList.selectedItems = new Array<Material>();
          } else if (res.statusCode === 404) {
              this.notificationService.showError('Nu exista', 'Adauga materiale', 0, false, 0);
              this.materialList.selectedItems = new Array<Material>();
          }
  }, (error) => {
      this.notificationService.showError('Eroare salvare!', 'Adauga mapare material', 0, false, 0);
      this.materialList.selectedItems = new Array<Material>();
  });
}



public closeMaterial() {
    this.materialList.selectedItems = new Array<Material>();
    this.materialListModal.hide();
}

/* MATERIAL */


public onDeleteOfferMaterial() {
    this.operationType = OperationType.DeleteOfferMaterial;
    this.confirmationMessage = 'Esti sigur?';
    this.confirmationModal.show();
}

public onDeleteRequestBudgetForecastMaterial() {
  this.operationType = OperationType.DeleteRequestBudgetForecastMaterial;
  this.confirmationMessage = 'Esti sigur?';
  this.confirmationModal.show();
}

// updateTotal(item) {
//     if (item) {
//        this.sumOfNumber += item.value;
//     } else {
//        this.sumOfNumber -= item.value;
//     }
//     this.forma.get('precioFinal').setValue(this.sumOfNumber);
//  }

// public saveValidated() {

//     this.assetToUpdate = new Array<OfferMaterialUpdate>();

//     this.offerMaterialList.TableItems.forEach(element => {
//         this.assetToUpdate.push(new OfferMaterialUpdate(element.item.id, element.item.quantity, element.item.price));
//     });
//     this.emailManagerHttpService.orderMaterialUpdate(this.assetToUpdate).subscribe((res) => {

//         if (res) {
//             this.notificationService.showSuccess('', 'Actualizare modificari');
//         } else {
//             this.notificationService.showError('', 'Eroare salvare date!');
//         }
//         this.offerMaterialList.refresh(null);
//     }, (error) => {
//         this.notificationService.showError('', 'Eroare server!', 0, false, 0);
//     });
// }

//   getCurrency(currency: string): Observable<boolean> {
//     const resultSubject = new Subject<boolean>();
//     this.rateHttpService.getCurrency(currency).subscribe( (res: Rate) => {
//         this.contractCurrency = res;
//         resultSubject.next(true);
//     }, () => { resultSubject.next(false); }, () => { });

//     return resultSubject.asObservable();
//   }

    needContract() {
        this.needContractAmount = true;
    }

    // needBudget() {
    //     this.needBudgetAmount = true;
    // }

     /*begin STARTACCMONTH */

 public selectStartAccMonth() {

    this.startAccMonthList.refresh(null);
    this.startAccMonthListModal.show();
}
public setSelectedStartAccMonth() {
    const items: Array<AccMonth> = this.startAccMonthList.selectedItems;
    this.startAccMonth = ((items != null) && (items.length === 1)) ? items[0] : null;
    this.startAccMonthListModal.hide();
}

/*end APPSTATE */

quantityChange(value) {
    this.quantityIT = 0;
    this.sumOfQuantity = 0;
    this.quantityIT = value;
    this.sumOfQuantity = this.precise_round(this.quantityIT, 2);
    this.sumOfTotal = this.precise_round((this.sumOfQuantity * this.valueIT), 2);
}

valueChange(value) {
    this.valueIT = 0;
    this.sumOfTotal = 0;
    this.valueIT = value;
    this.sumOfTotal = this.precise_round((this.sumOfQuantity * this.valueIT), 2);
}

precise_round(num, decimals) {
    const t = Math.pow(10, decimals);
    return (Math.round((num * t) + (decimals > 0 ? 1 : 0 ) * (Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals);
 }

 public get valueOK(): boolean {
     return this.order.name != null && this.order.name.trim().length > 5 && this.sumOfQuantity > 0 && this.sumOfTotal > 0;
 }

 /* BEGIN RATE  */
 public selectRate() {

    const params: Array<Param> = new Array<Param>();
    params.push(new Param('showLast', 'true'));

    this.rateList.refresh(params);
    this.rateListModal.show();
}
public setSelectedRate() {
    const items: Array<Rate> = this.rateList.selectedItems;
    this.rate = ((items != null) && (items.length === 1)) ? items[0] : null;
    this.rateListModal.hide();
}
/* END RATE  */

public saveValidated() {

    this.assetToUpdate = new Array<OfferITMaterialUpdate>();

    this.offerITMaterialList.TableItems.forEach(element => {
        this.assetToUpdate.push(new OfferITMaterialUpdate(element.item.id, element.item.quantity, element.item.price, element.item.wip, this.guid));
    });
    this.emailManagerHttpService.offerITMaterialUpdate(this.assetToUpdate).subscribe((res) => {

        if (res) {
            this.notificationService.showSuccess('', 'Actualizare modificari', 0, false, 0);
        } else {
            this.notificationService.showError('', 'Eroare salvare date!', 0, false, 0);
        }
        this.offerITMaterialList.refresh(null);
    }, (error) => {
        this.notificationService.showError('', 'Eroare server!', 0, false, 0);
    });
}

public onOfferMaterialListSelectionChanged(offerMaterials: Array<any>) {
    this.selectedOfferMaterial = new Array<any>();
    offerMaterials.forEach((asset: any) => {
        this.selectedOfferMaterial.push(asset);
    });

    this.sumOfQuantity = 0;
    this.sumOfTotal = 0;

    this.offerITMaterialList.items.forEach(offer => {
        this.sumOfQuantity = +offer.quantity + this.sumOfQuantity;
        this.sumOfTotal = +(offer.priceRon * offer.quantity) + this.sumOfTotal;
    });
}

public clearFilters() {
    const params: Array<Param> = new Array<Param>();
    params.push(new Param('offerIds', AppUtils.getIdsList<Offer, number>([ this.offer != null ? this.offer : null ])));
    params.push(new Param('guid', this.guid));
    this.offerITMaterialList.refresh(params);

   // this.subCategory = null;
    //this.category = null;
    this.plantFinal = null;
    this.plantInitial = null;
}

public onStockListSelectionChanged(assetOpDetails: Array<any>) {
    this.stock = this.stockList.selectedItem != null ? this.stockList.selectedItem : null;

    this.sumOfQuantity = 0;
    this.sumOfTotal = 0;
    this.stockList.items.forEach(stock => {
        this.sumOfQuantity = +stock.quantity + this.sumOfQuantity;
        this.sumOfTotal = +(stock.value * stock.quantity) + this.sumOfTotal;
    });
}

// public get checkREQBGFQuantity(): boolean {
//   return this.sumOfQuantityRequestBGF > this.sumOfQuantity;
// }

// show() {
//   this.ref = this.dialogService.open(MaterialListOrder, {
//       header: 'Choose a Product',
//       width: '70%',
//       contentStyle: {"max-height": "500px", "overflow": "auto"},
//       baseZIndex: 10000,
//       data: { item: this.materials }
//   });

//   this.ref.onClose.subscribe((product: Material[]) =>{
//       // if (product) {
//       //     // this.messageService.add({severity:'info', summary: 'Product Selected', detail: product.name});
//       // }
//   });
// }

ngOnDestroy() {
  if (this.ref) {
      this.ref.close();
  }
}
public mappingFinished() {
  this.requestBudgetForecastMaterialList.refresh(null);
}

public saveMaterialValidated() {

  this.requestBFMUpdate = new Array<RequestBudgetForecastMaterialUpdate>();

  this.requestBudgetForecastMaterialList.items.forEach(element => {
    // console.log(JSON.stringify(element));
      this.requestBFMUpdate.push(new RequestBudgetForecastMaterialUpdate(element.id, element.quantity, element.valueRon));
  });
  this.requestBudgetForecastMaterialHttpService.requestBudgetForecastMaterialUpdate(this.requestBFMUpdate).subscribe((res) => {

      if (res.success) {
          this.notificationService.showSuccess(res.message, 'Actualizare modificari', 0, false, 0);
          this.requestBudgetForecastMaterialList.refresh(null);
          this.requestBudgetForecastList.refresh(null);


      const requestFilter: RequestFilter = new RequestFilter();

      let selectedRequestBudgetForecastMaterialAlls = new Array<any>();
      this.requestBudgetForecastMaterialAllList.selectedItems = selectedRequestBudgetForecastMaterialAlls;

    if (this.requestBudgetForecastList != null) {
      let params: Array<Param> = new Array<Param>();
      requestFilter.requestBudgetForecastIds = new Array<number>();
      this.requestBudgetForecastList.items.forEach((requestBGF) => {
          requestFilter.requestBudgetForecastIds.push(requestBGF.id);
      });

      params.push(new Param('jsonFilter', JSON.stringify(requestFilter)));
      this.requestBudgetForecastMaterialAllList.refresh(params);
  }

      } else {
          this.notificationService.showError(res.message, 'Eroare salvare date!', 0, false, 0);
          this.requestBudgetForecastMaterialList.refresh(null);
          this.requestBudgetForecastList.refresh(null);
      }
  }, (error) => {
      this.notificationService.showError('', 'Eroare server!', 0, false, 0);
      this.requestBudgetForecastMaterialList.refresh(null);
      this.requestBudgetForecastList.refresh(null);
  });
}


public saveAssetParent() {
  let assetParent = this.assetEntity != null ? this.assetEntity.id : null;
  this.requestBFMAssetParent = new Array<RequestBudgetForecastMaterialUpdateAssetParent>();

  this.requestBudgetForecastMaterialList.selectedItems.forEach(element => {
    // console.log(JSON.stringify(element));
      this.requestBFMAssetParent.push(new RequestBudgetForecastMaterialUpdateAssetParent(element.id, assetParent));
  });
  this.requestBudgetForecastMaterialHttpService.requestBFMAssetParent(this.requestBFMAssetParent).subscribe((res) => {

      if (res.success) {
          this.notificationService.showSuccess(res.message, 'Actualizare modificari', 2000, false, 0);
          this.requestBudgetForecastMaterialList.refresh(null);
          this.requestBudgetForecastList.refresh(null);


      const requestFilter: RequestFilter = new RequestFilter();

      let selectedRequestBudgetForecastMaterialAlls = new Array<any>();
      this.requestBudgetForecastMaterialAllList.selectedItems = selectedRequestBudgetForecastMaterialAlls;

    if (this.requestBudgetForecastList != null) {
      let params: Array<Param> = new Array<Param>();
      requestFilter.requestBudgetForecastIds = new Array<number>();
      this.requestBudgetForecastList.items.forEach((requestBGF) => {
          requestFilter.requestBudgetForecastIds.push(requestBGF.id);
      });

      params.push(new Param('jsonFilter', JSON.stringify(requestFilter)));
      this.requestBudgetForecastMaterialAllList.refresh(params);
  }

      } else {
          this.notificationService.showError(res.message, 'Eroare salvare date!', 0, false, 0);
          this.requestBudgetForecastMaterialList.refresh(null);
          this.requestBudgetForecastList.refresh(null);
      }
  }, (error) => {
      this.notificationService.showError('', 'Eroare server!', 0, false, 0);
      this.requestBudgetForecastMaterialList.refresh(null);
      this.requestBudgetForecastList.refresh(null);
  });
}

public deleteRequestBudgetForecastMaterial() {
  this.requestBudgetForecastMaterialHttpService.deleteMaterialByRequestBudgetForecast(this.requestBudgetForecastMaterialList.selectedItem.id)
  .subscribe((res) => {
      if (res.statusCode === 200) {
          this.notificationService.showSuccess('Operatia a fost finalizata cu success!', 'Stergere produs din oferta', 2000, false, 0);
          this.requestBudgetForecastList.refresh(null);
          this.requestBudgetForecastMaterialList.refresh(null);

          const requestFilter: RequestFilter = new RequestFilter();

          let selectedRequestBudgetForecastMaterialAlls = new Array<any>();
          this.requestBudgetForecastMaterialAllList.selectedItems = selectedRequestBudgetForecastMaterialAlls;

          if (this.requestBudgetForecastList != null) {
            let params: Array<Param> = new Array<Param>();
            requestFilter.requestBudgetForecastIds = new Array<number>();
            this.requestBudgetForecastList.items.forEach((requestBGF) => {
                requestFilter.requestBudgetForecastIds.push(requestBGF.id);
            });

            params.push(new Param('jsonFilter', JSON.stringify(requestFilter)));
            this.requestBudgetForecastMaterialAllList.refresh(params);
        }

      } else if (res.statusCode === 404) {
          this.notificationService.showError('Eroare salvare', 'Stergere produs din oferta', 0, false, 0);
      }
  }, (error) => {
      this.notificationService.showError('Eroare server', 'Stergere produs din oferta', 0, false, 0);
  });
}

public get allowRequestBudgetForecastSaving(): boolean {
// console.log(this.requestBudgetForecastList?.items.length);

if(this.requestBudgetForecastList != null && this.requestBudgetForecastList.items.length > 0 &&
  (this.offer != null && this.offer.offerType != null && this.offer.offerType.code !== 'O-V' ? this.requestBudgetForecastList.items[0].maxQuantity < this.requestBudgetForecastList.items[0].totalOrderQuantity : this.requestBudgetForecastList.items[0].maxValueRon < this.requestBudgetForecastList.items[0].totalOrderValueRon)){
  return false;
} else {
  return true;
}

  // this.requestBudgetForecastList?.items.forEach(element => {
  //   if(element.needContract || element.needBuget){
  //     errorCount++;
  //   } else {
  //     okCount++;
  //   }
  // });
  // if(errorCount > 0){
  //   return false;
  // } else {
  //   if(okCount > 0){
  //     return true;
  //   } else {
  //     return false;
  //   }
  //}
}

public get allowRequestBudgetForecastNeedBudgetSaving(): boolean {
  let countNeedBudget = 0;
  if(this.requestBudgetForecastList != null && this.requestBudgetForecastList.items.length > 0){
    // console.log(JSON.stringify(this.requestBudgetForecastList.items));
    countNeedBudget = this.requestBudgetForecastList.items.filter(a => a.needBudget).length;
    //console.log(countNeedBudget);
    if(countNeedBudget > 0){
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

public get allowRequestBudgetForecastNeedContractSaving(): boolean {
  let countNeedContract = 0;
  if(this.requestBudgetForecastList != null && this.requestBudgetForecastList.items.length > 0){
    // console.log(JSON.stringify(this.requestBudgetForecastList.items));
    countNeedContract = this.requestBudgetForecastList.items.filter(a => a.needContract).length;
    // console.log(countNeedContract);
    if(countNeedContract > 0){
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

public get stockErrors(): boolean {
  let countStockErrors = 0;
  if(this.stockList != null && this.stockList.items.length > 0){
    // console.log(JSON.stringify(this.requestBudgetForecastList.items));
    countStockErrors = this.stockList.items.filter(a => !a.validated).length;
    // console.log(countStockErrors);
    if(countStockErrors > 0){
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

public get missingContract(): boolean {
  let countMissingContract = 0;
  if(this.orderType != null && this.orderType.code != 'C-LC' && this.requestBudgetForecastList != null && this.requestBudgetForecastList.items.length > 0){
    // console.log(JSON.stringify(this.requestBudgetForecastList.items));
    countMissingContract = this.requestBudgetForecastList.items.filter(a => a.contract == null).length;
    //console.log(countMissingContract);
    if(countMissingContract > 0){
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

public get sumMaterials(): boolean {
  let sum = 0;
  if(this.requestBudgetForecastList != null && this.requestBudgetForecastList.items.length > 0){
    // console.log(JSON.stringify(this.requestBudgetForecastList.items));
    sum = this.requestBudgetForecastList.items.reduce((sum, current) => sum + current.quantity, 0);
    //console.log(sum);
    if(sum == 0){
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

public get sumMaxMaterials(): boolean {
  let error = 0;
  let result = [];
  if(this.requestBudgetForecastMaterialAllList != null && this.requestBudgetForecastMaterialAllList.items.length > 0){
    this.requestBudgetForecastMaterialAllList.items.reduce(function(res, value) {
      if (!res[value.material.id]) {
        res[value.material.id] = { materialId: value.material.id, quantity: 0, maxQuantity: 0, valueRon: 0, maxValueRon: 0, offerTypeId: 0 };
        result.push(res[value.material.id])
      }
      res[value.material.id].quantity += value.quantity;
      res[value.material.id].maxQuantity = value.maxQuantity;
      res[value.material.id].valueRon += value.valueRon;
      res[value.material.id].maxValueRon = value.maxValueRon;
      res[value.material.id].offerTypeId = value.offerType.id;
      return res;
    }, {});

    for (let index = 0; index < result.length; index++) {
      const element = result[index];
      if(element.offerTypeId == 3){
        if(element.valueRon > element.maxValueRon){
          error++;
        }
      } else {
        if(element.quantity > element.maxQuantity){
          error++;
        }
      }
    }
    // console.log(JSON.stringify(result));
    // console.log(error);
    if(error > 0){
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

      /* BEGIN PLANT INITIAL  */

      public selectPlantInitial() {

        this.plantInitialList.refresh(null);
        this.plantInitialListModal.show();
    }

    public setSelectedPlantInitial() {
        this.stockList.refresh(null);
        const items: Array<Plant> = this.plantInitialList.selectedItems;
        this.plantInitial = ((items != null) && (items.length === 1)) ? items[0] : null;

        const params = new Array<Param>();
        params.push(new Param('plantInitialIds', AppUtils.getIdsList<CodeNameEntity, number>([ this.plantInitial != null ? this.plantInitial : null ])));
        this.stockList.refresh(params);
        this.plantInitialListModal.hide();
    }

    /* END INITIAL  */

          /* BEGIN PLANT FINAL */

          public selectPlantFinal() {

            this.plantFinalList.refresh(null);
            this.plantFinalListModal.show();
        }

        public setSelectedPlantFinal(value) {
            // this.stockList.refresh(null);
            // const items: Array<Plant> = this.plantFinalList.selectedItems;
            const items: Array<Plant> = value;
            this.plantFinal = ((items != null) && (items.length === 1)) ? items[0] : null;

            const params = new Array<Param>();
            params.push(new Param('plantActualIds', AppUtils.getIdsList<CodeNameEntity, number>([ this.plantFinal != null ? this.plantFinal : null ])));
            this.stockList.refresh(params);
            this.plantFinalListModal.hide();
        }

        /* END FINAL  */

// getStockByCategoryID() {
//   this.showStock = false;
//    const categoryCode = this.subCategory != null && this.subCategory.category != null ? this.subCategory.category.code : 'NOCODE';
//    this.assetHttpService.getStockByCategoryID(categoryCode).subscribe( (res) => {
//       // console.log(JSON.stringify(res));
//       if (res) {
//           this.showStock = true;
//           const params = new Array<Param>();
//           params.push(new Param('categoryIds', AppUtils.getIdsList<CodeNameEntity, number>([ this.category != null  ? this.category : null ])));
//           params.push(new Param('showStock', this.showStock === true ? 'true' : 'false'));
//           this.stockList.refresh(params);
//       }
//    });
// }

 /*begin ASSETENTITY */
 public selectAssetEntity() {
  this.assetEntityList.refresh(null);
  this.assetEntityListModal.show();
}

public setSelectedAssetEntity() {
  const items: Array<AssetEntity> = this.assetEntityList.selectedItems;
  this.assetEntity = ((items != null) && (items.length === 1)) ? items[0] : null;
  this.assetEntityListModal.hide();
}

/*end ASSETENTITY */


}

enum OperationType {
    NotSet = 1,
    AssetValidation = 2,
    Delete = 3,
    ProcessAssetOp = 4,
    DeleteOfferMaterial = 5,
    DeleteRequestBudgetForecastMaterial = 6
}

class Guid {
    static newGuid() {
      return 'xxxxxxxx-xxxx-3xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  }

