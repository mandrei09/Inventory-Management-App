import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MasterTypeListComponent} from '../../../assets/master-types/master-type.list';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {TypeList} from '../../types/type.list';
import {SubTypeList} from '../../sub-types/sub-type.list';
import {EmployeeListComponent} from '../../employees/employee.list';
import {AccMonthListComponent} from '../../../accounting/acc-month.list';
import {PartnerListComponent} from '../../../documents/partners/partner.list';
import {AccountList} from '../../account/account.list';
import {CostCenterListComponent} from '../../cost-centers/cost-center.list';
import {AdministrationListComponent} from '../../administrations/administration.list';
import {CompanyListComponent} from '../../../assets/companies/company.list';
import {ProjectList} from '../../../assets/projects/project.list';
import {AssetTypeListComponent} from '../../../assets/asset-types/asset-type.list';
import {AppStateListComponent} from '../../../assets/app-states/app-state.list';
import {RequestList} from '../../request/request.list';
import {OrderList} from '../../order/order.list';
import {RequestBudgetForecastListComponent} from '../../request-budget-forecasts/request-budget-forecast.list';
import {DepartmentListComponent} from '../../departments/department.list';
import {DivisionListComponent} from '../../divisions/division.list';
import {AdmCenterListComponent} from '../../adm-centers/adm-center.list';
import {RegionListComponent} from '../../regions/region.list';
import {ProjectTypeListComponent} from '../../../assets/project-types/project-type.list';
import {CountryListComponent} from '../../countries/country.list';
import {ActivityList} from '../../../assets/activities/activity.list';
import {InterCompanyListComponent} from '../../../assets/inter-companies/inter-company.list';
import {BudgetOpDetailList} from '../../budget-ops/budget-op.detail.list';
import {BudgetBaseOpDetailListComponent} from '../../budget-base-ops/budget-base-op.detail.list';
import {EntityFileListComponent} from '../../../common/entity-file.list';
import {BudgetForecastListComponent} from '../budget-forecast.list';
import {AssetListComponent} from '../../../assets/assets/asset.list';
import {EntityFile} from '../../../../model/api/common/entity-file';
import {AssetSimpleDetail} from '../../../../model/api/assets/asset-simple-detail';
import {AssetInvDetail} from '../../../../model/api/assets/asset-inv-detail';
import {BudgetCorrectionSave} from '../../../../model/api/administration/budget-correction-save';
import {BudgetCorrectionValidation} from '../../../../model/api/administration/budget-correction-validation';
import {CodeNameEntity} from '../../../../model/api/common/code-name-entity';
import {Employee} from '../../../../model/api/administration/employee';
import {AccMonth} from '../../../../model/api/accounting/acc-month';
import {CodePartnerEntity} from '../../../../model/api/common/code-partner-entity';
import {BudgetBase} from '../../../../model/api/budget/budget-base';
import {Request} from '../../../../model/api/administration/request';
import {Order} from '../../../../model/api/administration/order';
import {AppData} from '../../../../app-data';
import {BudgetForecast} from '../../../../model/api/budget/budget-forecast';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { BudgetMonthBaseHttpService } from '../../../../services/http/administration/budget-month-base.http.service';
import { BudgetForecastHttpService } from '../../../../services/http/administration/budget-forecast.http.service';
import { BudgetBaseHttpService } from '../../../../services/http/administration/budget-base.http.service';
import { MasterTypeHttpService } from '../../../../services/http/assets/master-type.http.service';
import { AccountHttpService } from '../../../../services/http/administration/account.http.service';
import { TypeHttpService } from '../../../../services/http/administration/type.http.service';
import {EntityFileHttpService } from '../../../../services/http/common/entity-file.http.service';
import { BudgetBaseOpHttpService } from '../../../../services/http/administration/budget-base-op.http.service';
import { RequestBudgetForecastHttpService } from '../../../../services/http/requests/request-budget-forecast.http.service';
import { AssetHttpService } from '../../../../services/http/assets/asset.http.service';
import { NotificationService } from '../../../../services/notification.service';
import { RequestHttpService } from '../../../../services/http/administration/request.http.service';
import { OrderHttpService } from '../../../../services/http/administration/order.http.service';
import { PartnerHttpService } from '../../../../services/http/documents/partner.http.service';
import { AdministrationHttpService } from '../../../../services/http/administration/administration.http.service';
import { Param } from '../../../../model/common/param';
import { MasterType } from '../../../../model/api/assets/master-type';
import {Type} from '../../../../model/api/administration/type';
import {SubType} from '../../../../model/api/administration/sub-type';
import { Administration } from '../../../../model/api/administration/administration';
import {Company} from '../../../../model/api/assets/company';
import {Project} from '../../../../model/api/assets/project';
import { AssetType } from '../../../../model/api/assets/asset-type';
import {AppState} from '../../../../model/api/common/app-state';
import {Department} from '../../../../model/api/administration/department';
import {Division} from '../../../../model/api/administration/division';
import {AdmCenter} from '../../../../model/api/administration/adm-center';
import {Region} from '../../../../model/api/administration/region';
import {ProjectType} from '../../../../model/api/assets/project-type';
import {Country} from '../../../../model/api/assets/customer';
import {Activity} from '../../../../model/api/assets/activity';
import {InterCompany} from '../../../../model/api/assets/inter-company';
import {CostCenter} from '../../../../model/api/administration/cost-center';
import {Partner} from '../../../../model/api/documents/partner';
import {Account} from '../../../../model/api/administration/account';
import {RequestResult} from '../../../../model/api/result/request-result';
import {AppConfig} from '../../../../config';
import {SubTypeHttpService} from '../../../../services/http/administration/sub-type.http.service';
import {EmployeeHttpService} from '../../../../services/http/administration/employee.http.service';
import {AccMonthHttpService} from '../../../../services/http/accounting/acc-month.http.service';
import {CostCenterHttpService} from '../../../../services/http/administration/cost-center.http.service';
import {ProjectHttpService} from '../../../../services/http/assets/project.http.service';
import {AppStateHttpService} from '../../../../services/http/common/app-state.http.service';
import {DepartmentHttpService} from '../../../../services/http/administration/department.http.service';
import {DivisionHttpService} from '../../../../services/http/administration/division.http.service';
import {AdmCenterHttpService} from '../../../../services/http/administration/adm-center.http.service';
import {RegionHttpService} from '../../../../services/http/administration/region.http.service';
import {ProjectTypeHttpService} from '../../../../services/http/assets/project-type.http.service';
import {AssetTypeHttpService} from '../../../../services/http/assets/asset-type.http.service';
import {CountryHttpService} from '../../../../services/http/administration/contry.http.service';
import {ActivityHttpService} from '../../../../services/http/assets/activity.http.service';
import {CompanyHttpService} from '../../../../services/http/assets/company.http.service';
import {InterCompanyHttpService} from '../../../../services/http/assets/inter-company.http.service';
import {BudgetOpHttpService} from '../../../../services/http/administration/budget-op.http.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-budget-forecast-correction-dialog',
  templateUrl: './budget-forecast-correction-dialog.component.html',
  styleUrls: ['./budget-forecast-correction-dialog.component.scss']
})
export class BudgetForecastCorrectionDialogComponent implements AfterViewInit {

@ViewChild('masterTypeList') public masterTypeList: MasterTypeListComponent;
    @ViewChild('masterTypeListModal') public masterTypeListModal: ModalDirective;

    @ViewChild('typeList') public typeList: TypeList;
    @ViewChild('typeListModal') public typeListModal: ModalDirective;

    @ViewChild('subTypeList') public subTypeList: SubTypeList;
    @ViewChild('subTypeListModal') public subTypeListModal: ModalDirective;

    @ViewChild('employeeList') public employeeList: EmployeeListComponent;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

    @ViewChild('employeeSrcList') public employeeSrcList: EmployeeListComponent;
    @ViewChild('employeeSrcListModal') public employeeSrcListModal: ModalDirective;

    @ViewChild('employeeDstList') public employeeDstList: EmployeeListComponent;
    @ViewChild('employeeDstListModal') public employeeDstListModal: ModalDirective;

    @ViewChild('accMonthList') public accMonthList: AccMonthListComponent;
    @ViewChild('accMonthListModal') public accMonthListModal: ModalDirective;

    @ViewChild('partnerList') public partnerList: PartnerListComponent;
    @ViewChild('partnerListModal') public partnerListModal: ModalDirective;

    @ViewChild('accountList') public accountList: AccountList;
    @ViewChild('accountListModal') public accountListModal: ModalDirective;

    @ViewChild('costCenterList') public costCenterList: CostCenterListComponent;
    @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;

    @ViewChild('administrationList') public administrationList: AdministrationListComponent;
    @ViewChild('administrationListModal') public administrationListModal: ModalDirective;

    @ViewChild('companyList') public companyList: CompanyListComponent;
    @ViewChild('companyListModal') public companyListModal: ModalDirective;

    @ViewChild('projectList') public projectList: ProjectList;
    @ViewChild('projectListModal') public projectListModal: ModalDirective;

    @ViewChild('assetTypeList') public assetTypeList: AssetTypeListComponent;
    @ViewChild('assetTypeListModal') public assetTypeListModal: ModalDirective;

    @ViewChild('appStateList') public appStateList: AppStateListComponent;
    @ViewChild('appStateListModal') public appStateListModal: ModalDirective;

    @ViewChild('startAccMonthList') public startAccMonthList: AccMonthListComponent;
    @ViewChild('startAccMonthListModal') public startAccMonthListModal: ModalDirective;

    @ViewChild('requestList') public requestList: RequestList;
    @ViewChild('requestListModal') public requestListModal: ModalDirective;


    @ViewChild('orderList') public orderList: OrderList;
    @ViewChild('orderListModal') public orderListModal: ModalDirective;

    @ViewChild('requestBudgetForecastList') public requestBudgetForecastList: RequestBudgetForecastListComponent;
    @ViewChild('requestBudgetForecastListModal') public requestBudgetForecastListModal: ModalDirective;

    @ViewChild('requestBudgetForecastNeedBudgetList') public requestBudgetForecastNeedBudgetList: RequestBudgetForecastListComponent;


    @ViewChild('departmentList') public departmentList: DepartmentListComponent;
    @ViewChild('departmentListModal') public departmentListModal: ModalDirective;

    @ViewChild('divisionList') public divisionList: DivisionListComponent;
    @ViewChild('divisionListModal') public divisionListModal: ModalDirective;

    @ViewChild('admCenterList') public admCenterList: AdmCenterListComponent;
    @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;

    @ViewChild('regionList') public regionList: RegionListComponent;
    @ViewChild('regionListModal') public regionListModal: ModalDirective;

    @ViewChild('projectTypeList') public projectTypeList: ProjectTypeListComponent;
    @ViewChild('projectTypeListModal') public projectTypeListModal: ModalDirective;

    @ViewChild('countryList') public countryList: CountryListComponent;
    @ViewChild('countryListModal') public countryListModal: ModalDirective;

    @ViewChild('activityList') public activityList: ActivityList;
    @ViewChild('activityListModal') public activityListModal: ModalDirective;

    @ViewChild('interCompanyList') public interCompanyList: InterCompanyListComponent;
    @ViewChild('interCompanyListModal') public interCompanyListModal: ModalDirective;

    @ViewChild('budgetOpDetailList') public budgetOpList: BudgetOpDetailList;
    @ViewChild('budgetBaseOpDetailList') public budgetBaseOpList: BudgetBaseOpDetailListComponent;
    @ViewChild('budgetBaseValidatedOpDetailList') public budgetBaseOpValidatedList: BudgetBaseOpDetailListComponent;
    @ViewChild('entityFileList') public entityFileList: EntityFileListComponent;

    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
    @ViewChild('fileInput') fileInput;

    @ViewChild('budgetForecastList') public budgetForecastList: BudgetForecastListComponent;
    @ViewChild('budgetForecastListModal') public budgetForecastListModal: ModalDirective;

    @ViewChild('budgetChangeForecastList') public budgetChangeForecastList: BudgetForecastListComponent;
    @ViewChild('budgetChangeForecastListModal') public budgetChangeForecastListModal: ModalDirective;

    @ViewChild('assetList') public assetList: AssetListComponent;
    //@ViewChild('assetAgGridList') public assetAgGridList: AssetAgGridList;

    public entityTypeCode: string = 'BUDGETBASE';
    public entityFile: EntityFile = null;
    public confirmationMessage: string = '';
    public operationType: OperationType = OperationType.NotSet;

    public selectedAssets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
    public selectedAssetInvDetails: Array<AssetInvDetail> = new Array<AssetInvDetail>();

    public id: number = 0;
    public budget: BudgetCorrectionSave = new BudgetCorrectionSave();
    public budgetValidation: BudgetCorrectionValidation = new BudgetCorrectionValidation();
    public filesToUpload: Array<File>;
    public selectedAssetOp: any;
    public selectedBudgetBaseOp: any;
    public selectedBudgetBaseOpValidated: any;
    public isSaved: boolean = true;
    // pageSize = 5;
    public showValues: boolean = false;
    public resetFilters: boolean = false;

    budgetValue: any = 0;
    budgetDynamicValue: number = 0;
    budgetValueCorrection: any = 0;
    budgetDynamicValueCorrection: number = 0;

    srcValue = '';
    dstValue = '';

    // public destinationBudgetForecast: BudgetForecast = null;

    public get allowSaving(): boolean {
        return this.budget != null && this.dstResult != null && this.budgetBaseOpValidatedList != null;
    }

    public costCenter: CodeNameEntity = null;
    public employee: Employee = null;
    public employeeDst: Employee = null;
    public employeeNotifySrc: Employee = null;
    public employeeNotifyDst: Employee = null;
    public accMonth: AccMonth = null;
    public accMonthDst: AccMonth = null;
    public company: CodeNameEntity = null;
    public account: CodeNameEntity = null;
    public partner: CodePartnerEntity = null;
    public masterType: CodeNameEntity = null;
    public project: CodeNameEntity = null;
    public projectDst: CodeNameEntity = null;
    public assetType: CodeNameEntity = null;
    public assetTypeDst: CodeNameEntity = null;
    public appState: CodeNameEntity = null;
    public appStateDst: CodeNameEntity = null;
    public startAccMonth: AccMonth = null;
    public startAccMonthDst: AccMonth = null;
    public budgetBase: BudgetBase = new BudgetBase(0, '', '', null, 0, 0, null, null, null, null, null);
    public budgetBaseDst: BudgetBase = new BudgetBase(0, '', '', null, 0, 0, null, null, null, null, null);
    public request: Request = null;
    public department: CodeNameEntity = null;
    public departmentDst: CodeNameEntity = null;
    public division: CodeNameEntity = null;
    public divisionDst: CodeNameEntity = null;
    public admCenter: CodeNameEntity = null;
    public admCenterDst: CodeNameEntity = null;
    public region: CodeNameEntity = null;
    public regionDst: CodeNameEntity = null;
    public projectType: CodeNameEntity = null;
    public projectTypeDst: CodeNameEntity = null;
    public country: CodeNameEntity = null;
    public countryDst: CodeNameEntity = null;
    public activity: CodeNameEntity = null;
    public activityDst: CodeNameEntity = null;
    public interCompany: CodeNameEntity = null;
    public type: CodeNameEntity = null;
    public subType: CodeNameEntity = null;
    public administration: CodeNameEntity = null;
    public order: Order = null;
    // public requestBudgetForecast: RequestBudgetForecast = null;
    public budgetForecastId = 0;
    public readOnlyForm: boolean = false;
    public get isAdmin(): boolean { return AppData.UserIsAdmin; }

    public selectedBudgets: Array<BudgetForecast> = new Array<BudgetForecast>();
    public selectedBudgetDetails: Array<AssetInvDetail> = new Array<AssetInvDetail>();

    srcResult: any = null;
    dstResult: any = null;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public budgetForecastHttpService: BudgetForecastHttpService,
        public budgetMonthBaseHttpService: BudgetMonthBaseHttpService,
        public budgetBaseHttpService: BudgetBaseHttpService,
        public masterTypeHttpService: MasterTypeHttpService,
        public accountHttpService: AccountHttpService,
        public typeHttpService: TypeHttpService,
        public subTypeHttpService: SubTypeHttpService,
        public accMonthHttpService: AccMonthHttpService,
        public employeeHttpService: EmployeeHttpService,
        public costCenterHttpService: CostCenterHttpService,
        public projectHttpService: ProjectHttpService,
        public appStateHttpService: AppStateHttpService,
        public departmentHttpService: DepartmentHttpService,
        public divisionHttpService: DivisionHttpService,
        public admCenterHttpService: AdmCenterHttpService,
        public regionHttpService: RegionHttpService,
        public projectTypeHttpService: ProjectTypeHttpService,
        public assetTypeHttpService: AssetTypeHttpService,
        public countryHttpService: CountryHttpService,
        public activityHttpService: ActivityHttpService,
        public companyHttpService: CompanyHttpService,
        public interCompanyHttpService: InterCompanyHttpService,
        public budgetOpHttpService: BudgetOpHttpService,
        public partnerHttpService: PartnerHttpService,
        public administrationHttpService: AdministrationHttpService,
        public requestHttpService: RequestHttpService,
        public orderHttpService: OrderHttpService,
        public assetHttpService: AssetHttpService,
        public requestBudgetForecastHttpService: RequestBudgetForecastHttpService,
        public budgetBaseOpHttpService: BudgetBaseOpHttpService,
        public notificationService: NotificationService,
        public entityFileHttpService: EntityFileHttpService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        // this.route.params.subscribe((params: Params) => {
        //     if (params['id']) {
        //         this.id = +params['id'];
        //     }
        // });

        if (data && data.selectedItem) {
          this.id = +data.selectedItem?.id;
        }
    }

    ngAfterViewInit() {
        if (this.id > 0) {
            this.budgetForecastHttpService.getDetailById(this.id)
                .subscribe((budgetBase: any) => {
                    this.budgetMonthBaseHttpService.get(1, 1000, 'id', 'asc', [], null, null).subscribe( (res) => {
                         // this.asset = asset;
                       this.updateDetails(budgetBase);

                      //  if (budgetBase.validated) {
                      //      // this.refreshAssetOperations();
                      //      this.refreshBudgetBaseOperations();
                      //      // this.refreshEntityFiles();
                      //  } else {
                      //     // this.refreshAssetTypes();
                      //     // this.refreshDocumentTypes();
                      //  }
                    })
                });
        }
    }

    public refreshEntityFiles() {
        const params: Array<Param> = new Array<Param>();

        params.push(new Param('entityTypeCode', 'ASSET'));
        params.push(new Param('entityId', this.budget.id.toString()));

        this.entityFileList.refresh(params);
    }

    // public refreshAssetOperations() {
    //     const params: Array<Param> = new Array<Param>();

    //     params.push(new Param('assetId', this.id.toString()));
    //     this.budgetOpList.refresh(params);
    // }

    public refreshBudgetBaseOperations() {
        const params: Array<Param> = new Array<Param>();
        params.push(new Param('budgetForecastId', this.id.toString()));
        this.budgetBaseOpList.refresh(params);
    }

    public refreshBudgetBaseValidatedOperations() {
      const params: Array<Param> = new Array<Param>();
      params.push(new Param('budgetForecastId', this.id.toString()));
      this.budgetBaseOpValidatedList.refresh(params);
  }

    public refreshBudgetBaseAcquisitions() {
      const params: Array<Param> = new Array<Param>();
      params.push(new Param('bFId', this.id.toString()));
      this.assetList.refresh(params);
  }

  public refreshRequestBudgetForecastNeedBudgets() {
    const params = new Array<Param>();
    params.push(new Param('needBudget', 'true'));
    params.push(new Param('budgetForecastIds', this.id.toString()));


    this.requestBudgetForecastNeedBudgetList.refresh(params);
}

//   public refreshBudgetBaseAgGridAcquisitions() {
//     const params: Array<Param> = new Array<Param>();
//     params.push(new Param('bFId', this.id.toString()));
//     this.assetAgGridList.refresh(params);
// }

    public updateDetails(budget: any) {
        this.budget.id = budget.id;
        this.budget.code = budget.code;
        this.budget.name = budget.name;
        this.budget.info = budget.info;
        this.budgetBase.id = budget.id;
        this.budgetBase.code = budget.code;
        this.budget.info = budget.info;
        this.employee = budget.employee;
        this.project = budget.project;
        this.country = budget.country;
        this.activity = budget.activity;
        this.department = budget.department;
        this.admCenter = budget.admCenter;
        this.region = budget.region;
        this.division = budget.division;
        this.projectType = budget.projectType;
        this.assetType = budget.assetType;
        this.appState = budget.appState;
        this.startAccMonth = budget.startMonth;

        this.budget.aprilForecast = budget.april;
        this.budget.mayForecast = budget.may;
        this.budget.juneForecast = budget.june;
        this.budget.julyForecast = budget.july;
        this.budget.augustForecast = budget.august;
        this.budget.septemberForecast = budget.september;
        this.budget.octomberForecast = budget.octomber;
        this.budget.novemberForecast = budget.november;
        this.budget.decemberForecast = budget.december;
        this.budget.januaryForecast = budget.january;
        this.budget.februaryForecast = budget.february;
        this.budget.marchForecast = budget.march;
        this.budget.totalForecast = budget.total;

        this.budget.importValueOrder = budget.importValueOrder;
        this.budget.valueOrder = budget.valueOrder;
        this.budget.valueAsset = budget.valueAsset;
        this.budget.valueAssetYTD = budget.valueAssetYTD;
        this.budget.valueAssetYTG = budget.valueAssetYTG;
        this.budget.totalRem = budget.totalRem;

        this.budgetForecastId = budget.id;

        this.refreshBudgetBaseOperations();
        this.refreshBudgetBaseValidatedOperations();

        this.srcValue = budget.code;
    }

    public updateDstDetails(budgetDst: any) {

      this.employeeDst = budgetDst.employee;
      this.projectDst = budgetDst.project;
      this.countryDst = budgetDst.country;
      this.activityDst = budgetDst.activity;
      this.departmentDst = budgetDst.department;
      this.admCenterDst = budgetDst.admCenter;
      this.regionDst = budgetDst.region;
      this.divisionDst = budgetDst.division;
      this.projectTypeDst = budgetDst.projectType;
      this.assetTypeDst = budgetDst.assetType;
      this.appStateDst = budgetDst.appState;
      this.startAccMonthDst = budgetDst.startMonth;

      this.budgetBaseDst.code = budgetDst.budgetBase.code;
      this.budgetBaseDst.info = budgetDst.budgetBase.info;
      this.budgetBaseDst.depPeriod = budgetDst.depPeriod;
      this.budgetBaseDst.depPeriodRem = budgetDst.depPeriodRem;
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

              /*begin ASSETTYPE */

              public selectAssetType() {

                this.assetTypeList.refresh(null);
                this.assetTypeListModal.show();
            }
            public setSelectedAssetType() {
                const items: Array<AssetType> = this.assetTypeList.selectedItems;
                this.assetType = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.assetTypeListModal.hide();
            }

            /*end ASSETTYPE */

             /*begin APPSTATE */

             public selectAppState() {

                const params: Array<Param> = new Array<Param>();

                params.push(new Param('parentCode', 'BUDGETBASE'));

                this.appStateList.refresh(params);
                this.appStateListModal.show();
            }
            public setSelectedAppState() {
                const items: Array<AppState> = this.appStateList.selectedItems;
                this.appState = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.appStateListModal.hide();
            }

            /*end APPSTATE */

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

             /*begin REQUEST */

             public selectRequest() {

                this.requestList.refresh(null);
                this.requestListModal.show();
            }
            public setSelectedRequest() {
                const items: Array<Request> = this.requestList.selectedItems;
                this.request = ((items != null) && (items.length === 1)) ? items[0] : null;

                if (this.request != null) {
                    this.budget.info = this.request.info;
                }

                if (this.request != null  && this.request.costCenter != null) {
                    this.costCenter = this.request.costCenter;
                }

                if (this.request != null  && this.request.employee != null) {
                    this.employee = this.request.employee;
                }

                // if (this.request != null  && this.request.project != null) {
                //     this.project = this.request.project;
                // }

                //   if (this.request != null  && this.request.country != null) {
                //     this.country = this.request.country;
                // }


                if (this.request != null && this.request.department != null) {
                    this.department = this.request.department;
                }

                if (this.request != null && this.request.division != null) {
                    this.division = this.request.division;
                }

                if (this.request != null && this.request.admCenter != null) {
                    this.admCenter = this.request.admCenter;
                }

                if (this.request != null && this.request.projectType != null) {
                    this.projectType = this.request.projectType;
                }

                if (this.request != null && this.request.assetType != null) {
                    this.assetType = this.request.assetType;
                }

                if (this.request != null && this.request.info != null) {
                    this.budget.info = this.request.info;
                }

                this.requestListModal.hide();
            }

            /*end REQUEST */

              /*begin ORDER */

              public selectOrder() {

                this.orderList.refresh(null);
                this.orderListModal.show();
            }
            public setSelectedOrder() {
                const items: Array<Order> = this.orderList.selectedItems;
                this.order = ((items != null) && (items.length === 1)) ? items[0] : null;

                this.orderListModal.hide();
            }

            /*end ORDER */

          // /*end REQUEST BUDGET FORECAST */

              /*begin DEPARTMENT */

              public selectDepartment() {

                this.departmentList.refresh(null);
                this.departmentListModal.show();
            }
            public setSelectedDepartment() {
                const items: Array<Department> = this.departmentList.selectedItems;
                this.department = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.departmentListModal.hide();
            }

            /*end DEPARTMENT */

               /*begin DIVISION */

               public selectDivision() {

                this.divisionList.refresh(null);
                this.divisionListModal.show();
            }
            public setSelectedDivision() {
                const items: Array<Division> = this.divisionList.selectedItems;
                this.division = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.divisionListModal.hide();
            }

            /*end DIVISION */

             /*begin ADMCENTER */

             public selectAdmCenter() {

                this.admCenterList.refresh(null);
                this.admCenterListModal.show();
            }
            public setSelectedAdmCenter() {
                const items: Array<AdmCenter> = this.admCenterList.selectedItems;
                this.admCenter = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.admCenterListModal.hide();
            }

            /*end ADMCENTER */

             /*begin REGION */

             public selectRegion() {

              this.regionList.refresh(null);
              this.regionListModal.show();
          }
          public setSelectedRegion() {
              const items: Array<Region> = this.regionList.selectedItems;
              this.region = ((items != null) && (items.length === 1)) ? items[0] : null;
              this.regionListModal.hide();
          }

          /*end REGION */

             /*begin PROJECTTYPE */

             public selectProjectType() {

                this.projectTypeList.refresh(null);
                this.projectTypeListModal.show();
            }
            public setSelectedProjectType() {
                const items: Array<ProjectType> = this.projectTypeList.selectedItems;
                this.projectType = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.projectTypeListModal.hide();
            }

            /*end PROJECTTYPE */


             /*begin COUNTRY */
             public selectCountry() {

                this.countryList.refresh(null);
                this.countryListModal.show();
            }
            public setSelectedCountry() {
                const items: Array<Country> = this.countryList.selectedItems;
                // @ts-ignore
                this.country = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.countryListModal.hide();
            }

            /*end ACTIVITY */

               /*begin COUNTRY */
               public selectActivity() {

                this.activityList.refresh(null);
                this.activityListModal.show();
            }
            public setSelectedActivity() {
                const items: Array<Activity> = this.activityList.selectedItems;
                this.activity = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.activityListModal.hide();
            }

            /*end ACTIVITY */

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

    /*begin employee src*/
    public selectSrcEmployee() {
      this.employeeSrcList.refresh(null);
      this.employeeSrcListModal.show();
  }

  public setSelectedSrcEmployee() {
      const items: Array<Employee> = this.employeeSrcList.selectedItems;
      this.employeeNotifySrc = ((items != null) && (items.length === 1)) ? items[0] : null;
      this.employeeSrcListModal.hide();
  }
  /*end employee src*/


    /*begin employee dst*/
    public selectDstEmployee() {
      this.employeeDstList.refresh(null);
      this.employeeDstListModal.show();
  }

  public setSelectedDstEmployee() {
      const items: Array<Employee> = this.employeeDstList.selectedItems;
      this.employeeNotifyDst = ((items != null) && (items.length === 1)) ? items[0] : null;
      this.employeeDstListModal.hide();
  }
  /*end employee src*/

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

    /*end partner*/


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
      // this.location.back();
        // this.ngLocation.back();
        //this.router.navigate(['/budget/status']);
    }

    public onDeleteAsset() {
        this.operationType = OperationType.Delete;
        this.confirmationMessage = 'Stergeti inregistrarea curenta?';
        this.confirmationModal.show();
    }

    public deleteAsset() {
        this.budgetBaseHttpService.delete(this.budget.id)
            .subscribe(() => this.router.navigate(['/assetdepdetails']));
    }

    public onValidateAsset() {
        this.operationType = OperationType.AssetValidation;
        this.confirmationMessage = 'Validati inregistrarea curenta?';
        this.confirmationModal.show();
    }

    // public validateBudget() {
    //     this.budget.validated = true;
    //     this.saveBudget();
    // }

    public addNewOperation() {
        // let assets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
        // assets.push(new AssetSimpleDetail(this.asset.id, this.asset.invNo, this.asset.assetName,
        //     '', this.asset.partner, this.asset.assetType, this.asset.accState, this.asset.usageStartDate, '', ''));
        // AppData.AssetList = assets;
        // this.router.navigate(['/newoperation']);
    }


    public saveBudget() {
        this.budgetValidation.budgetBaseOpId = this.selectedBudgetBaseOpValidated.id;

        if (this.budget.id > 0) {
             this.budgetForecastHttpService.correctionValidateBudgetForecast(this.budgetValidation)
            .subscribe((res: RequestResult) => {
              if(res.success){
                this.notificationService.showSuccess(res.message, 'Validare corectie buget', 2000, true, 0);
                this.budgetBaseHttpService.getDetailById(this.budget.id)
                .subscribe((asset: any) => {
                    if (asset != null) {
                        this.isSaved = true;
                        this.router.navigate['/budget/forecast'];
                        this.updateDetails(asset);
                    }
                }, (error) => {
                    alert('Eroare la salvarea datelor!');
                });
              }

            }, (error) => {
                alert('Eroare server!');
            });
        }
    }

    public onConfirmationApproved() {

        switch (this.operationType) {
            // case OperationType.AssetValidation:
            //     this.validateBudget();
            //     break;
            case OperationType.Delete:
                this.deleteAsset();
                break;
            case OperationType.ProcessAssetOp:
                this.processAssetOp();
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

    public async onAssetOpDetailListSelectionChanged(assetOpDetails: Array<any>) {
        this.selectedAssetOp = this.budgetOpList.selectedItem;
    }

    public async onBudgetBaseOpDetailListSelectionChanged(assetOpDetails: Array<any>) {
        this.selectedBudgetBaseOp = this.budgetBaseOpList.selectedItem;
    }


    public async onBudgetBaseOpValidatedDetailListSelectionChanged(assetOpDetails: Array<any>) {
      this.selectedBudgetBaseOpValidated= null;
      this.srcResult = null;
      this.dstResult = null;
      this.budgetValueCorrection = 0;
      this.budgetDynamicValueCorrection = 0;
      this.selectedBudgetBaseOpValidated = this.budgetBaseOpValidatedList.selectedItem;




      //console.log(this.selectedBudgetBaseOpValidated);

      if(this.selectedBudgetBaseOpValidated != null){

       this.srcResult = await this.budgetForecastHttpService.getDetailById(this.selectedBudgetBaseOpValidated.budgetForecastId).toPromise();
       this.dstResult = await this.budgetForecastHttpService.getDetailById(this.selectedBudgetBaseOpValidated.budgetForecastFinId).toPromise();


        this.budget.aprilForecastDestination = this.dstResult.april;
        this.budget.mayForecastDestination = this.dstResult.may;
        this.budget.juneForecastDestination = this.dstResult.june;
        this.budget.julyForecastDestination = this.dstResult.july;
        this.budget.augustForecastDestination = this.dstResult.august;
        this.budget.septemberForecastDestination = this.dstResult.september;
        this.budget.octomberForecastDestination = this.dstResult.octomber;
        this.budget.novemberForecastDestination = this.dstResult.november;
        this.budget.decemberForecastDestination = this.dstResult.december;
        this.budget.januaryForecastDestination = this.dstResult.january;
        this.budget.februaryForecastDestination = this.dstResult.february;
        this.budget.marchForecastDestination = this.dstResult.march;

        this.budget.aprilForecastSrcNew = this.selectedBudgetBaseOpValidated.aprilIni;
        this.budget.mayForecastSrcNew = this.selectedBudgetBaseOpValidated.mayIni;
        this.budget.juneForecastSrcNew = this.selectedBudgetBaseOpValidated.juneIni;
        this.budget.julyForecastSrcNew = this.selectedBudgetBaseOpValidated.julyIni;
        this.budget.augustForecastSrcNew = this.selectedBudgetBaseOpValidated.augustIni;
        this.budget.septemberForecastSrcNew = this.selectedBudgetBaseOpValidated.septemberIni;
        this.budget.octomberForecastSrcNew = this.selectedBudgetBaseOpValidated.octomberIni;
        this.budget.novemberForecastSrcNew = this.selectedBudgetBaseOpValidated.novemberIni;
        this.budget.decemberForecastSrcNew = this.selectedBudgetBaseOpValidated.decemberIni;
        this.budget.januaryForecastSrcNew = this.selectedBudgetBaseOpValidated.januaryIni;
        this.budget.februaryForecastSrcNew = this.selectedBudgetBaseOpValidated.februaryIni;
        this.budget.marchForecastSrcNew = this.selectedBudgetBaseOpValidated.marchIni;

        this.budget.aprilForecastDstNew = this.selectedBudgetBaseOpValidated.aprilFin;
        this.budget.mayForecastDstNew = this.selectedBudgetBaseOpValidated.mayFin;
        this.budget.juneForecastDstNew = this.selectedBudgetBaseOpValidated.juneFin;
        this.budget.julyForecastDstNew = this.selectedBudgetBaseOpValidated.julyFin;
        this.budget.augustForecastDstNew = this.selectedBudgetBaseOpValidated.augustFin;
        this.budget.septemberForecastDstNew = this.selectedBudgetBaseOpValidated.septemberFin;
        this.budget.octomberForecastDstNew = this.selectedBudgetBaseOpValidated.octomberFin;
        this.budget.novemberForecastDstNew = this.selectedBudgetBaseOpValidated.novemberFin;
        this.budget.decemberForecastDstNew = this.selectedBudgetBaseOpValidated.decemberFin;
        this.budget.januaryForecastDstNew = this.selectedBudgetBaseOpValidated.januaryFin;
        this.budget.februaryForecastDstNew = this.selectedBudgetBaseOpValidated.februaryFin;
        this.budget.marchForecastDstNew = this.selectedBudgetBaseOpValidated.marchFin;


        this.budget.totalForecastDestination = this.dstResult.total;
        this.budget.totalRemDestination = this.dstResult.totalRem;

        this.budget.importValueOrderDestination = this.dstResult.importValueOrder;
        this.budget.valueAssetYTDDestination = this.dstResult.valueAssetYTD;
        this.budget.valueAssetYTGDestination = this.dstResult.valueAssetYTG;

        this.budget.valueOrderDestination = this.dstResult.valueOrder;


        // this.budgetDynamicValue = Number(this.precise_round((this.budget.aprilForecast + this.budget.mayForecast + this.budget.juneForecast + this.budget.julyForecast +
        //   this.budget.augustForecast + this.budget.septemberForecast + this.budget.octomberForecast + this.budget.novemberForecast +
        //   this.budget.decemberForecast + this.budget.januaryForecast + this.budget.februaryForecast + this.budget.marchForecast), 2));

        this.dstValue = this.dstResult?.budgetBase?.code;

        this.budgetDynamicValue = this.budget.totalRem;
        this.budgetValueCorrection = this.dstResult?.totalRem;

        this.updateDstDetails(this.dstResult);

      }
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

    public parseDate(dateString: string): Date {
        if (dateString) {
            return new Date(dateString);
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
        this.budgetBaseOpHttpService.process(this.budgetBaseOpList.selectedItem.id).subscribe((data) => {
            this.refreshBudgetBaseOperations();
        });
    }

     /*begin BUDGET BASE */
     public selectBudgetBase() {

        this.budgetForecastList.refresh(null);
        this.budgetForecastListModal.show();
    }
    public setSelectedBudgetBase() {
        const items: Array<BudgetBase> = this.budgetForecastList.selectedItems;
        this.budgetBase = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.budgetForecastListModal.hide();
    }

    /*end BUDGET  BASE*/

    valueChangeApril(value) {
         this.budgetValue = 0;
         this.budgetDynamicValue = 0;
         this.budget.aprilForecast = value;
         this.budgetDynamicValue = Number(this.precise_round((this.budget.aprilForecast + this.budget.mayForecast + this.budget.juneForecast + this.budget.julyForecast +
                                        this.budget.augustForecast + this.budget.septemberForecast + this.budget.octomberForecast + this.budget.novemberForecast +
                                        this.budget.decemberForecast + this.budget.januaryForecast + this.budget.februaryForecast + this.budget.marchForecast), 2));
        this.budgetValue = this.precise_round((this.budget.totalRem - this.budgetDynamicValue), 2);

    }

    valueChangeMay(value) {
      this.budgetValue = 0;
      this.budgetDynamicValue = 0;
      this.budget.mayForecast = value;
      this.budgetDynamicValue = Number(this.precise_round((this.budget.aprilForecast + this.budget.mayForecast + this.budget.juneForecast + this.budget.julyForecast +
                                     this.budget.augustForecast + this.budget.septemberForecast + this.budget.octomberForecast + this.budget.novemberForecast +
                                     this.budget.decemberForecast + this.budget.januaryForecast + this.budget.februaryForecast + this.budget.marchForecast), 2));
     this.budgetValue = this.precise_round((this.budget.totalRem - this.budgetDynamicValue), 2);
    }

    valueChangeJune(value) {
      this.budgetValue = 0;
      this.budgetDynamicValue = 0;
      this.budget.juneForecast = value;
      this.budgetDynamicValue = Number(this.precise_round((this.budget.aprilForecast + this.budget.mayForecast + this.budget.juneForecast + this.budget.julyForecast +
                                     this.budget.augustForecast + this.budget.septemberForecast + this.budget.octomberForecast + this.budget.novemberForecast +
                                     this.budget.decemberForecast + this.budget.januaryForecast + this.budget.februaryForecast + this.budget.marchForecast), 2));
     this.budgetValue = this.precise_round((this.budget.totalRem - this.budgetDynamicValue), 2);
    }

    valueChangeJuly(value) {
        // console.log(value);
        this.budgetValue = 0;
         this.budgetDynamicValue = 0;
         this.budget.julyForecast = value;
         this.budgetDynamicValue = Number(this.precise_round((this.budget.aprilForecast + this.budget.mayForecast + this.budget.juneForecast + this.budget.julyForecast +
                                        this.budget.augustForecast + this.budget.septemberForecast + this.budget.octomberForecast + this.budget.novemberForecast +
                                        this.budget.decemberForecast + this.budget.januaryForecast + this.budget.februaryForecast + this.budget.marchForecast), 2));
        this.budgetValue = this.precise_round((this.budget.totalRem - this.budgetDynamicValue), 2);
    }

    valueChangeAugust(value) {
      this.budgetValue = 0;
      this.budgetDynamicValue = 0;
      this.budget.augustForecast = value;
      this.budgetDynamicValue = Number(this.precise_round((this.budget.aprilForecast + this.budget.mayForecast + this.budget.juneForecast + this.budget.julyForecast +
                                     this.budget.augustForecast + this.budget.septemberForecast + this.budget.octomberForecast + this.budget.novemberForecast +
                                     this.budget.decemberForecast + this.budget.januaryForecast + this.budget.februaryForecast + this.budget.marchForecast), 2));
     this.budgetValue = this.precise_round((this.budget.totalRem - this.budgetDynamicValue), 2);
    }

    valueChangeSeptember(value) {
      this.budgetValue = 0;
      this.budgetDynamicValue = 0;
      this.budget.septemberForecast = value;
      this.budgetDynamicValue = Number(this.precise_round((this.budget.aprilForecast + this.budget.mayForecast + this.budget.juneForecast + this.budget.julyForecast +
                                     this.budget.augustForecast + this.budget.septemberForecast + this.budget.octomberForecast + this.budget.novemberForecast +
                                     this.budget.decemberForecast + this.budget.januaryForecast + this.budget.februaryForecast + this.budget.marchForecast), 2));
     this.budgetValue = this.precise_round((this.budget.totalRem - this.budgetDynamicValue), 2);
    }

    valueChangeOctomber(value) {
      this.budgetValue = 0;
      this.budgetDynamicValue = 0;
      this.budget.octomberForecast = value;
      this.budgetDynamicValue = Number(this.precise_round((this.budget.aprilForecast + this.budget.mayForecast + this.budget.juneForecast + this.budget.julyForecast +
                                     this.budget.augustForecast + this.budget.septemberForecast + this.budget.octomberForecast + this.budget.novemberForecast +
                                     this.budget.decemberForecast + this.budget.januaryForecast + this.budget.februaryForecast + this.budget.marchForecast), 2));
     this.budgetValue = this.precise_round((this.budget.totalRem - this.budgetDynamicValue), 2);
    }

    valueChangeNovember(value) {
      this.budgetValue = 0;
      this.budgetDynamicValue = 0;
      this.budget.novemberForecast = value;
      this.budgetDynamicValue = Number(this.precise_round((this.budget.aprilForecast + this.budget.mayForecast + this.budget.juneForecast + this.budget.julyForecast +
                                     this.budget.augustForecast + this.budget.septemberForecast + this.budget.octomberForecast + this.budget.novemberForecast +
                                     this.budget.decemberForecast + this.budget.januaryForecast + this.budget.februaryForecast + this.budget.marchForecast), 2));
     this.budgetValue = this.precise_round((this.budget.totalRem - this.budgetDynamicValue), 2);
    }

    valueChangeDecember(value) {
      this.budgetValue = 0;
      this.budgetDynamicValue = 0;
      this.budget.decemberForecast = value;
      this.budgetDynamicValue = Number(this.precise_round((this.budget.aprilForecast + this.budget.mayForecast + this.budget.juneForecast + this.budget.julyForecast +
                                     this.budget.augustForecast + this.budget.septemberForecast + this.budget.octomberForecast + this.budget.novemberForecast +
                                     this.budget.decemberForecast + this.budget.januaryForecast + this.budget.februaryForecast + this.budget.marchForecast), 2));
     this.budgetValue = this.precise_round((this.budget.totalRem - this.budgetDynamicValue), 2);
    }

    valueChangeJanuary(value) {
      this.budgetValue = 0;
      this.budgetDynamicValue = 0;
      this.budget.januaryForecast = value;
      this.budgetDynamicValue = Number(this.precise_round((this.budget.aprilForecast + this.budget.mayForecast + this.budget.juneForecast + this.budget.julyForecast +
                                     this.budget.augustForecast + this.budget.septemberForecast + this.budget.octomberForecast + this.budget.novemberForecast +
                                     this.budget.decemberForecast + this.budget.januaryForecast + this.budget.februaryForecast + this.budget.marchForecast), 2));
     this.budgetValue = this.precise_round((this.budget.totalRem - this.budgetDynamicValue), 2);
    }

    valueChangeFebruary(value) {
      this.budgetValue = 0;
      this.budgetDynamicValue = 0;
      this.budget.februaryForecast = value;
      this.budgetDynamicValue = Number(this.precise_round((this.budget.aprilForecast + this.budget.mayForecast + this.budget.juneForecast + this.budget.julyForecast +
                                     this.budget.augustForecast + this.budget.septemberForecast + this.budget.octomberForecast + this.budget.novemberForecast +
                                     this.budget.decemberForecast + this.budget.januaryForecast + this.budget.februaryForecast + this.budget.marchForecast), 2));
     this.budgetValue = this.precise_round((this.budget.totalRem - this.budgetDynamicValue), 2);
    }

    valueChangeMarch(value) {
      this.budgetValue = 0;
      this.budgetDynamicValue = 0;
      this.budget.marchForecast = value;
      this.budgetDynamicValue = Number(this.precise_round((this.budget.aprilForecast + this.budget.mayForecast + this.budget.juneForecast + this.budget.julyForecast +
                                     this.budget.augustForecast + this.budget.septemberForecast + this.budget.octomberForecast + this.budget.novemberForecast +
                                     this.budget.decemberForecast + this.budget.januaryForecast + this.budget.februaryForecast + this.budget.marchForecast), 2));
     this.budgetValue = this.precise_round((this.budget.totalRem - this.budgetDynamicValue), 2);
    }

    // Destination //

    valueChangeDestinationApril(value) {
      this.budgetValueCorrection = 0;
      this.budgetDynamicValueCorrection = 0;
      this.budget.aprilForecastDstNew = value;
      this.budgetDynamicValueCorrection = Number(this.precise_round((this.budget.aprilForecastDstNew + this.budget.mayForecastDstNew + this.budget.juneForecastDstNew + this.budget.julyForecastDstNew +
      this.budget.augustForecastDstNew + this.budget.septemberForecastDstNew + this.budget.octomberForecastDstNew + this.budget.novemberForecastDstNew +
      this.budget.decemberForecastDstNew + this.budget.januaryForecastDstNew + this.budget.februaryForecastDstNew + this.budget.marchForecastDstNew), 2));
      //this.budgetValueCorrection = this.precise_round((this.budget.totalRemDestination + this.budgetDynamicValueCorrection), 2);
      this.budgetValueCorrection = this.budget.totalRemDestination + this.budgetDynamicValueCorrection;


      //- this.budget.totalRemDestination - this.budget.importValueOrderDestination - this.budget.valueAssetYDTDestination - this.budget.valueAssetYTGDestination
  }

  valueChangeDestinationMay(value) {
    this.budgetValueCorrection = 0;
    this.budgetDynamicValueCorrection = 0;
    this.budget.mayForecastDstNew = value;
    this.budgetDynamicValueCorrection = Number(this.precise_round((this.budget.aprilForecastDstNew + this.budget.mayForecastDstNew + this.budget.juneForecastDstNew + this.budget.julyForecastDstNew +
      this.budget.augustForecastDstNew + this.budget.septemberForecastDstNew + this.budget.octomberForecastDstNew + this.budget.novemberForecastDstNew +
      this.budget.decemberForecastDstNew + this.budget.januaryForecastDstNew + this.budget.februaryForecastDstNew + this.budget.marchForecastDstNew), 2));
       //this.budgetValueCorrection = this.precise_round((this.budget.totalRemDestination + this.budgetDynamicValueCorrection), 2);
       this.budgetValueCorrection = this.budget.totalRemDestination + this.budgetDynamicValueCorrection;
  }

  valueChangeDestinationJune(value) {
    this.budgetValueCorrection = 0;
    this.budgetDynamicValueCorrection = 0;
    this.budget.juneForecastDstNew = value;
    this.budgetDynamicValueCorrection = Number(this.precise_round((this.budget.aprilForecastDstNew + this.budget.mayForecastDstNew + this.budget.juneForecastDstNew + this.budget.julyForecastDstNew +
      this.budget.augustForecastDstNew + this.budget.septemberForecastDstNew + this.budget.octomberForecastDstNew + this.budget.novemberForecastDstNew +
      this.budget.decemberForecastDstNew + this.budget.januaryForecastDstNew + this.budget.februaryForecastDstNew + this.budget.marchForecastDstNew), 2));
      //this.budgetValueCorrection = this.precise_round((this.budget.totalRemDestination + this.budgetDynamicValueCorrection), 2);
      this.budgetValueCorrection = this.budget.totalRemDestination + this.budgetDynamicValueCorrection;
  }

  valueChangeDestinationJuly(value) {
    this.budgetValueCorrection = 0;
    this.budgetDynamicValueCorrection = 0;
    this.budget.julyForecastDstNew = value;
    this.budgetDynamicValueCorrection = Number(this.precise_round((this.budget.aprilForecastDstNew + this.budget.mayForecastDstNew + this.budget.juneForecastDstNew + this.budget.julyForecastDstNew +
      this.budget.augustForecastDstNew + this.budget.septemberForecastDstNew + this.budget.octomberForecastDstNew + this.budget.novemberForecastDstNew +
      this.budget.decemberForecastDstNew + this.budget.januaryForecastDstNew + this.budget.februaryForecastDstNew + this.budget.marchForecastDstNew), 2));
       //this.budgetValueCorrection = this.precise_round((this.budget.totalRemDestination + this.budgetDynamicValueCorrection), 2);
       this.budgetValueCorrection = this.budget.totalRemDestination + this.budgetDynamicValueCorrection;
  }

  valueChangeDestinationAugust(value) {
    this.budgetValueCorrection = 0;
    this.budgetDynamicValueCorrection = 0;
    this.budget.augustForecastDstNew = value;
    this.budgetDynamicValueCorrection = Number(this.precise_round((this.budget.aprilForecastDstNew + this.budget.mayForecastDstNew + this.budget.juneForecastDstNew + this.budget.julyForecastDstNew +
      this.budget.augustForecastDstNew + this.budget.septemberForecastDstNew + this.budget.octomberForecastDstNew + this.budget.novemberForecastDstNew +
      this.budget.decemberForecastDstNew + this.budget.januaryForecastDstNew + this.budget.februaryForecastDstNew + this.budget.marchForecastDstNew), 2));
       //this.budgetValueCorrection = this.precise_round((this.budget.totalRemDestination + this.budgetDynamicValueCorrection), 2);
       this.budgetValueCorrection = this.budget.totalRemDestination + this.budgetDynamicValueCorrection;
  }

  valueChangeDestinationSeptember(value) {
    this.budgetValueCorrection = 0;
    this.budgetDynamicValueCorrection = 0;
    this.budget.septemberForecastDstNew = value;
    this.budgetDynamicValueCorrection = Number(this.precise_round((this.budget.aprilForecastDstNew + this.budget.mayForecastDstNew + this.budget.juneForecastDstNew + this.budget.julyForecastDstNew +
      this.budget.augustForecastDstNew + this.budget.septemberForecastDstNew + this.budget.octomberForecastDstNew + this.budget.novemberForecastDstNew +
      this.budget.decemberForecastDstNew + this.budget.januaryForecastDstNew + this.budget.februaryForecastDstNew + this.budget.marchForecastDstNew), 2));
       //this.budgetValueCorrection = this.precise_round((this.budget.totalRemDestination + this.budgetDynamicValueCorrection), 2);
       this.budgetValueCorrection = this.budget.totalRemDestination + this.budgetDynamicValueCorrection;
  }

  valueChangeDestinationOctomber(value) {
    this.budgetValueCorrection = 0;
    this.budgetDynamicValueCorrection = 0;
    this.budget.octomberForecastDstNew = value;
    this.budgetDynamicValueCorrection = Number(this.precise_round((this.budget.aprilForecastDstNew + this.budget.mayForecastDstNew + this.budget.juneForecastDstNew + this.budget.julyForecastDstNew +
      this.budget.augustForecastDstNew + this.budget.septemberForecastDstNew + this.budget.octomberForecastDstNew + this.budget.novemberForecastDstNew +
      this.budget.decemberForecastDstNew + this.budget.januaryForecastDstNew + this.budget.februaryForecastDstNew + this.budget.marchForecastDstNew), 2));
      //this.budgetValueCorrection = this.precise_round((this.budget.totalRemDestination + this.budgetDynamicValueCorrection), 2);
      this.budgetValueCorrection = this.budget.totalRemDestination + this.budgetDynamicValueCorrection;
  }

  valueChangeDestinationNovember(value) {
    this.budgetValueCorrection = 0;
    this.budgetDynamicValueCorrection = 0;
    this.budget.novemberForecastDstNew = value;
    this.budgetDynamicValueCorrection = Number(this.precise_round((this.budget.aprilForecastDstNew + this.budget.mayForecastDstNew + this.budget.juneForecastDstNew + this.budget.julyForecastDstNew +
      this.budget.augustForecastDstNew + this.budget.septemberForecastDstNew + this.budget.octomberForecastDstNew + this.budget.novemberForecastDstNew +
      this.budget.decemberForecastDstNew + this.budget.januaryForecastDstNew + this.budget.februaryForecastDstNew + this.budget.marchForecastDstNew), 2));
      //this.budgetValueCorrection = this.precise_round((this.budget.totalRemDestination + this.budgetDynamicValueCorrection), 2);
      this.budgetValueCorrection = this.budget.totalRemDestination + this.budgetDynamicValueCorrection;
  }

  valueChangeDestinationDecember(value) {
    this.budgetValueCorrection = 0;
    this.budgetDynamicValueCorrection = 0;
    this.budget.decemberForecastDstNew = value;
    this.budgetDynamicValueCorrection = Number(this.precise_round((this.budget.aprilForecastDstNew + this.budget.mayForecastDstNew + this.budget.juneForecastDstNew + this.budget.julyForecastDstNew +
      this.budget.augustForecastDstNew + this.budget.septemberForecastDstNew + this.budget.octomberForecastDstNew + this.budget.novemberForecastDstNew +
      this.budget.decemberForecastDstNew + this.budget.januaryForecastDstNew + this.budget.februaryForecastDstNew + this.budget.marchForecastDstNew), 2));
       //this.budgetValueCorrection = this.precise_round((this.budget.totalRemDestination + this.budgetDynamicValueCorrection), 2);
       this.budgetValueCorrection = this.budget.totalRemDestination + this.budgetDynamicValueCorrection;
  }

  valueChangeDestinationJanuary(value) {
    this.budgetValueCorrection = 0;
    this.budgetDynamicValueCorrection = 0;
    this.budget.januaryForecastDstNew = value;
    this.budgetDynamicValueCorrection = Number(this.precise_round((this.budget.aprilForecastDstNew + this.budget.mayForecastDstNew + this.budget.juneForecastDstNew + this.budget.julyForecastDstNew +
      this.budget.augustForecastDstNew + this.budget.septemberForecastDstNew + this.budget.octomberForecastDstNew + this.budget.novemberForecastDstNew +
      this.budget.decemberForecastDstNew + this.budget.januaryForecastDstNew + this.budget.februaryForecastDstNew + this.budget.marchForecastDstNew), 2));
       this.budgetValueCorrection = this.precise_round((this.budget.totalRemDestination + this.budgetDynamicValueCorrection), 2);
       //this.budgetValueCorrection = Math.floor(this.budget.totalRemDestination + this.budgetDynamicValueCorrection);
       console.log(this.budgetValueCorrection);
  }

  valueChangeDestinationFebruary(value) {
    this.budgetValueCorrection = 0;
    this.budgetDynamicValueCorrection = 0;
    this.budget.februaryForecastDstNew = value;
    this.budgetDynamicValueCorrection = Number(this.precise_round((this.budget.aprilForecastDstNew + this.budget.mayForecastDstNew + this.budget.juneForecastDstNew + this.budget.julyForecastDstNew +
      this.budget.augustForecastDstNew + this.budget.septemberForecastDstNew + this.budget.octomberForecastDstNew + this.budget.novemberForecastDstNew +
      this.budget.decemberForecastDstNew + this.budget.januaryForecastDstNew + this.budget.februaryForecastDstNew + this.budget.marchForecastDstNew), 2));
       this.budgetValueCorrection = this.precise_round((this.budget.totalRemDestination + this.budgetDynamicValueCorrection), 2);
       //this.budgetValueCorrection = Number(this.budget.totalRemDestination) + Number.parseInt(this.budgetDynamicValueCorrection);
  }

  valueChangeDestinationMarch(value) {
    this.budgetValueCorrection = 0;
    this.budgetDynamicValueCorrection = 0;
    this.budget.marchForecastDstNew = value;
    this.budgetDynamicValueCorrection = Number(this.precise_round((this.budget.aprilForecastDstNew + this.budget.mayForecastDstNew + this.budget.juneForecastDstNew + this.budget.julyForecastDstNew +
      this.budget.augustForecastDstNew + this.budget.septemberForecastDstNew + this.budget.octomberForecastDstNew + this.budget.novemberForecastDstNew +
      this.budget.decemberForecastDstNew + this.budget.januaryForecastDstNew + this.budget.februaryForecastDstNew + this.budget.marchForecastDstNew), 2));
      this.budgetValueCorrection = this.precise_round((this.budget.totalRemDestination + this.budgetDynamicValueCorrection), 2);
       //this.budgetValueCorrection = Number(this.budget.totalRemDestination) + Number.parseInt(this.budgetDynamicValueCorrection);
  }

    // Destination //

    precise_round(num, decimals) {
        var t = Math.pow(10, decimals);
        return (Math.round((num * t) + (decimals>0?1:0)*(Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals);
     }

     public onAssetSelectionChanged(assets: Array<any>) {
      this.selectedAssetInvDetails = assets;
      this.selectedAssets = new Array<any>();
      assets.forEach((asset: any) => {
          this.selectedAssets.push(asset);
      });
  }
  public editAsset() {
    const selectedAssetId = this.selectedAssets.length > 0 ? this.selectedAssets[0].id : 0;
    if (selectedAssetId > 0) {
      this.router.navigate(['/assetedit', selectedAssetId]);
    }
  }

  public selectBudgetForecast() {
    this.budgetChangeForecastListModal.show();
    this.budgetChangeForecastList.refresh(null);
  }

  public onBudgetSelectionChanged(assets: Array<any>) {
    this.selectedBudgetDetails = assets;
    this.selectedBudgets = new Array<any>();
    assets.forEach((asset: any) => {
      this.selectedBudgets.push(asset);
    });
  }
}

enum OperationType {
  NotSet = 1,
  AssetValidation = 2,
  Delete = 3,
  ProcessAssetOp = 4
}
