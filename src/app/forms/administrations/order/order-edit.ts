import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Param } from '../../../model/common/param';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { PartnerHttpService } from '../../../services/http/documents/partner.http.service';
import { Employee } from '../../../model/api/administration/employee';
import { Partner } from '../../../model/api/documents/partner';
import { TypeList } from '../types/type.list';
import { SubTypeList } from '../sub-types/sub-type.list';
import { AccountList } from '../account/account.list';
import { AdministrationHttpService } from '../../../services/http/administration/administration.http.service';
import { CostCenterHttpService } from '../../../services/http/administration/cost-center.http.service';
import { MasterTypeHttpService } from '../../../services/http/assets/master-type.http.service';
import { TypeHttpService } from '../../../services/http/administration/type.http.service';
import { SubTypeHttpService } from '../../../services/http/administration/sub-type.http.service';
import { EntityFileHttpService } from '../../../services/http/common/entity-file.http.service';
import { AccMonthHttpService } from '../../../services/http/accounting/acc-month.http.service';
import { AccountHttpService } from '../../../services/http/administration/account.http.service';
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
import { InterCompanyListComponent } from '../../assets/inter-companies/inter-company.list';
import { EntityFileListComponent } from '../../common/entity-file.list';
import { EntityFile } from '../../../model/api/common/entity-file';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { MonthEntity } from '../../../model/api/common/month-entity';
import { CodePartnerEntity } from '../../../model/api/common/code-partner-entity';
import { AppData } from '../../../app-data';
import { ProjectHttpService } from '../../../services/http/assets/project.http.service';
import { CompanyHttpService } from '../../../services/http/assets/company.http.service';
import { InterCompanyHttpService } from '../../../services/http/assets/inter-company.http.service';
import { UomHttpService } from '../../../services/http/assets/uom.http.service';
import { MasterType } from '../../../model/api/assets/master-type';
import { Type } from '../../../model/api/administration/type';
import { SubType } from '../../../model/api/administration/sub-type';
import { Administration } from '../../../model/api/administration/administration';
import { Company } from '../../../model/api/assets/company';
import { Project } from '../../../model/api/assets/project';
import { InterCompany } from '../../../model/api/assets/inter-company';
import { AccMonth } from '../../../model/api/accounting/acc-month';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { Account } from '../../../model/api/administration/account';
import { Uom } from '../../../model/api/assets/uom';
import { AppConfig } from '../../../config';
import { NotificationService } from '../../../services/notification.service';
import { MaterialList } from '../materials/material.list';
import { MaterialHttpService } from '../../../services/http/administration/material.http.service';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators
 } from '@angular/forms';
import { EmailManagerHttpService } from '../../../services/http/administration/email-manager.http.service';
import { RateHttpService } from '../../../services/http/administration/rate.http.service';
import { RequestBudgetForecastSave, RequestSave } from '../../../model/api/administration/request-save';
import { RequestHttpService } from '../../../services/http/administration/request.http.service';
import { RequestOpHttpService } from '../../../services/http/administration/request-op.http.service';
import { RequestOpDetailList } from '../request-ops/request-op.detail.list';
import { BudgetFilter } from '../../../model/api/administration/budget.filter';
import { ProjectTypeDivisionHttpService } from '../../../services/http/administration/project-type-division.http.service';
import { ProjectTypeDivision } from '../../../model/api/administration/project-type-division';
import { ProjectTypeDivisionListComponent } from '../project-type-division/project-type-division.list';
import { BudgetBase } from '../../../model/api/budget/budget-base';
import { BudgetBaseListComponent } from '../budget-base/budget-base.list';
import { BudgetBaseHttpService } from '../../../services/http/administration/budget-base.http.service';
import { AssetType } from '../../../model/api/assets/asset-type';
import { AssetTypeListComponent } from '../../assets/asset-types/asset-type.list';
import { AssetTypeHttpService } from '../../../services/http/assets/asset-type.http.service';
import { Observable, Subject } from 'rxjs';
import { RequestFilter } from '../../../model/api/requests/request.filter';
import { NeedBudget } from '../../../model/api/administration/need-budget';
import { BudgetForecast, BudgetForecastView } from '../../../model/api/budget/budget-forecast';
import { BudgetForecastHttpService } from '../../../services/http/administration/budget-forecast.http.service';
import { BudgetForecastUIListComponent } from '../budget-forecast/budget-forecast.ui.list';
import { RequestResult } from '../../../model/api/result/request-result';
import { RequestBudgetForecastHttpService } from '../../../services/http/requests/request-budget-forecast.http.service';
import { RequestBudgetForecastListComponent } from '../request-budget-forecasts/request-budget-forecast.list';
import { RequestEdit } from '../../../model/api/administration/request-edit';
import { AppStateHttpService } from '../../../services/http/common/app-state.http.service';
import { EmployeeResource } from '../../../model/api/administration/employee-resource';
import { DashboardHttpService } from '../../../services/http/common/dashboard.http.service';
import { DivisionHttpService } from '../../../services/http/administration/division.http.service';
import { ProjectTypeHttpService } from '../../../services/http/assets/project-type.http.service';
import { RequestUpdate } from '../../../model/api/administration/request-update';
import { RequestDelete } from '../../../model/api/administration/request-delete';
import { AssetSimpleDetail } from '../../../model/api/assets/asset-simple-detail';
import { AppUtils } from '../../../common/app.utils';
import { OfferList } from '../offer/offer.list';
import { OfferHttpService } from '../../../services/http/administration/offer.http.service';
import { OfferMaterialHttpService } from '../../../services/http/administration/offer-material.http.service';
import { OfferMaterialListComponent } from '../offer-materials/offer-material.list';
import { OrderHttpService } from '../../../services/http/administration/order.http.service';
import { OrderList } from '../order/order.list';
import { AssetListComponent } from '../../assets/assets/asset.list';
import { AssetHttpService } from '../../../services/http/assets/asset.http.service';
import {TreeNode, MessageService} from 'primeng/api';
import { MatrixHttpService } from '../../../services/http/administration/matrix.http.service';
import { MatrixTree } from '../../../model/api/matrix/matrix-tree';
import { OrderEdit } from '../../../model/api/order/order-edit';
import { RequestList } from '../request/request.list';
import { OrderDelete } from '../../../model/api/order/order-delete';
import { OrderUpdate } from '../../../model/api/order/order-update';
import { OrderBudgetForecastUpdate } from '../../../model/api/order/order-budget-forecast-update';
import { RequestBudgetForecast } from '../../../model/api/requests/request-budget-forecast';
import { BudgetForecastListComponent } from '../budget-forecast/budget-forecast.list';
import { RequestBudgetForecastMaterialHttpService } from '../../../services/http/requests/request-budget-forecast-material.http.service';
import { RequestBudgetForecastMaterialListComponent } from '../request-budget-forecast-materials/request-budget-forecast-material.list';
import { RequestBudgetForecastMaterialCostCenterListComponent } from '../request-budget-forecast-material-cost-centers/request-budget-forecast-material-cost-center.list';
import { RequestBudgetForecastMaterialCostCenterHttpService } from '../../../services/http/requests/request-budget-forecast-material-cost-center.http.service';
import { RequestBudgetForecastMaterialCostCenterStorno } from '../../../model/api/requests/request-budget-forecast-material-cost-center-storno';
import { MatDialog } from '@angular/material/dialog';
import { UploadStornoModalComponent } from '../../common/upload-storno-modal.component';
import { UploadModalComponent } from '../../common/upload-modal.component';
import { UploadPreReceptionModalComponent } from '../../common/upload-pre-reception-modal.component';
import { Request } from '../../../model/api/administration/request';
import { RequestBudgetForecastMaterial } from '../../../model/api/requests/request-budget-forecast-material';
import { RequestBFMaterialCostCenterAdd } from '../../../model/api/requests/request-budget-forecast-material-cost-center-add';
import { Material } from '../../../model/api/administration/material';
import { RequestBudgetForecastMaterialCostCenterUpdate } from '../../../model/api/requests/request-budget-forecast-material-cost-center-update';
import { RequestBudgetForecastMaterialCostCenterMultiple } from '../../../model/api/requests/request-budget-forecast-material-cost-center-multiple';
import { RequestBFMaterialEmployeeUpdate } from '../../../model/api/requests/request-budget-forecast-material-employee-update';
import { AddAsset } from '../../../model/api/assets/add-asset';
import { CreateAssetSAPResult } from '../../../model/api/result/create-asset-SAP-result';

@Component({
    selector: 'app-order-edit',
    templateUrl: 'order-edit.html',
    styleUrls: ['order-edit.scss'],
    providers: [
        AdministrationHttpService,
        CostCenterHttpService,
        MasterTypeHttpService,
        TypeHttpService,
        SubTypeHttpService,
        EntityFileHttpService,
        EmployeeHttpService,
        AccMonthHttpService,
        AccountHttpService,
        RequestOpHttpService,
        ProjectTypeDivisionHttpService,
        PartnerHttpService ]
})
export class OrderEditComponent implements OnInit, AfterViewInit  {

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

    @ViewChild('accountList') public accountList: AccountList;
    @ViewChild('accountListModal') public accountListModal: ModalDirective;

    // @ViewChild('costCenterList') public costCenterList: CostCenterListComponent;
    // @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;

    @ViewChild('assetTypeList') public assetTypeList: AssetTypeListComponent;
    @ViewChild('assetTypeListModal') public assetTypeListModal: ModalDirective;

    @ViewChild('projectTypeDivisionList') public projectTypeDivisionList: ProjectTypeDivisionListComponent;
    @ViewChild('projectTypeDivisionListModal') public projectTypeDivisionListModal: ModalDirective;

    @ViewChild('administrationList') public administrationList: AdministrationListComponent;
    @ViewChild('administrationListModal') public administrationListModal: ModalDirective;

    @ViewChild('companyList') public companyList: CompanyListComponent;
    @ViewChild('companyListModal') public companyListModal: ModalDirective;

    // @ViewChild('budgetBaseList') public budgetBaseList: BudgetBaseListComponent;
    // @ViewChild('budgetBaseListModal') public budgetBaseListModal: ModalDirective;

    @ViewChild('budgetForecastList') public budgetForecastList: BudgetForecastListComponent;
    @ViewChild('budgetForecastListModal') public budgetForecastListModal: ModalDirective;

    @ViewChild('projectList') public projectList: ProjectList;
    @ViewChild('projectListModal') public projectListModal: ModalDirective;

    @ViewChild('interCompanyList') public interCompanyList: InterCompanyListComponent;
    @ViewChild('interCompanyListModal') public interCompanyListModal: ModalDirective;

    @ViewChild('requestOpDetailList') public requestOpList: RequestOpDetailList;
    @ViewChild('entityFileList') public entityFileList: EntityFileListComponent;

    @ViewChild('materialListModal') public materialListModal: ModalDirective;
    @ViewChild('materialList') public materialList: MaterialList;

    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
    @ViewChild('fileInput') fileInput;

    @ViewChild('startAccMonthList') public startAccMonthList: AccMonthListComponent;
    @ViewChild('startAccMonthListModal') public startAccMonthListModal: ModalDirective;

    @ViewChild('requestBudgetForecastList') public requestBudgetForecastList: RequestBudgetForecastListComponent;
    @ViewChild('requestBudgetForecastListModal') public requestBudgetForecastListModal: ModalDirective;
    @ViewChild('requestBFMaterialCostCenterList') public requestBFMaterialCostCenterList: RequestBudgetForecastMaterialCostCenterListComponent;

    @ViewChild('offerList') public offerList: OfferList;
    @ViewChild('offerMaterialList') public offerMaterialList: OfferMaterialListComponent;
    @ViewChild('orderList') public orderList: OrderList;
    @ViewChild('assetReceptionList') public assetReceptionList: AssetListComponent;
    @ViewChild('assetList') public assetList: AssetListComponent;
    @ViewChild('requestList') public requestList: RequestList;

    // PRERECEPTIE //

    @ViewChild('requestPreReceptionBudgetForecastList') public requestPreReceptionBudgetForecastList: RequestBudgetForecastListComponent;
    @ViewChild('requestBFMaterialCostCenterAllList') public requestBFMaterialCostCenterAllList: RequestBudgetForecastMaterialCostCenterListComponent;
    @ViewChild('requestPreReceptionBudgetForecastMaterialList') public requestPreReceptionBudgetForecastMaterialList: RequestBudgetForecastMaterialListComponent;
    @ViewChild('requestPreReceptionBFMaterialCostCenterList') public requestPreReceptionBFMaterialCostCenterList: RequestBudgetForecastMaterialCostCenterListComponent;
    @ViewChild('costCenterReceptionList') public costCenterReceptionList: CostCenterListComponent;
    @ViewChild('costCenterReceptionListModal') public costCenterReceptionListModal: ModalDirective;

    @ViewChild('employeeReceptionList') public employeeReceptionList: EmployeeListComponent;
    @ViewChild('employeeReceptionListModal') public employeeReceptionListModal: ModalDirective;


    // PRERECEPTIE //

    public projectTypeDivisions = new Array<ProjectTypeDivision>();
    public selectedprojectTypeDivisions: Array<ProjectTypeDivision> = new Array<ProjectTypeDivision>();
    public selectedRequestBudgetForecasts: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
    appStates: CodeNameEntity[] = new Array<CodeNameEntity>();
    owners: EmployeeResource[] = new Array<EmployeeResource>();
    divisions: CodeNameEntity[] = new Array<CodeNameEntity>();
    projectTypes: CodeNameEntity[] = new Array<CodeNameEntity>();
    assetTypes: CodeNameEntity[] = new Array<CodeNameEntity>();
    selectedAppState: CodeNameEntity = null;
    selectedOwner: EmployeeResource = null;
    selectedDivision: CodeNameEntity = null;
    selectedProjectType: CodeNameEntity = null;
    selectedAssetType: CodeNameEntity = null;
    isProjectTypeDivisionLoading: boolean = false;

    readOnlyInfo = true;
    readOnlyAppState = true;
    readOnlyOwner = true;
    readOnlyDivision = true;
    readOnlyAssetType = true;
    readOnlyProjectType = true;
    readOnlyPeriod = true;

    hide = true;
    forma: FormGroup;
    formSubmit: boolean = false;

    options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

    model = {
        quantity: 0,
        price: 0,
     };

    public entityTypeCode: string = 'ORDER';
    public entityFile: EntityFile = null;
    public confirmationMessage: string = '';
    public operationType: OperationType = OperationType.NotSet;

    public material: CodeNameEntity = null;
    requestBudgetForecastMaterialCostCenterUpdate = new Array<RequestBudgetForecastMaterialCostCenterUpdate>();
    requestBudgetForecastMaterialCostCenterMultiple = new Array<RequestBudgetForecastMaterialCostCenterMultiple>();
    public assetPreReception: AddAsset = new AddAsset();

    public id: number = 0;
    public order: OrderEdit = new OrderEdit();
    public filesToUpload: Array<File>;
    public selectedAssetOp: any;
    public isSaved: boolean = true;

    public monthStartDate: Date | null = null;
    public monthEndDate: Date | null = null;
    minDate: Date;
    maxDate: Date;
    rangeDates: Date[];
    data2: MatrixTree[];
    selectedNode: MatrixTree;
    stornoValue: 0;

    public costCenter: CodeNameEntity = null;

    public get allowSaving(): boolean {
        return this.order != null &&
        this.order.info != null && this.order.info.trim().length > 3 &&
        this.employee != null &&
        this.projectTypeDivision != null &&
        this.assetType != null &&
        this.selectedBudgetForecasts.length > 0;
    }

    // public costCenter: CostCenter = null;
    public assetType: AssetType = null;
    public employee: Employee = null;
    public accMonth: AccMonth = null;
    public company: CodeNameEntity = null;
    // public budgetBase: BudgetBase = null;
    public budgetForecast: BudgetForecast = null;
    public account: CodeNameEntity = null;
    public partner: CodePartnerEntity = null;
    public uom: CodeNameEntity = null;
    public masterType: CodeNameEntity = null;
    public project: CodeNameEntity = null;
    public interCompany: CodeNameEntity = null;
    public type: CodeNameEntity = null;
    public subType: CodeNameEntity = null;
    public administration: CodeNameEntity = null;
    public projectTypeDivision: ProjectTypeDivision = null;
    public startAccMonth: AccMonth = null;
    public assetRowSelection: string = 'multiple';

    isAppStateLoading: boolean = false;
    isOwnerLoading: boolean = false;
    isDivisionLoading: boolean = false;
    isProjectTypeLoading: boolean = false;
    isAssetTypeLoading: boolean = false;

    public readOnlyForm: boolean = false;
    public get isAdmin(): boolean { return AppData.UserIsAdmin; }

    availableBudgetForecasts: BudgetForecastView[] = null;
    selectedBudgetForecasts: BudgetForecastView[] = [];
    selectedBudgetForecastIds: Array<number> = new Array<number>();

    public budgetForecastNew: BudgetForecast = null;
    requestBudgetForecastMaterialCostCenterStorno = new Array<RequestBudgetForecastMaterialCostCenterStorno>();

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public requestHttpService: RequestHttpService,
        public masterTypeHttpService: MasterTypeHttpService,
        public accountHttpService: AccountHttpService,
        public typeHttpService: TypeHttpService,
        public subTypeHttpService: SubTypeHttpService,
        public accMonthHttpService: AccMonthHttpService,
        public employeeHttpService: EmployeeHttpService,
        public costCenterHttpService: CostCenterHttpService,
        public assetTypeHttpService: AssetTypeHttpService,
        public projectHttpService: ProjectHttpService,
        public projectTypeDivisionHttpService: ProjectTypeDivisionHttpService,
        public companyHttpService: CompanyHttpService,
        public budgetBaseHttpService: BudgetBaseHttpService,
        public budgetForecastHttpService: BudgetForecastHttpService,
        public interCompanyHttpService: InterCompanyHttpService,
        public requestOpHttpService: RequestOpHttpService,
        public partnerHttpService: PartnerHttpService,
        public uomHttpService: UomHttpService,
        public administrationHttpService: AdministrationHttpService,
        public notificationService: NotificationService,
        public materialHttpService: MaterialHttpService,
        public emailManagerHttpService: EmailManagerHttpService,
        public rateHttpService: RateHttpService,
        public appStateHttpService: AppStateHttpService,
        public divisionHttpService: DivisionHttpService,
        public projectTypeHttpService: ProjectTypeHttpService,
        public requestBudgetForecastHttpService: RequestBudgetForecastHttpService,
        public requestBudgetForecastMaterialHttpService: RequestBudgetForecastMaterialHttpService,
        public offerHttpService: OfferHttpService,
        public offerMaterialHttpService: OfferMaterialHttpService,
        public orderHttpService: OrderHttpService,
        public assetHttpService: AssetHttpService,
        public matrixHttpService: MatrixHttpService,
        public dialog: MatDialog,
        private messageService:MessageService,
        public requestBFMaterialCostCenterHttpService: RequestBudgetForecastMaterialCostCenterHttpService,
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
      // this.data2 = [{
      //       label: 'F.C Barcelona',
      //       expanded: true,
      //       children: [
      //           {
      //               label: 'F.C Barcelona',
      //               expanded: true,
      //               children: [
      //                   {
      //                       label: 'Chelsea FC'
      //                   },
      //                   {
      //                       label: 'F.C. Barcelona'
      //                   }
      //               ]
      //           },
      //           {
      //               label: 'Real Madrid',
      //               expanded: true,
      //               children: [
      //                   {
      //                       label: 'Bayern Munich'
      //                   },
      //                   {
      //                       label: 'Real Madrid'
      //                   }
      //               ]
      //           }
      //       ]
      //   }];
    }

    ngAfterViewInit() {
        // if ((this.assetFullDetail !== null) && (this.assetFullDetail.id === 0)) this.refreshDocumentTypes();
        if (this.id > 0) {
            this.orderHttpService.getDetailById(this.id)
                .subscribe((order: OrderEdit) => {
                  // console.log(order);
                    // this.asset = asset;
                       this.updateDetails(order);
                });
        }
    }

    public refreshEntityFiles() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('entityTypeCode', 'EDIT_ORDER_PANEL'));
        params.push(new Param('entityId', this.order.id.toString()));

        setTimeout(() => {
          if(this.entityFileList != undefined){
            this.entityFileList.refresh(params);
          }
        }, 2000);


    }

    public refreshOperations() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('requestId', this.id.toString()));

        setTimeout(() => {
          if(this.requestOpList != undefined){
            this.requestOpList.refresh(params);
          }
        }, 2000);

    }

    public updateDetails(order: OrderEdit) {
        this.order.id = order.id;
        this.order.code = order.code;
        this.order.info = order.info;
        this.order.createdAt = order.createdAt;
        this.order.modifiedAt = order.modifiedAt;
        // this.request.startExecution = request.startExecution;
        // this.request.endExecution = request.endExecution;
        // this.rangeDates.push(request.startExecution);
        // this.rangeDates.push(request.endExecution);
        this.rangeDates = new Array<Date>();
        if(order.startExecution != null){
          this.rangeDates[0] = new Date(order.startExecution);
        }

        if(order.endExecution != null){
          this.rangeDates[1] = new Date(order.endExecution);
        }
        if(order.startExecution == null && order.endExecution == null){
          this.rangeDates = null;
        }

        this.order.user = order.user;
        this.order.accMonth = order.accMonth;
        this.order.appState = order.appState;
        this.selectedAppState = order.appState;
        this.order.owner = order.owner;
        this.selectedOwner = order.owner;
        this.order.division = order.division;
        this.selectedDivision = order.division;
        this.order.projectType = order.projectType;
        this.selectedProjectType = order.projectType;
        this.order.assetType = order.assetType;
        this.selectedAssetType = order.assetType;
        // this.request.costCenterId = request.costCenterId;
        // this.request.budgetId = request.budgetId;
        // this.request.budgetBaseId = request.budgetBaseId;

        this.order.validated = order.validated;
        this.order.offer = order.offer;
        this.order.offer.request = order.offer.request;

        this.refreshBudgetForecastList(order);

        this.refreshOfferList(order);
        this.refreshOfferMaterialList();
        this.refreshRequestList();
        this.refreshReceptionList();
        this.refreshAssetList();
        this.refreshRBFMaterialCostCenterList();
        //   this.refreshOperations();
        //   this.refreshEntityFiles();
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

            //   /*begin BUDGET BASE */
            //   public selectBudgetBase() {

            //     const params = new Array<Param>();
            //     const budgetFilter: BudgetFilter = new BudgetFilter();

            //     // if (this.costCenter != null && this.costCenter.admCenter != null) {
            //     //     budgetFilter.admCenterIds = new Array<number>();
            //     //     budgetFilter.admCenterIds.push(this.costCenter.admCenter.id);
            //     //   }

            //       if (this.projectTypeDivision != null && this.projectTypeDivision.projectType != null) {
            //         budgetFilter.projectTypeIds = new Array<number>();
            //         budgetFilter.projectTypeIds.push(this.projectTypeDivision.projectType.id);
            //       }

            //       if (this.projectTypeDivision != null && this.projectTypeDivision.division != null) {
            //         budgetFilter.divisionIds = new Array<number>();
            //         budgetFilter.divisionIds.push(this.projectTypeDivision.division.id);
            //       }

            //       if (this.assetType != null) {
            //         budgetFilter.assetTypeIds = new Array<number>();
            //         budgetFilter.assetTypeIds.push(this.assetType.id);
            //       }

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
            //     }

            //     this.budgetBaseListModal.hide();
            // }

            // /*end BUDGET BASE */


      //        /*begin BUDGET FORECAST */
      //        public selectBudgetForecast() {

      //         // const params = new Array<Param>();
      //         // const budgetFilter: BudgetFilter = new BudgetFilter();

      //         // // if (this.costCenter != null && this.costCenter.admCenter != null) {
      //         // //     budgetFilter.admCenterIds = new Array<number>();
      //         // //     budgetFilter.admCenterIds.push(this.costCenter.admCenter.id);
      //         // //   }

      //         //   if (this.projectTypeDivision != null && this.projectTypeDivision.projectType != null) {
      //         //     budgetFilter.projectTypeIds = new Array<number>();
      //         //     budgetFilter.projectTypeIds.push(this.projectTypeDivision.projectType.id);
      //         //   }

      //         //   if (this.projectTypeDivision != null && this.projectTypeDivision.division != null) {
      //         //     budgetFilter.divisionIds = new Array<number>();
      //         //     budgetFilter.divisionIds.push(this.projectTypeDivision.division.id);
      //         //   }

      //         //   if (this.assetType != null) {
      //         //     budgetFilter.assetTypeIds = new Array<number>();
      //         //     budgetFilter.assetTypeIds.push(this.assetType.id);
      //         //   }

      //         //   params.push(new Param('pageSize', '5'));
      //         //   params.push(new Param('jsonFilter', JSON.stringify(budgetFilter)));

      //         this.budgetForecastList.refresh(null);
      //         this.budgetForecastListModal.show();
      //     }
      //     public setSelectedBudgetForecast() {

      //         const items: Array<BudgetForecast> = this.budgetForecastList.selectedItems;
      //         // console.log(JSON.stringify(items));
      //         this.budgetForecast = ((items != null) && (items.length === 1)) ? items[0] : null;

      //         this.budgetForecastListModal.hide();

      // //         // RequestBudgetForecast //

      // //         let aIds: number[] = new Array<number>();
      // //         let reqBgtsIds: RequestBudgetForecastAdd = new RequestBudgetForecastAdd();
      // //         items.forEach(item => {
      // //             let index: number = aIds.indexOf(item.id);
      // //             if (index < 0) aIds.push(item.id);
      // //         });

      // //         reqBgtsIds.budgetForecastIds = aIds;
      // //         reqBgtsIds.requestId = this.employeeId;

      // //         this.employeeDivisionHttpService.addDivisionByEmployee(reqBgtsIds).subscribe( (res) => {
      // //                 if (res.statusCode === 200) {
      // //                     this.notificationService.showSuccess('Datele au fost salvate cu success!', 'Adauga mapare Departament');
      // //                     this.divisionList.refresh(null);
      // //                     this.employeeDivisionList.refresh(null);
      // //                     this.divisionList.selectedItems = new Array<Division>();
      // //                 } else if (res.statusCode === 404) {
      // //                     this.notificationService.showError('Nu exista', 'Adauga mapare Departament');
      // //                     this.divisionList.selectedItems = new Array<Division>();
      // //                 }
      // //         }, (error) => {
      // //             this.notificationService.showError('Eroare salvare!', 'Adauga mapare Departament');
      // //             this.divisionList.selectedItems = new Array<Division>();
      // //         });

      // // // RequestBudgetForecast //
      //     }

          /*end BUDGET FORECAST */


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

               /*begin INTERCOMPANY */
               public selectInterCompany() {

                const params = new Array<Param>();

                params.push(new Param('partnerIds', this.partner != null ? this.partner.id.toString() : null));

                this.interCompanyList.refresh(null);
                this.interCompanyListModal.show();
            }
            public setSelectedInterCompany() {
                const items: Array<InterCompany> = this.interCompanyList.selectedItems;
                this.interCompany = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.interCompanyListModal.hide();
            }

            /*end INTERCOMPANY */

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


        // /* begin costcenter */
        // public selectCostCenter() {

        //     const divisionId = this.projectTypeDivision != null && this.projectTypeDivision.division != null ? this.projectTypeDivision.division.id : null;

        //     const params = new Array<Param>();
        //     params.push(new Param('divisionIds', divisionId.toString()));

        //     this.costCenterList.refresh(params);
        //     this.costCenterListModal.show();
        // }
        // public setSelectedCostCenter() {
        //     const items: Array<CostCenter> = this.costCenterList.selectedItems;
        //     this.costCenter = ((items != null) && (items.length === 1)) ? items[0] : null;
        //     this.costCenterListModal.hide();
        // }
        // /*end project type */

          /* begin assetType */
          public selectAssetType() {
            this.assetTypeList.refresh(null);
            this.assetTypeListModal.show();
        }
        public setSelectedAssetType() {
            const items: Array<AssetType> = this.assetTypeList.selectedItems;
            this.assetType = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.assetTypeListModal.hide();

            const params = new Array<Param>();
            const budgetFilter: BudgetFilter = new BudgetFilter();

              //  if (this.costCenter != null && this.costCenter.admCenter != null) {
              //     budgetFilter.admCenterIds = new Array<number>();
              //     budgetFilter.admCenterIds.push(this.costCenter.admCenter.id);
              //   }

                if (this.projectTypeDivision != null && this.projectTypeDivision.projectType != null) {
                  budgetFilter.projectTypeIds = new Array<number>();
                  budgetFilter.projectTypeIds.push(this.projectTypeDivision.projectType.id);
                }

                if (this.projectTypeDivision != null && this.projectTypeDivision.division != null) {
                  budgetFilter.divisionIds = new Array<number>();
                  budgetFilter.divisionIds.push(this.projectTypeDivision.division.id);
                }

                if (this.assetType != null) {
                  budgetFilter.assetTypeIds = new Array<number>();
                  budgetFilter.assetTypeIds.push(this.assetType.id);
                }

                params.push(new Param('pageSize', '500'));
                params.push(new Param('jsonFilter', JSON.stringify(budgetFilter)));

                this.budgetForecastHttpService.get(1, 500, 'id', 'asc', params, null, 'detailui').subscribe( (res: any) => {
                  this.availableBudgetForecasts = [];
                  // console.log(JSON.stringify(res));
                  res.items.forEach(element => {
                      element.isLeftSide = true;
                      this.availableBudgetForecasts.push(element);
                  });
              });
        }
        /*end  assetType  */


          /* begin costcenter */
          public selectProjectTypeDivision() {

             this.projectTypeDivisionList.refresh(null);
             this.projectTypeDivisionListModal.show();
        }
        public setSelectedProjectTypeDivision() {
            const items: Array<ProjectTypeDivision> = this.projectTypeDivisionList.selectedItems;
            this.projectTypeDivision = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.projectTypeDivisionListModal.hide();
        }
        /*end project type */

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


        /*begin Account*/
        public selectAccount() {
            this.accountList.refresh(null);
            this.accountListModal.show();
        }

        public setSelectedAccount() {
            const items: Array<Account> = this.accountList.selectedItems;
             this.account = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.accountListModal.hide();
        }

        /*end Account*/


     public cancelChanges() {
        // this.ngLocation.back();
        this.router.navigate(['/procurement/order']);
    }

    public onDeleteOrder() {
        this.operationType = OperationType.Delete;
        this.confirmationMessage = 'Stergeti P.O. -ul?';
        this.confirmationModal.show();
    }

    public onValidateAsset() {
        this.operationType = OperationType.AssetValidation;
        this.confirmationMessage = 'Validati inregistrarea curenta?';
        this.confirmationModal.show();
    }

    // public validateBudget() {
    //     this.request.validated = true;
    //     this.saveOrder();
    // }

    public addNewOperation() {
        // let assets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
        // assets.push(new AssetSimpleDetail(this.asset.id, this.asset.invNo, this.asset.assetName,
        //     '', this.asset.partner, this.asset.assetType, this.asset.accState, this.asset.usageStartDate, '', ''));
        // AppData.AssetList = assets;
        // this.router.navigate(['/newoperation']);
    }


    // public saveOrder() {
    //     this.isSaved = false;
    //     // this.request.budgetBaseId = this.budgetBase != null ? this.budgetBase.id : null;
    //     // this.request.budgetForecastId = this.budgetForecast != null ? this.budgetForecast.id : null;
    //     // this.request.costCenterId = this.costCenter != null ? this.costCenter.id : null;
    //     this.request.projectTypeId = this.projectTypeDivision != null ? this.projectTypeDivision.projectType.id : null;
    //     this.request.divisionId = this.projectTypeDivision != null ? this.projectTypeDivision.division.id : null;
    //     this.request.assetTypeId = this.assetType != null ? this.assetType.id : null;
    //     this.request.employeeId = this.employee != null ? this.employee.id : null;
    //     this.request.startAccMonthId = this.startAccMonth != null ? this.startAccMonth.id : null;
    //     this.request.rangeDates = this.rangeDates;

    //     this.request.budgetForecastIds = new Array<RequestBudgetForecastSave>();
    //         this.selectedBudgetForecasts.forEach( item => {
    //           let data = new RequestBudgetForecastSave();
    //           data.id = item.id;
    //           data.needBudget = item.needBudget;
    //           data.needBudgetValue = item.needBudgetValue;
    //             this.request.budgetForecastIds.push(data);
    //         });

    //     this.request.validated = true;

    //     this.requestHttpService.addNewRequest(this.request)
    //     .subscribe((result: RequestResult) => {
    //         if (result.success) {
    //           this.notificationService.showSuccess(result.message, 'Purchase Request(P.R.) nou', 0, false, 0);
    //           this.router.navigate(['/procurement/request']);
    //         } else if (!result.success) {
    //             this.notificationService.showError('Motiv: ' + result.message + '!', 'Eroare salvare date', 0, false, 0);
    //             this.isSaved = true;
    //         }
    //     });
    // }

    public onConfirmationApproved() {

        switch (this.operationType) {
            // case OperationType.AssetValidation:
            //     this.validateBudget();
            //     break;
            case OperationType.Delete:
                this.deleteOrder();
                break;
            case OperationType.ProcessAssetOp:
                this.processAssetOp();
                break;
            case OperationType.DeleteOfferMaterial:
                this.onDeleteOfferMaterial();
                break;
              case OperationType.DeleteRequestBFMaterialCostCenter:
                this.deleteRequestBFMaterialCostCenter();
                break;
              case OperationType.DeleteRequestBFMaterialCostCenterEmployee:
                  this.deleteRequestBFMaterialCostCenterEmployee();
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
        this.selectedAssetOp = this.requestOpList.selectedItem;
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
        this.requestOpHttpService.process(this.requestOpList.selectedItem.id).subscribe((data) => {
            // this.refreshAssetOperations();
        });
    }


public onDeleteOfferMaterial() {
    this.operationType = OperationType.DeleteOfferMaterial;
    this.confirmationMessage = 'Esti sigur?';
    this.confirmationModal.show();
}

onProjectTypeDivisionListFocus() {
    if (this.projectTypeDivisions.length === 0) { this.refreshProjectTypeDivisionList(); }
  }

  refreshProjectTypeDivisionList(): Observable<boolean> {
    const resultSubject = new Subject<boolean>();

    this.isProjectTypeDivisionLoading = true;
    const params = this.getFilters();

    this.requestHttpService.getData(params).subscribe( (res: any[]) => {
      this.projectTypeDivisions = res;
      resultSubject.next(true);
    }, () => { resultSubject.next(false); }, () => { this.isProjectTypeDivisionLoading = false; });

    return resultSubject.asObservable();
  }

  onProjectTypeDivisionSelectionAdd() {
    // this.refreshAssetList();
    // this.clearDivisionItems();
    // this.clearCostCenterItems();
  }

  changeLists() {
    // const params = this.getFilters();
    // this.assetList.refresh(params);
  }

  getFilters() {
    const params = new Array<Param>();
        const requestFilter: RequestFilter = new RequestFilter();


        // if (this.selectedBudgetManagers != null) {
        //   dashboardFilter.budgetManagerIds = new Array<number>();
        //   this.selectedBudgetManagers.forEach((selected) => {
        //     dashboardFilter.budgetManagerIds.push(selected.id);
        //   });
        // }

        // if (this.selectedDepartments != null) {
        //   dashboardFilter.departmentIds = new Array<number>();
        //   this.selectedDepartments.forEach((selected) => {
        //     dashboardFilter.departmentIds.push(selected.id);
        //   });
        // }

        // if (this.selectedDivisions != null) {
        //   dashboardFilter.divisionIds = new Array<number>();
        //   this.selectedDivisions.forEach((selected) => {
        //     dashboardFilter.divisionIds.push(selected.id);
        //   });
        // }

        // if (this.selectedCostCenters != null) {
        //   dashboardFilter.costCenterIds = new Array<number>();
        //   this.selectedCostCenters.forEach((costCenter) => {
        //     dashboardFilter.costCenterIds.push(costCenter.id);
        //   });
        // }

        // if (this.selectedSubTypes != null) {
        // dashboardFilter.subTypeIds = new Array<number>();
        // this.selectedSubTypes.forEach((subType) => {
        //   dashboardFilter.subTypeIds.push(subType.id);
        // });
        // }

        // if (this.selectedTypes != null) {
        //   dashboardFilter.typeIds = new Array<number>();
        //   this.selectedTypes.forEach((type) => {
        //     dashboardFilter.typeIds.push(type.id);
        //   });
        //   }

        // if (this.selectedAssetTypes != null) {
        // dashboardFilter.assetTypeIds = new Array<number>();
        // this.selectedAssetTypes.forEach((assetType) => {
        //   dashboardFilter.assetTypeIds.push(assetType.id);
        // });
        // }

        // if (this.selectedProjects != null) {
        //   dashboardFilter.projectIds = new Array<number>();
        //   this.selectedProjects.forEach((project) => {
        //     dashboardFilter.projectIds.push(project.id);
        //   });
        // }

         if (this.order != null) {
          requestFilter.requestIds = new Array<number>();
          requestFilter.requestIds.push(this.order?.offer?.request?.id);
        }

        params.push(new Param('jsonFilter', JSON.stringify(requestFilter)));

        return params;
  }

  public get allowNeedBudget(): boolean {
      return this.projectTypeDivision != null && this.assetType != null && (this.order != null && this.order.budgetValueNeed > 100);
  }

  needBudget() {
    this.isSaved = false;
    if (confirm('ATENTIE! NU UITA SA INCARCI DOVADA DOCUMENTULUI PENTRU BUGETUL NOU?')) {
        const needBgt = new NeedBudget();
        needBgt.projectTypeDivisionId = this.projectTypeDivision != null ? this.projectTypeDivision.id : null;
        // needBgt.costCenterId = this.costCenter != null ? this.costCenter.id : null;
        needBgt.assetTypeId = this.assetType != null ? this.assetType.id : null;
        needBgt.employeeId = this.employee != null ? this.employee.id : null;
        needBgt.startAccMonthId = this.startAccMonth != null ? this.startAccMonth.id : null;
        needBgt.info = this.order.info;
        needBgt.budgetValueNeed = this.order.budgetValueNeed;
        needBgt.endDate = this.order.endDate;

        this.requestHttpService.needBudget(needBgt)
        .subscribe((result: RequestResult) => {
            if (result.success) {
              this.notificationService.showSuccess(result.message, 'Purchase Request(PR) -solicitare buget', 0, false, 0);
              this.router.navigate(['/procurement/request']);
            } else if (!result.success) {
                this.notificationService.showError('Motiv: ' + result.message + '!', 'Eroare salvare date', 0, false, 0);
                this.isSaved = true;
            }
        });
    }
}

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

public moveToTarget(event: any) {
  // this.notificationService.showInfo('', 'Move');
  // console.log(JSON.stringify(event));
  // this.showTemplate(1);
  this.selectedBudgetForecasts.forEach(element => {
          // element.isLeftSide = false;
  });
}

public resetDateRange() {
  this.monthStartDate = null;
  this.monthEndDate = null;
}

public reset() {
  // this.filter = "";
  this.resetDateRange();
}

public notifyDateChange() {
}

// AppState //

onAppStateSelectionAdd() {
  // this.refreshAssetList();
  // this.clearDivisionItems();
  // this.clearCostCenterItems();
}

onAppStateListFocus() {
  if(this.appStates.length == 0) this.refreshAppStateList();
}

refreshAppStateList(): Observable<boolean> {
  let resultSubject = new Subject<boolean>();

  this.isAppStateLoading = true;
  let params = this.getFilters();

  this.appStateHttpService.getDetailByParentCode('REQUEST').subscribe( (res: any[]) => {
    this.appStates = res;
    resultSubject.next(true);
  }, () => { resultSubject.next(false); }, () => { this.isAppStateLoading = false; });

  return resultSubject.asObservable();
}

// AppState //

// OWNER //

onOwnerSelectionAdd() {
  // this.refreshAssetList();
  // this.clearDivisionItems();
  // this.clearCostCenterItems();
}

onOwnerListFocus() {
  if(this.owners.length == 0) this.refreshOwnerList();
}

refreshOwnerList(): Observable<boolean> {
  let resultSubject = new Subject<boolean>();

  this.isOwnerLoading = true;
  let params = this.getFilters();

  this.employeeHttpService.get(1, 10000, 'email', 'asc', params).subscribe( (res: any) => {
    this.owners = res.items;
    resultSubject.next(true);
  }, () => { resultSubject.next(false); }, () => { this.isOwnerLoading = false; });

  return resultSubject.asObservable();
}

// OWNER //


// Division //

onDivisionSelectionAdd() {
  // this.refreshAssetList();
  // this.clearDivisionItems();
  // this.clearCostCenterItems();
}

onDivisionListFocus() {
  if(this.divisions.length == 0) this.refreshDivisionList();
}

refreshDivisionList(): Observable<boolean> {
  let resultSubject = new Subject<boolean>();

  this.isDivisionLoading = true;
  let params = this.getFilters();

  this.divisionHttpService.getData(params).subscribe( (res: any[]) => {
    this.divisions = res;
    resultSubject.next(true);
  }, () => { resultSubject.next(false); }, () => { this.isDivisionLoading = false; });

  return resultSubject.asObservable();
}

// Division //

// ProjectType //

onProjectTypeSelectionAdd() {
  // this.refreshAssetList();
  // this.clearDivisionItems();
  // this.clearCostCenterItems();
}

onProjectTypeListFocus() {
  if(this.projectTypes.length == 0) this.refreshProjectTypeList();
}

refreshProjectTypeList(): Observable<boolean> {
  let resultSubject = new Subject<boolean>();

  this.isProjectTypeLoading = true;
  let params = this.getFilters();

  this.projectTypeHttpService.get(1, 1000, 'name', 'asc', params).subscribe( (res: any) => {
    this.projectTypes = res.items;
    resultSubject.next(true);
  }, () => { resultSubject.next(false); }, () => { this.isProjectTypeLoading = false; });

  return resultSubject.asObservable();
}

// ProjectType //

// AssetType //

onAssetTypeSelectionAdd() {
  // this.refreshAssetList();
  // this.clearDivisionItems();
  // this.clearCostCenterItems();
}

onAssetTypeListFocus() {
  if(this.assetTypes.length == 0) this.refreshAssetTypeList();
}

refreshAssetTypeList(): Observable<boolean> {
  let resultSubject = new Subject<boolean>();

  this.isAssetTypeLoading = true;
  let params = this.getFilters();

  this.assetTypeHttpService.get(1, 1000, 'name', 'asc', params).subscribe( (res: any) => {
    this.assetTypes = res.items;
    resultSubject.next(true);
  }, () => { resultSubject.next(false); }, () => { this.isAssetTypeLoading = false; });

  return resultSubject.asObservable();
}

// AssetType //

edit(){
this.readOnlyInfo = !this.readOnlyInfo;
// this.readOnlyAppState = !this.readOnlyAppState;
}

update() {
  let data: OrderUpdate = new OrderUpdate();
  data.id = this.order.id;
  data.info = this.order.info;

  this.orderHttpService.editOrder(data).subscribe((res: RequestResult)=> {
    if(res.success){
      this.notificationService.showSuccess(res.message, 'Update P.O.', 2000, true, 0);
      this.orderHttpService.getDetailById(this.id)
      .subscribe((order: any) => {
        this.updateDetails(order);
      });
    }
  })
}

updateOrderBudgetForecast() {
  let data: OrderBudgetForecastUpdate = new OrderBudgetForecastUpdate();
  data.orderId = this.order.id;
  data.budgetForecastId = this.budgetForecastNew.id;

  this.orderHttpService.updateOrderBudgetForecast(data).subscribe((res: RequestResult)=> {
    if(res.success){
      this.notificationService.showSuccess(res.message, 'Update P.O.', 2000, true, 0);
      this.budgetForecastNew = null;
      this.refreshBudgetForecastList(this.order);
    }
  })
}


deleteOrder() {
  let data: OrderDelete = new OrderDelete();
  data.id = this.order.id;
  data.reason = 'Sterge P.O.';
  this.orderHttpService.deleteOrder(data).subscribe((res)=>{
    if(res.success){
      this.notificationService.showSuccess(res.message, 'Sterge P.O.', 2000, true, 0);
      this.cancelChanges();
    }
  })
}

public setSelectedItem(reqBF: Array<any>) {

  // let params: Array<Param> = new Array<Param>();

  // if (this.requestBudgetForecastList != null) {

    this.selectedRequestBudgetForecasts = new Array<any>();
    this.requestBudgetForecastList.selectedItems.forEach((requestBGF) => {
        this.selectedRequestBudgetForecasts.push(requestBGF);
    });

  //   this.refreshEntityFiles();
  // }
  }

  onAssetDocumentFileUpload() {
    // const requestBudgetForecastId = this.requestBudgetForecastList.selectedItems.length > 0 ? this.requestBudgetForecastList.selectedItems[0].id : 0;
    // const dialogRef = this.dialog.open(UploadRequestBudgetForecastModalComponent, {
    //   panelClass: 'centered-middle-modal', height: '80%', maxHeight: '80%', disableClose: true, width: '600px', position: { bottom: '15%', top: 'auto'},
    //   data: { uploadType: 'REQUEST_BUDGET_FORECAST', uploadFolder: 'REQUESTBUDGETFORECAST', entityId: requestBudgetForecastId }
    // });
    // dialogRef.afterClosed().subscribe(() => {
    //   this.checkForRefresh();
    //   this.entityFile = null;
    //   this.refreshEntityFiles();
    // });
  }

  public refreshBudgetForecastList(order: OrderEdit) {
    const params: Array<Param> = new Array<Param>();
    //console.log(this.order);
    params.push(new Param('requestIds', order != null && order.offer != null && order.offer.request != null ? order.offer.request.id.toString() : null ));

      setTimeout(() => {
        if(this.requestBudgetForecastList != undefined){
          this.requestBudgetForecastList.refresh(params);
          // this.refreshEntityFiles();
        }
      }, 1000);
  }

  public refreshOfferList(order: OrderEdit) {
    const params = this.getFilters()

      setTimeout(() => {
        if(this.offerList != undefined){
          this.offerList.refresh(params);
          // this.refreshEntityFiles();
        }
      }, 500);

  }

  public refreshRequestList() {
    const params = this.getFilters()

      setTimeout(() => {
        if(this.requestList != undefined){
          this.requestList.refresh(params);
          // this.refreshEntityFiles();
        }
      }, 2000);

  }

  public refreshReceptionList() {
    const params = this.getFilters()

      setTimeout(() => {
        if(this.assetReceptionList != undefined){
          this.assetReceptionList.refresh(params);
          // this.refreshEntityFiles();
        }
      }, 800);
  }

  public refreshAssetList() {
    const params = this.getFilters()

      setTimeout(() => {
        if(this.assetList != undefined){
          this.assetList.refresh(params);
          // this.refreshEntityFiles();
        }
      }, 900);
  }

  public refreshOfferMaterialList() {
    const params: Array<Param> = new Array<Param>();
    params.push(new Param('requestIds', this.order != null ? this.order.offer.request.id.toString() : null ));
    params.push(new Param('editPanel', 'true' ));

      setTimeout(() => {
        if(this.offerMaterialList != undefined){
          this.offerMaterialList.refresh(params);
          // this.refreshEntityFiles();
        }
      }, 600);

  }

  public refreshRBFMaterialCostCenterList() {
    const requestFilter: RequestFilter = new RequestFilter();
    requestFilter.requestBudgetForecastIds = new Array<number>();

    const params: Array<Param> = new Array<Param>();
    params.push(new Param('orderId', this.id.toString()));

      setTimeout(() => {
        if(this.requestBFMaterialCostCenterList != undefined){
          this.requestBFMaterialCostCenterList.refresh(params);
        }
      }, 1000);

  }

  onNodeSelect(event) {
    this.messageService.add({severity: 'success', summary: 'Node Selected', detail: event.node.label});
}

handleChange(e) {
  // console.log(e);
  var index = e.index;

  if(index == 5){
    if(this.order != null){
      this.matrixHttpService.matchmatrixeditpanel(this.order.id).subscribe((res: MatrixTree[])=> {
        // console.log(res);
        this.data2 = [...res]
      })
    }
  } else if (index == 6){
    this.isSaved = true;
    this.setSelectedOrder();
  }
  else if (index == 11){
    this.refreshEntityFiles();
  }
}


  /*begin REQUEST BUDGET FORECAST */

  public selectBudgetForecast() {

    // const params = new Array<Param>();
    // params.push(new Param('needBudget', 'true'));

    this.budgetForecastList.refresh(null);
    this.budgetForecastListModal.show();
}
public setSelectedBudgetForecast() {
    const items: Array<BudgetForecast> = this.budgetForecastList.selectedItems;
    this.budgetForecastNew = ((items != null) && (items.length === 1)) ? items[0] : null;

    this.budgetForecastListModal.hide();
}

/*end REQUEST BUDGET FORECAST */


public updateCostCenterStorno() {

  this.requestBudgetForecastMaterialCostCenterStorno = new Array<RequestBudgetForecastMaterialCostCenterStorno>();

  this.assetList.items.forEach(element => {
    // console.log(JSON.stringify(element));
      this.requestBudgetForecastMaterialCostCenterStorno.push(new RequestBudgetForecastMaterialCostCenterStorno(element.id, element.storno, element.stornoValue));
  });
  this.assetHttpService.updateStorno(this.requestBudgetForecastMaterialCostCenterStorno).subscribe((res) => {

      if (res.success) {
          this.notificationService.showSuccess(res.message, 'Actualizare storno', 0, false, 0);
          this.assetList.refresh(null);

      } else {
          this.notificationService.showError(res.message, 'Eroare salvare date!', 0, false, 0);
          this.assetList.refresh(null);
      }
  }, (error) => {
      this.notificationService.showError('', 'Eroare server!', 0, false, 0);
      this.assetList.refresh(null);
  });
}

onAssetFileUpload() {
  const dialogRef = this.dialog.open(UploadStornoModalComponent, {
    panelClass: 'centered-middle-modal', height: '80%', maxHeight: '80%', disableClose: true, width: '600px', position: { bottom: '15%', top: 'auto'},
    data: { uploadType: 'STORNO', uploadFolder: 'STORNO', assetId: this.assetList.selectedItems[0].id }
  });
  dialogRef.afterClosed().subscribe(() => {
    this.refreshAssetList();
  });
}

onAssetPreReceptionFileUpload() {
  const dialogRef = this.dialog.open(UploadPreReceptionModalComponent, {
    panelClass: 'centered-middle-modal', height: '80%', maxHeight: '80%', disableClose: true, width: '600px', position: { bottom: '15%', top: 'auto'},
    data: { uploadType: 'PRE_RECEPTION', uploadFolder: 'PRE_RECEPTION', assetId: this.assetReceptionList.selectedItems[0].id, docNo1: this.assetReceptionList.selectedItems[0].docNo1 }
  });
  dialogRef.afterClosed().subscribe(() => {
    this.refreshReceptionList();
  });
}

public addNewPreReception() {
  this.router.navigate(['/asset/new']);
}

// PRERECEPTIE //

public setSelectedOrder() {
  if(this.order != null && this.order.contract != null && this.order.contract.contractID === 'NO-C'){
    this.notificationService.showWarning('Comanda selectata nu are CONTRACT!', 'IMPORTANT', 0, false, 0);
    // this.order = null;
  }else {
  let params: Array<Param> = new Array<Param>();

  params.push(new Param('requestIds', AppUtils.getIdsList<Request, number>([ this.order != null &&
    this.order.offer != null && this.order.offer.request != null ? this.order.offer.request : null ])));
  this.requestPreReceptionBudgetForecastList.refresh(params);

  params = new Array<Param>();
  params.push(new Param('orderId', this.order != null ? this.order.id.toString() : null));
  this.requestBFMaterialCostCenterAllList.refresh(params);


  }

}

public get allowPreceptionSaving(): boolean {
  return this.order != null &&
  ((this.costCenter != null) || (this.requestPreReceptionBudgetForecastList != undefined && this.requestPreReceptionBudgetForecastList.selectedItems.length > 0)) &&
  (this.requestPreReceptionBudgetForecastList.selectedItems.length > 0);
}

public get sumMaxMaterialCostCenters(): boolean {
  let error = 0;
  let result = [];
  if(this.requestBFMaterialCostCenterAllList != null && this.requestBFMaterialCostCenterAllList.items.length > 0){
    this.requestBFMaterialCostCenterAllList.items.reduce(function(res, value) {
      if (!res[value.requestBGTFM.id]) {
        res[value.requestBGTFM.id] = { requestBGTFMId: value.requestBGTFM.id, quantity: 0, maxQuantity: 0, valueRon: 0, maxValueRon: 0, offerTypeId: 0 };
        result.push(res[value.requestBGTFM.id])
      }
      res[value.requestBGTFM.id].quantity += value.quantity;
      res[value.requestBGTFM.id].maxQuantity = value.maxQuantity;
      res[value.requestBGTFM.id].valueRon += value.valueRon;
      res[value.requestBGTFM.id].maxValueRon = value.maxValueRon;
      res[value.requestBGTFM.id].offerTypeId = value.offerType.id;
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

public onRequestBudgetForecastMaterialListSelectionChanged(assetOpDetails: Array<any>) {
  this.material = null;
  if (this.requestPreReceptionBudgetForecastMaterialList.selectedItem != null && this.requestPreReceptionBudgetForecastMaterialList.selectedItem.appState.id === 7) {
  this.material = this.requestPreReceptionBudgetForecastMaterialList.selectedItem.material;

  // this.asset.name2 = this.material != null ? this.material.name : '';
  // this.asset.receptionPrice = this.requestBudgetForecastMaterialList.selectedItem.price;
  } else if (this.requestPreReceptionBudgetForecastMaterialList.selectedItem != null && this.requestPreReceptionBudgetForecastMaterialList.selectedItem.appState.id !== 7) {
      this.notificationService.showWarning('Produsul ' +  this.requestPreReceptionBudgetForecastMaterialList.selectedItem.material.code + ' a fost receptionat deja!', 'Stare produs din comanda', 0, false, 0);
  }

  const params: Array<Param> = new Array<Param>();
  params.push(new Param('reception', 'true'));
  params.push(new Param('requestBudgetForecastMaterialIds', AppUtils.getIdsList<RequestBudgetForecastMaterial, number>([
    this.requestPreReceptionBudgetForecastMaterialList.selectedItem != null ? this.requestPreReceptionBudgetForecastMaterialList.selectedItem : null ])));
    this.requestPreReceptionBFMaterialCostCenterList.refresh(params);

    // this.requestBFMaterialCostCenterAllList.refresh(params);
}

public selectCostCenterReception() {
  this.costCenterReceptionListModal.show();
  let params:Array<Param> = Array<Param>();
  params.push(new Param('exceptCostCenterIds', AppUtils.getIdsList<CodeNameEntity, number>(this.selectedCostCenters())));
  this.costCenterReceptionList.refresh(params);
}

private selectedCostCenters(): Array<CodeNameEntity> {
let mappedCostCenters: Array<CodeNameEntity> = new Array<CodeNameEntity>();

if(this.requestPreReceptionBFMaterialCostCenterList.items.length > 0) {
    this.requestPreReceptionBFMaterialCostCenterList.items.forEach(element => {
        mappedCostCenters.push(element.costCenter);
    });
}

return mappedCostCenters;
}

public setSelectedCostCenterReception() {
const items: Array<any> = this.costCenterReceptionList.selectedItems;
this.costCenter = ((items != null) && (items.length > 0)) ? items[0] : null;
this.costCenterReceptionListModal.hide();

const aIds: number[] = new Array<number>();
const costCentersIds: RequestBFMaterialCostCenterAdd = new RequestBFMaterialCostCenterAdd();
items.forEach(item => {
  const index: number = aIds.indexOf(item.id);
  if (index < 0) { aIds.push(item.id); }
});

costCentersIds.costCenterIds = aIds;
costCentersIds.orderId = this.order != null ? this.order.id : 0;
costCentersIds.requestBudgetForecastMaterialId = this.requestPreReceptionBudgetForecastMaterialList.selectedItem != null ? this.requestPreReceptionBudgetForecastMaterialList.selectedItem.id : 0;

this.requestBFMaterialCostCenterHttpService.addMaterialByRequestBudgetForecast(costCentersIds).subscribe( (res) => {
      if (res.statusCode === 200) {
          this.notificationService.showSuccess('Datele au fost salvate cu success!', 'Adauga mapare centru de cost', 0, false, 0);
          this.costCenterReceptionList.refresh(null);

          let params: Array<Param> = new Array<Param>();
          params.push(new Param('requestBudgetForecastMaterialIds', AppUtils.getIdsList<RequestBudgetForecastMaterial, number>([
            this.requestPreReceptionBudgetForecastMaterialList.selectedItem != null ? this.requestPreReceptionBudgetForecastMaterialList.selectedItem : null ])));
          this.requestPreReceptionBFMaterialCostCenterList.refresh(params);
          this.requestPreReceptionBudgetForecastMaterialList.refresh(null);
          this.materialList.selectedItems = new Array<Material>();

          params = new Array<Param>();
          params.push(new Param('orderId', this.order != null ? this.order.id.toString() : null));
          this.requestBFMaterialCostCenterAllList.refresh(params);


      } else if (res.statusCode === 404) {
          this.notificationService.showError('Nu exista', 'Adauga materiale', 0, false, 0);
          this.materialList.selectedItems = new Array<Material>();
      }
}, (error) => {
  this.notificationService.showError('Eroare salvare!', 'Adauga mapare material', 0, false, 0);
  this.materialList.selectedItems = new Array<Material>();
});
}

public onDeleteRequestBFMaterialEmployee() {
this.operationType = OperationType.DeleteRequestBFMaterialCostCenterEmployee;
this.confirmationMessage = 'Esti sigur?';
this.confirmationModal.show();
}



public onDeleteRequestBFMaterialCostCenter() {
this.operationType = OperationType.DeleteRequestBFMaterialCostCenter;
this.confirmationMessage = 'Esti sigur?';
this.confirmationModal.show();
}

public deleteRequestBFMaterialCostCenter() {
this.requestBFMaterialCostCenterHttpService.deleteMaterialByRequestBudgetForecast(this.requestPreReceptionBFMaterialCostCenterList.selectedItem.id)
.subscribe((res) => {
  if (res.statusCode === 200) {
      this.notificationService.showSuccess('Operatia a fost finalizata cu success!', 'Stergere CC mapat', 0, false, 0);
      this.requestPreReceptionBudgetForecastMaterialList.refresh(null);
      this.requestPreReceptionBFMaterialCostCenterList.refresh(null);

      const params: Array<Param> = new Array<Param>();
      params.push(new Param('orderId', this.order != null ? this.order.id.toString() : null));
      this.requestBFMaterialCostCenterAllList.refresh(params);

  } else if (res.statusCode === 404) {
      this.notificationService.showError('Eroare salvare', 'Stergere CC mapat', 0, false, 0);
  }
}, (error) => {
  this.notificationService.showError('Eroare server', 'Stergere CC mapat', 0, false, 0);
});
}

public deleteRequestBFMaterialCostCenterEmployee() {
this.requestBFMaterialCostCenterHttpService.removeMaterialByRequestBudgetForecastEmployee(this.requestPreReceptionBFMaterialCostCenterList.selectedItem.id)
.subscribe((res) => {
  if (res.statusCode === 200) {
      this.notificationService.showSuccess('Operatia a fost finalizata cu success!', 'Stergere utilizator mapat', 0, false, 0);
      this.requestPreReceptionBudgetForecastMaterialList.refresh(null);
      this.requestPreReceptionBFMaterialCostCenterList.refresh(null);

      const params: Array<Param> = new Array<Param>();
      params.push(new Param('orderId', this.order != null ? this.order.id.toString() : null));
      this.requestBFMaterialCostCenterAllList.refresh(params);

  } else if (res.statusCode === 404) {
      this.notificationService.showError('Eroare salvare', 'Stergere utilizator mapat', 0, false, 0);
  }
}, (error) => {
  this.notificationService.showError('Eroare server', 'Stergere utilizator mapat', 0, false, 0);
});
}

public saveCostCenterValidated() {

this.requestBudgetForecastMaterialCostCenterUpdate = new Array<RequestBudgetForecastMaterialCostCenterUpdate>();

this.requestPreReceptionBFMaterialCostCenterList.items.forEach(element => {
// console.log(JSON.stringify(element));
  this.requestBudgetForecastMaterialCostCenterUpdate.push(new RequestBudgetForecastMaterialCostCenterUpdate(element.id, element.quantity, element.valueRon));
});
this.requestBFMaterialCostCenterHttpService.requestBFMaterialCostCenterUpdate(this.requestBudgetForecastMaterialCostCenterUpdate).subscribe((res) => {

  if (res.success) {
      this.notificationService.showSuccess(res.message, 'Actualizare modificari', 0, false, 0);
      this.requestPreReceptionBudgetForecastMaterialList.refresh(null);
      this.requestPreReceptionBudgetForecastList.refresh(null);
      this.requestPreReceptionBFMaterialCostCenterList.refresh(null);

      const params: Array<Param> = new Array<Param>();
      params.push(new Param('orderId', this.order != null ? this.order.id.toString() : null));
      this.requestBFMaterialCostCenterAllList.refresh(params);


  } else {
      this.notificationService.showError(res.message, 'Eroare salvare date!', 0, false, 0);
      this.requestPreReceptionBudgetForecastMaterialList.refresh(null);
      this.requestPreReceptionBudgetForecastList.refresh(null);
      this.requestPreReceptionBFMaterialCostCenterList.refresh(null);
  }
}, (error) => {
  this.notificationService.showError('', 'Eroare server!', 0, false, 0);
  this.requestPreReceptionBudgetForecastMaterialList.refresh(null);
  this.requestPreReceptionBudgetForecastList.refresh(null);
});
}

public updateCostCenterMultiple() {

this.requestBudgetForecastMaterialCostCenterMultiple = new Array<RequestBudgetForecastMaterialCostCenterMultiple>();

this.requestPreReceptionBFMaterialCostCenterList.items.forEach(element => {
// console.log(JSON.stringify(element));
  this.requestBudgetForecastMaterialCostCenterMultiple.push(new RequestBudgetForecastMaterialCostCenterMultiple(element.id, element.multiple));
});
this.requestBFMaterialCostCenterHttpService.requestBFMaterialCostCenterMultiple(this.requestBudgetForecastMaterialCostCenterMultiple).subscribe((res) => {

  if (res.success) {
      this.notificationService.showSuccess(res.message, 'Actualizare multiplu', 0, false, 0);
      this.requestPreReceptionBudgetForecastMaterialList.refresh(null);
      this.requestPreReceptionBudgetForecastList.refresh(null);
      this.requestPreReceptionBFMaterialCostCenterList.refresh(null);

      const params: Array<Param> = new Array<Param>();
      params.push(new Param('orderId', this.order != null ? this.order.id.toString() : null));
      this.requestBFMaterialCostCenterAllList.refresh(params);

  } else {
      this.notificationService.showError(res.message, 'Eroare salvare date!', 0, false, 0);
      this.requestPreReceptionBudgetForecastMaterialList.refresh(null);
      this.requestPreReceptionBudgetForecastList.refresh(null);
      this.requestPreReceptionBFMaterialCostCenterList.refresh(null);
  }
}, (error) => {
  this.notificationService.showError('', 'Eroare server!', 0, false, 0);
  this.requestPreReceptionBudgetForecastMaterialList.refresh(null);
  this.requestPreReceptionBudgetForecastList.refresh(null);
});
}

public setSelectedWBSItem($event) {

  const requestFilter: RequestFilter = new RequestFilter();

  let selectedRequestBFMaterialCostCenters = new Array<any>();
    this.requestPreReceptionBFMaterialCostCenterList.selectedItems = selectedRequestBFMaterialCostCenters;

    let selectedRequestBudgetForecastMaterials = new Array<any>();
    this.requestPreReceptionBudgetForecastMaterialList.selectedItems = selectedRequestBudgetForecastMaterials;

  let params: Array<Param> = new Array<Param>();

  if (this.requestPreReceptionBudgetForecastList != null) {
    requestFilter.requestBudgetForecastIds = new Array<number>();
    this.requestPreReceptionBudgetForecastList.selectedItems.forEach((requestBGF) => {
        requestFilter.requestBudgetForecastIds.push(requestBGF.id);
    });
}

   params.push(new Param('jsonFilter', JSON.stringify(requestFilter)));
   params.push(new Param('orderId', this.order != null ? this.order.id.toString() : null));
   // params.push(new Param('showAll', 'false'));
  // params.push(new Param('requestBudgetForecastIds', AppUtils.getIdsList<RequestBudgetForecast, number>([
  //   this.requestBudgetForecastList.selectedItem != null ? this.requestBudgetForecastList.selectedItem : null ])));
    this.requestPreReceptionBudgetForecastMaterialList.refresh(params);

    params = new Array<Param>();
    params.push(new Param('requestBudgetForecastMaterialIds', AppUtils.getIdsList<RequestBudgetForecastMaterial, number>([
    this.requestPreReceptionBudgetForecastMaterialList.selectedItem != null ? this.requestPreReceptionBudgetForecastMaterialList.selectedItem : null ])));
    this.requestPreReceptionBFMaterialCostCenterList.refresh(params);
}



public selectEmployeeReception() {
  this.employeeReceptionListModal.show();
  let params:Array<Param> = Array<Param>();
  params.push(new Param('exceptEmployeeIds', AppUtils.getIdsList<EmployeeResource, number>(this.selectedEmployees())));
  // console.log(JSON.stringify(params));
  this.employeeReceptionList.refresh(params);
}

private selectedEmployees(): Array<EmployeeResource> {
let mappedEmployees: Array<EmployeeResource> = new Array<EmployeeResource>();

if(this.requestPreReceptionBFMaterialCostCenterList.items.length > 0) {
    this.requestPreReceptionBFMaterialCostCenterList.items.forEach(element => {
        mappedEmployees.push(element.employee);
    });
}

return mappedEmployees;
}

public setSelectedEmployeeReception() {
const items: Array<any> = this.employeeReceptionList.selectedItems;
this.employee = ((items != null) && (items.length > 0)) ? items[0] : null;
this.employeeReceptionListModal.hide();

if(this.employee != null){
let data = new RequestBFMaterialEmployeeUpdate();
data.employeeId = this.employee.id;
data.requestBFMaterialCostCenterId = this.requestPreReceptionBFMaterialCostCenterList.selectedItem.id;

this.requestBFMaterialCostCenterHttpService.updateEmployeeByRequestBudgetForecast(data)
.subscribe((res) => {
if (res.statusCode === 200) {
  this.notificationService.showSuccess('Operatia a fost finalizata cu success!', 'Actualizare utilizator mapat', 0, false, 0);
  this.requestPreReceptionBudgetForecastMaterialList.refresh(null);
  this.requestPreReceptionBFMaterialCostCenterList.refresh(null);

  const params: Array<Param> = new Array<Param>();
  params.push(new Param('orderId', this.order != null ? this.order.id.toString() : null));
  this.requestBFMaterialCostCenterAllList.refresh(params);

} else if (res.statusCode === 404) {
  this.notificationService.showError('Eroare salvare', 'Actualizare utilizator mapat', 0, false, 0);
}
}, (error) => {
  this.notificationService.showError('Eroare server', 'Actualizare utilizator mapat', 0, false, 0);
});
}
}

public savePreReception() {
  this.assetPreReception.requestBudgetForecasts = new Array<number>();
  this.isSaved = false;
 this.requestPreReceptionBudgetForecastList.selectedItems.forEach(element => {
   this.assetPreReception.requestBudgetForecasts.push(element.id);
});

 this.assetHttpService.addPreReceptionAsset(this.assetPreReception)
 .subscribe((result: CreateAssetSAPResult) => {
     if (result.success) {
         this.notificationService.showSuccess(result.errorMessage, 'Adaugare pre-receptie', 0, false, 0);
         // this.router.navigate(['/asset/reception']);
     } else if (!result.success) {
         this.notificationService.showError('Motiv: ' + result.errorMessage + '!', 'Eroare salvare date', 0, false, 0);
         this.isSaved = true;
     }
 });
}

public selectMaterial() {
  this.materialList.refresh(null);
  this.materialListModal.show();
}

public setSelectedMaterial() {
  let items: Array<Material> = this.materialList.selectedItems;
  this.material = ((items != null) && (items.length === 1)) ? items[0] : null;
  this.materialListModal.hide();
}

// PRERECEPTIE //


}

enum OperationType {
    NotSet = 1,
    AssetValidation = 2,
    Delete = 3,
    ProcessAssetOp = 4,
    DeleteRequestBFMaterialCostCenter = 5,
    DeleteRequestBFMaterialCostCenterEmployee = 6,
    DeleteOfferMaterial = 7
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

