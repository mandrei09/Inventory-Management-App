import {AfterViewInit, Component, Inject, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {OrderList} from '../../../administrations/order/order.list';
import {EmployeeListComponent} from '../../../administrations/employees/employee.list';
import {PartnerDetailComponent} from '../../../documents/partners/partner.detail';
import {PartnerListComponent} from '../../../documents/partners/partner.list';
import {LocationDetailComponent} from '../../../administrations/locations/location.detail';
import {LocationListComponent} from '../../../administrations/locations/location.list';
import {CostCenterListComponent} from '../../../administrations/cost-centers/cost-center.list';
import {RoomDetailComponent as RoomUIDetail} from '../../../administrations/rooms/room.detail';
import {RoomListComponent} from '../../../administrations/rooms/room.list';
import {DepartmentDetailComponent as DepartmentUIDetail} from '../../../administrations/departments/department.detail';
import {DepartmentListComponent} from '../../../administrations/departments/department.list';
import {AdministrationDetailComponent} from '../../../administrations/administrations/administration.detail';
import {AdministrationListComponent} from '../../../administrations/administrations/administration.list';
import {DivisionListComponent} from '../../../administrations/divisions/division.list';
import {CountryListComponent} from '../../../administrations/countries/country.list';
import {CountyListComponent} from '../../../administrations/counties/county.list';
import {CityListComponent} from '../../../administrations/cities/city.list';
import {BudgetManagerList} from '../../../administrations/budget-manager/budget-manager.list';
import {TypeList} from '../../../administrations/types/type.list';
import {MaterialList} from '../../../administrations/materials/material.list';
import {SubTypeList} from '../../../administrations/sub-types/sub-type.list';
import {AdmCenterListComponent} from '../../../administrations/adm-centers/adm-center.list';
import {RegionListComponent} from '../../../administrations/regions/region.list';
import {EntityFileListComponent} from '../../../common/entity-file.list';
import {RequestBudgetForecastListComponent} from '../../../administrations/request-budget-forecasts/request-budget-forecast.list';
import {RequestBudgetForecastMaterialListComponent} from '../../../administrations/request-budget-forecast-materials/request-budget-forecast-material.list';
import {RequestBudgetForecastMaterialCostCenterListComponent} from '../../../administrations/request-budget-forecast-material-cost-centers/request-budget-forecast-material-cost-center.list';
import {EntityFile} from '../../../../model/api/common/entity-file';
import {AppConfig} from '../../../../config';
import {AssetCategory} from '../../../../model/api/assets/asset-category';
import {Location} from '../../../../model/api/administration/location';
import {AddAsset} from '../../../../model/api/assets/add-asset';
import {CodeNameEntity} from '../../../../model/api/common/code-name-entity';
import {Project} from '../../../../model/api/assets/project';
import {Order} from '../../../../model/api/administration/order';
import {Brand} from '../../../../model/api/assets/brand';
import {InsuranceCategory} from '../../../../model/api/assets/insurance-category';
import {Uom} from '../../../../model/api/assets/uom';
import {AssetNature} from '../../../../model/api/assets/asset-nature';
import {Employee} from '../../../../model/api/administration/employee';
import {Dimension} from '../../../../model/api/administration/dimension';
import {CodePartnerEntity} from '../../../../model/api/common/code-partner-entity';
import {Room} from '../../../../model/api/administration/room';
import {AppData} from '../../../../app-data';
import {RequestBudgetForecastMaterialCostCenterUpdate} from '../../../../model/api/requests/request-budget-forecast-material-cost-center-update';
import {RequestBudgetForecastMaterialCostCenterMultiple} from '../../../../model/api/requests/request-budget-forecast-material-cost-center-multiple';
import {Location as NgLocation} from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AssetHttpService} from '../../../../services/http/assets/asset.http.service';
import {AssetCategoryHttpService} from '../../../../services/http/assets/asset-category.http.service';
import {InsuranceCategoryHttpService} from '../../../../services/http/assets/insurance-category.http.service';
import {ProjectHttpService} from '../../../../services/http/assets/project.http.service';
import {OrderHttpService} from '../../../../services/http/administration/order.http.service';
import {BrandHttpService} from '../../../../services/http/assets/brand.http.service';
import {DictionaryItemHttpService} from '../../../../services/http/administration/dictionary-item.http.service';
import {InvStateHttpService} from '../../../../services/http/inventory/inv-state.http.service';
import {Administration} from '../../../../model/api/administration/administration';
import {Company} from '../../../../model/api/assets/company';
import {AssetClassHttpService} from '../../../../services/http/assets/asset-class.http.service';
import {DivisionHttpService} from '../../../../services/http/administration/division.http.service';
import {CountryHttpService} from '../../../../services/http/administration/contry.http.service';
import {CountyHttpService} from '../../../../services/http/administration/county.http.service';
import {CityHttpService} from '../../../../services/http/administration/city.http.service';
import {BudgetManagerHttpService} from '../../../../services/http/administration/budget-manager.http.service';
import {TypeHttpService} from '../../../../services/http/administration/type.http.service';
import {MaterialHttpService} from '../../../../services/http/administration/material.http.service';
import {SubTypeHttpService} from '../../../../services/http/administration/sub-type.http.service';
import {AdmCenterHttpService} from '../../../../services/http/administration/adm-center.http.service';
import {RegionHttpService} from '../../../../services/http/administration/region.http.service';
import {AssetTypeHttpService} from '../../../../services/http/assets/asset-type.http.service';
import {EmployeeHttpService} from '../../../../services/http/administration/employee.http.service';
import {CostCenterHttpService} from '../../../../services/http/administration/cost-center.http.service';
import {UomHttpService} from '../../../../services/http/assets/uom.http.service';
import {AssetNatureHttpService} from '../../../../services/http/assets/asset-nature.http.service';
import {AssetOpHttpService} from '../../../../services/http/assets/asset-op.http.service';
import {PartnerHttpService} from '../../../../services/http/documents/partner.http.service';
import {RoomDetailHttpService} from '../../../../services/http/administration/room-detail.http.service';
import {DepartmentHttpService} from '../../../../services/http/administration/department.http.service';
import {CompanyHttpService} from '../../../../services/http/assets/company.http.service';
import {DocumentTypeHttpService} from '../../../../services/http/documents/document-type.http.service';
import {DimensionHttpService} from '../../../../services/http/administration/dimension.http.service';
import {LocationHttpService} from '../../../../services/http/administration/location.http.service';
import {AdministrationHttpService} from '../../../../services/http/administration/administration.http.service';
import {OfferMaterialHttpService} from '../../../../services/http/administration/offer-material.http.service';
import {OrderMaterialHttpService} from '../../../../services/http/administration/order-material.http.service';
import {RequestBudgetForecastHttpService} from '../../../../services/http/requests/request-budget-forecast.http.service';
import {RequestBudgetForecastMaterialHttpService} from '../../../../services/http/requests/request-budget-forecast-material.http.service';
import {RequestBudgetForecastMaterialCostCenterHttpService} from '../../../../services/http/requests/request-budget-forecast-material-cost-center.http.service';
import {NotificationService} from '../../../../services/notification.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {EntityFileHttpService} from '../../../../services/http/common/entity-file.http.service';
import {InvState} from '../../../../model/api/inventory/inv-state';
import {RequestFilter} from '../../../../model/api/requests/request.filter';
import {AppUtils} from '../../../../common/app.utils';
import {Param} from '../../../../model/common/param';
import {DictionaryItem} from '../../../../model/api/administration/dictionary-item';
import {AssetType} from '../../../../model/api/assets/asset-type';
import {Department} from '../../../../model/api/administration/department';
import {Partner} from '../../../../model/api/documents/partner';
import {CreateAssetSAPResult} from '../../../../model/api/result/create-asset-SAP-result';
import {EntityFileResult} from '../../../../model/api/result/entity-file-result';
import {County} from '../../../../model/api/administration/county';
import {City} from '../../../../model/api/administration/city';
import {Material} from '../../../../model/api/administration/material';
import {SubType} from '../../../../model/api/administration/sub-type';
import {AssetClass} from '../../../../model/api/assets/asset-class';
import {AdmCenter} from '../../../../model/api/administration/adm-center';
import {Region} from '../../../../model/api/administration/region';
import {UploadModalComponent} from '../../../common/upload-modal.component';
import {EmployeeResource} from '../../../../model/api/administration/employee-resource';
import {RequestBFMaterialEmployeeUpdate} from '../../../../model/api/requests/request-budget-forecast-material-employee-update';
import {RequestBFMaterialCostCenterAdd} from '../../../../model/api/requests/request-budget-forecast-material-cost-center-add';
import {RequestBudgetForecastMaterial} from '../../../../model/api/requests/request-budget-forecast-material';
import { DocumentType as AppDocumentType } from '../../../../model/api/documents/document-type';
import {Division} from '../../../../model/api/administration/division';
import {Country} from '../../../../model/api/administration/country';
import {BudgetManager} from '../../../../model/api/assets/budget-manager';
import { Request } from '../../../../model/api/administration/request';
import {Type} from '../../../../model/api/administration/type';
import {MasterType} from '../../../../model/api/assets/master-type';
import {BudgetBaseHttpService} from '../../../../services/http/administration/budget-base.http.service';
import {MasterTypeHttpService} from '../../../../services/http/assets/master-type.http.service';
import {AccMonthHttpService} from '../../../../services/http/accounting/acc-month.http.service';
import {AppStateHttpService} from '../../../../services/http/common/app-state.http.service';
import {ProjectTypeHttpService} from '../../../../services/http/assets/project-type.http.service';
import {ActivityHttpService} from '../../../../services/http/assets/activity.http.service';
import {BudgetOpHttpService} from '../../../../services/http/administration/budget-op.http.service';
import {RequestHttpService} from '../../../../services/http/administration/request.http.service';
import {BudgetAddSave} from '../../../../model/api/administration/budget-save';
import {BudgetOpDetailList} from '../../budget-ops/budget-op.detail.list';
import {ActivityList} from '../../../assets/activities/activity.list';
import {ProjectTypeListComponent} from '../../../assets/project-types/project-type.list';
import {MasterTypeListComponent} from '../../../assets/master-types/master-type.list';
import {AccMonthListComponent} from '../../../accounting/acc-month.list';
import {AppStateListComponent} from '../../../assets/app-states/app-state.list';
import {RequestList} from '../../request/request.list';
import {AppState} from '../../../../model/api/common/app-state';
import {AccMonth} from '../../../../model/api/accounting/acc-month';
import {ProjectType} from '../../../../model/api/assets/project-type';
import {Activity} from '../../../../model/api/assets/activity';
import {CostCenter} from '../../../../model/api/administration/cost-center';
import {RequestResult} from '../../../../model/api/result/request-result';
import {CompanyListComponent} from '../../../assets/companies/company.list';
import {AssetTypeListComponent} from '../../../assets/asset-types/asset-type.list';
import {ProjectList} from '../../../assets/projects/project.list';
import { RequestBudgetForecast } from '../../../../model/api/requests/request-budget-forecast';

@Component({
  selector: 'app-budget-add-edit',
  templateUrl: './budget-add-dialog.component.html',
  styleUrls: ['./budget-add-dialog.component.scss']
})
export class BudgetAddDialogComponent implements AfterViewInit {
  public _requests: Request = null;
  public get request(): Request { return this._requests; }
  public set request(value: Request) {
    this._requests = value;

    this.setSelectedRequest(value);
  }


  // public _employee: Employee = null;
  // public get employees(): Employee { return this._employee; }
  // public set employees(value: Employee) {
  //   this._employee = value;

  //   this.employee = value;

  //   //this.setSelectedEmployee(value);
  // }

  public _employeeOwner: Employee = null;
  public get employeeOwners(): Employee { return this._employeeOwner; }
  public set employeeOwners(value: Employee) {
    this._employeeOwner = value;

    this.employee = value;

    //this.setSelectedEmployee(value);
  }

  public _project: Project = null;
  public get projects(): Project { return this._project; }
  public set projects(value: Project) {
    this._project = value;

    this.project = value;

    //this.setSelectedProject(value);
  }

  public _country: Country = null;
  public get countries(): Country { return this._country; }
  public set countries(value: Country) {
    this._country = value;

    this.country = value;

    //this.setSelectedCountry(value);
  }

  public _activity: Activity = null;
  public get activities(): Activity { return this._activity; }
  public set activities(value: Activity) {
    this._activity = value;

    this.activity = value;

    //this.setSelectedActivity(value);
  }

  public _department: Department = null;
  public get departments(): Department { return this._department; }
  public set departments(value: Department) {
    this._department = value;

    this.department = value;

    //this.setSelectedDepartment(value);
  }

  public _admCenter: AdmCenter = null;
  public get admCenters(): AdmCenter { return this._admCenter; }
  public set admCenters(value: AdmCenter) {
    this._admCenter = value;

    this.admCenter = value;

    //this.setSelectedAdmCenter(value);
  }

  public _region: Region = null;
  public get regions(): Region { return this._region; }
  public set regions(value: Region) {
    this._region = value;

    this.region = value;

    //this.setSelectedRegion(value);
  }

  public _division: Division = null;
  public get divisions(): Division { return this._division; }
  public set divisions(value: Division) {
    this._division = value;

    this.division = value;

    //this.setSelectedDivision(value);
  }

  public _projectType: ProjectType = null;
  public get projectTypes(): ProjectType { return this._projectType; }
  public set projectTypes(value: ProjectType) {
    this._projectType = value;

    this.projectType = value;

    //this.setSelectedProjectType(value);
  }

  public _assetType: AssetType = null;
  public get assetTypes(): AssetType { return this._assetType; }
  public set assetTypes(value: AssetType) {
    this._assetType = value;

    this.assetType = value;

    //this.setSelectedAssetType(value);
  }

  public _appState: AppState = null;
  public get appStates(): AppState { return this._appState; }
  public set appStates(value: AppState) {
    this._appState = value;

    this.appState = value;

    //this.setSelectedAssetType(value);
  }

  public _implementationDate: AccMonth = null;
  public get implementationDates(): AccMonth { return this._implementationDate; }
  public set implementationDates(value: AccMonth) {
    this._implementationDate = value;

    this.startAccMonth = value;

    //this.setSelectedAssetType(value);
  }

  public _executionDate: AccMonth = null;
  public get executionDates(): AccMonth { return this._executionDate; }
  public set executionDates(value: AccMonth) {
    this._executionDate = value;
    this.accMonth = value;
    
    //this.setSelectedAssetType(value);
  }

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

  @ViewChild('budgetOpDetailList') public budgetOpList: BudgetOpDetailList;
  @ViewChild('entityFileList') public entityFileList: EntityFileListComponent;

  @ViewChild('confirmationModal') public confirmationModal: ModalDirective;

  @ViewChild('requestBudgetForecastList') public requestBudgetForecastList: RequestBudgetForecastListComponent;
  @ViewChild('requestBudgetForecastListModal') public requestBudgetForecastListModal: ModalDirective;
  @ViewChild('fileInput') fileInput;

  public entityTypeCode: string = 'BUDGETBASE';
  public entityFile: EntityFile = null;
  public confirmationMessage: string = '';
  public operationType: OperationType = OperationType.NotSet;

  public requestBudgetForecast: RequestBudgetForecast = null;

  public id: number = 0;
  public budget: BudgetAddSave = new BudgetAddSave(0, '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', true,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  public filesToUpload: Array<File>;
  public selectedAssetOp: any;
  public isSaved: boolean = true;

  public get allowSaving(): boolean {
    return this.budget != null &&
      this.employee != null &&
      this.country != null &&
      this.activity != null &&
      this.department != null &&
      this.admCenter != null &&
      this.region != null &&
      this.division != null &&
      this.projectType != null &&
      this.assetType != null &&
      this.appState != null;
  }

  public costCenter: CodeNameEntity = null;
  public employee: Employee = null;
  public accMonth: AccMonth = null;
  public company: CodeNameEntity = null;
  public account: CodeNameEntity = null;
  public partner: CodePartnerEntity = null;
  public masterType: CodeNameEntity = null;
  public project: CodeNameEntity = null;
  public assetType: CodeNameEntity = null;
  public appState: CodeNameEntity = null;
  public startAccMonth: AccMonth = null;
  public endDate: Date = null;
  // public request: Request = null;
  public order: Order = null;
  public department: CodeNameEntity = null;
  public division: CodeNameEntity = null;
  public admCenter: CodeNameEntity = null;
  public region: CodeNameEntity = null;
  public projectType: CodeNameEntity = null;
  public country: CodeNameEntity = null;
  public activity: CodeNameEntity = null;
  public interCompany: CodeNameEntity = null;
  public type: CodeNameEntity = null;
  public subType: CodeNameEntity = null;
  public administration: CodeNameEntity = null;
  budgetValueNeedInitial: number = 0;
  budgetValueNeed: number = 0;

  public readOnlyForm: boolean = false;
  public get isAdmin(): boolean { return AppData.UserIsAdmin; }

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public budgetBaseHttpService: BudgetBaseHttpService,
    public masterTypeHttpService: MasterTypeHttpService,
    
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
    public budgetOpHttpService: BudgetOpHttpService,
    public partnerHttpService: PartnerHttpService,
    public administrationHttpService: AdministrationHttpService,
    public requestHttpService: RequestHttpService,
    public orderHttpService: OrderHttpService,
    private notifyService: NotificationService,
    public entityFileHttpService: EntityFileHttpService,
    public dialogRef: MatDialogRef<BudgetAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.route.params.subscribe((params: Params) => {
    //   if (params['id']) {
    //     this.id = +params['id'];
    //   }
    // });
    // if (data.id) {
    //   this.id = data.id;
    // }
  }

  ngAfterViewInit() {
    if (this.id > 0) {
      this.budgetBaseHttpService.getDetailById(this.id)
        .subscribe((budgetBase: any) => {
          // this.asset = asset;
          this.updateDetails(budgetBase);

          if (budgetBase.validated) {
            this.refreshAssetOperations();
            // this.refreshEntityFiles();
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
    params.push(new Param('entityId', this.budget.id.toString()));

    this.entityFileList.refresh(params);
  }

  public refreshAssetOperations() {
    const params: Array<Param> = new Array<Param>();

    params.push(new Param('assetId', this.id.toString()));
    this.budgetOpList.refresh(params);
  }

  public updateDetails(budget: any) {
    this.budget.id = budget.id;
    this.budget.code = budget.code;
    this.budget.name = budget.name;
    this.budget.info = budget.info;
    this.budget.depPeriod = budget.depPeriod;
    this.budget.depPeriodRem = budget.depPeriodRem;
    this.budget.info = budget.info;
    this.budget.validated = budget.validated;
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

    this.budget.april = budget.budgetMonthBases.length > 0 ? budget.budgetMonthBases[0].april : 0;
    this.budget.may = budget.budgetMonthBases.length > 0 ? budget.budgetMonthBases[0].may : 0;
    this.budget.june = budget.budgetMonthBases.length > 0 ? budget.budgetMonthBases[0].june : 0;
    this.budget.july = budget.budgetMonthBases.length > 0 ? budget.budgetMonthBases[0].july : 0;
    this.budget.august = budget.budgetMonthBases.length > 0 ? budget.budgetMonthBases[0].august : 0;
    this.budget.september = budget.budgetMonthBases.length > 0 ? budget.budgetMonthBases[0].september : 0;
    this.budget.octomber = budget.budgetMonthBases.length > 0 ? budget.budgetMonthBases[0].octomber : 0;
    this.budget.november = budget.budgetMonthBases.length > 0 ? budget.budgetMonthBases[0].november : 0;
    this.budget.december = budget.budgetMonthBases.length > 0 ? budget.budgetMonthBases[0].december : 0;
    this.budget.january = budget.budgetMonthBases.length > 0 ? budget.budgetMonthBases[0].january : 0;
    this.budget.february = budget.budgetMonthBases.length > 0 ? budget.budgetMonthBases[0].february : 0;
    this.budget.march = budget.budgetMonthBases.length > 0 ? budget.budgetMonthBases[0].march : 0;
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
  public setSelectedProject(value: any) {
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
  public setSelectedAssetType(value: any) {
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

  public selectRequest() {console

    this.requestList.refresh(null);
    this.requestListModal.show();
  }
  public setSelectedRequest(request: Request) {
    // const items: Array<Request> = this.requestList.selectedItems;
    // this.request = ((items != null) && (items.length === 1)) ? items[0] : null;
    // this.request = value;
    // console.log(this.request);

    if (request != null) {
        this.budget.info = request.info;
    }

    if (request != null  && request.costCenter != null) {
        this.costCenter = request.costCenter;
    }

    if (request != null  && request.employee != null) {
        this.employee = request.employee;
        this._employeeOwner = this.employee;
    }

    // if (request != null  && request.project != null) {
    //     this.project = request.project;
    // }

    //   if (request != null  && request.country != null) {
    //     this.country = request.country;
    // }


    if (request != null && request.department != null) {
        this.department = request.department;
    }

    if (request != null && request.division != null) {
        this.division = request.division;
    }

    if (request != null && request.admCenter != null) {
        this.admCenter = request.admCenter;
    }

    // if (request != null && request.region != null) {
    //     this.region = request.region;
    // }

    if (request != null && request.projectType != null) {
        this.projectType = request.projectType;
    }

    if (request != null && request.assetType != null) {
        this.assetType = request.assetType;
    }

    if (request != null && request.info != null) {
        this.budget.info = request.info;
    }

    // if (this.budget != null && this.budget.assetType != null) {
    //     this.assetType = this.budget.assetType;
    // }

    // if (this.budget != null && this.budget.company != null) {
    //     this.company = this.budget.company;
    // }


    // if (this.budgetBase != null && this.budgetBase.region != null) {
    //     this.region = this.budgetBase.region;
    // }

    // if (this.budgetBase != null && this.budgetBase.assetType != null) {
    //     this.assetType = this.budgetBase.assetType;
    // }

    // if (this.budgetBase != null && this.budgetBase.company != null) {
    //     this.company = this.budgetBase.company;
    // }

    // if (request != null  && request.employee != null) {
    //     this.employee = request.employee;
    // }

     if (request != null  && request.endDate != null) {
        this.endDate = request.endDate;
    }

    if (request != null  && request.startAccMonth != null) {
        this.startAccMonth = request.startAccMonth;
    }

    if (request != null) {
        this.budget.needeedBudget = request.budgetValueNeed;
        this.budgetValueNeedInitial = request.budgetValueNeed;
    }

    this.budgetValueNeed = (this.budget.totalForecastNew - this.budget.totalForecast - this.budgetValueNeedInitial);


    // this.requestListModal.hide();
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

    // if (this.order != null) {
    //     this.budget.info = this.order.info;
    // }

    // if (this.order != null  && this.order.costCenter != null) {
    //     this.costCenter = this.order.costCenter;
    // }

    if (this.order != null  && this.order.employee != null) {
      this.employee = this.order.employee;
    }

    if (this.order != null  && this.order.project != null) {
      this.project = this.order.project;
    }

    if (this.order != null  && this.order.country != null) {
      this.country = this.order.country;
    }

    if (this.order != null  && this.order.appState != null) {
      this.appState = this.order.appState;
    }

    if (this.order != null  && this.order.activity != null) {
      this.activity = this.order.activity;
    }


    if (this.order != null && this.order.department != null) {
      this.department = this.order.department;
    }

    if (this.order != null && this.order.division != null) {
      this.division = this.order.division;
    }

    if (this.order != null && this.order.admCenter != null) {
      this.admCenter = this.order.admCenter;
    }

    // if (this.request != null && this.order.region != null) {
    //     this.region = this.order.region;
    // }

    if (this.order != null && this.order.projectType != null) {
      this.projectType = this.order.projectType;
    }

    if (this.order != null && this.order.assetType != null) {
      this.assetType = this.order.assetType;
    }

    if (this.order != null && this.order.info != null) {
      this.budget.info = this.order.info;
    }

    // if (this.budget != null && this.budget.company != null) {
    //     this.company = this.budget.company;
    // }


    // if (this.budgetBase != null && this.budgetBase.region != null) {
    //     this.region = this.budgetBase.region;
    // }


    // if (this.budgetBase != null && this.budgetBase.company != null) {
    //     this.company = this.budgetBase.company;
    // }

    // if (this.request != null  && this.request.employee != null) {
    //     this.employee = this.request.employee;
    // }

    //  if (this.order != null  && this.order.endDate != null) {
    //     this.endDate = this.order.endDate;
    // }

    // if (this.order != null) {
    //     this.budget.needeedBudget = this.order.budgetValueNeed;
    // }

    this.orderListModal.hide();
  }

  /*end ORDER */

  /*begin DEPARTMENT */

  public selectDepartment() {

    this.departmentList.refresh(null);
    this.departmentListModal.show();
  }
  public setSelectedDepartment(value: any) {
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
  public setSelectedDivision(value: any) {
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
  public setSelectedAdmCenter(value: any) {
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
  public setSelectedRegion(value: any) {
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
  public setSelectedProjectType(value: any) {
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
  public setSelectedCountry(value: any) {
    const items: Array<Country> = this.countryList.selectedItems;
    this.country = ((items != null) && (items.length === 1)) ? items[0] : null;
    this.countryListModal.hide();
  }

  /*end ACTIVITY */

  /*begin COUNTRY */
  public selectActivity() {

    this.activityList.refresh(null);
    this.activityListModal.show();
  }
  public setSelectedActivity(value: any) {
    const items: Array<Activity> = this.activityList.selectedItems;
    this.activity = ((items != null) && (items.length === 1)) ? items[0] : null;
    this.activityListModal.hide();
  }

  /*end ACTIVITY */

  /*begin employee*/
  public selectEmployee() {
    this.employeeList.refresh(null);
    this.employeeListModal.show();
  }

  public setSelectedEmployee(value: any) {
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

  /*end partner*/


  


  public cancelChanges() {
    // this.ngLocation.back();
    this.router.navigate(['/budget/status']);
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

  public validateBudget() {
    this.budget.validated = true;
    this.saveBudget();
  }

  public addNewOperation() {
    // let assets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
    // assets.push(new AssetSimpleDetail(this.asset.id, this.asset.invNo, this.asset.assetName,
    //     '', this.asset.partner, this.asset.assetType, this.asset.accState, this.asset.usageStartDate, '', ''));
    // AppData.AssetList = assets;
    // this.router.navigate(['/newoperation']);
  }

  public saveBudget() {
    // this.isSaved = false;

    this.budget.employeeId = this.employee != null ? this.employee.id : null;
    this.budget.projectId = this.project != null ? this.project.id : null;
    this.budget.countryId = this.country != null ? this.country.id : null;
    this.budget.activityId = this.activity != null ? this.activity.id : null;
    this.budget.departmentId = this.department != null ? this.department.id : null;
    this.budget.admCenterId = this.admCenter != null ? this.admCenter.id : null;
    this.budget.regionId = this.region != null ? this.region.id : null;
    this.budget.divisionId = this.division != null ? this.division.id : null;
    this.budget.projectTypeId = this.projectType != null ? this.projectType.id : null;
    this.budget.assetTypeId = this.assetType != null ? this.assetType.id : null;
    this.budget.appStateId = this.appState != null ? this.appState.id : null;
    this.budget.startAccMonthId = this.startAccMonth != null ? this.startAccMonth.id : null;
    this.budget.requestId = this.request != null ? this.request.id : null;

    this.budget.aprilForecast = this.budget.aprilForecast;
    this.budget.mayForecast = this.budget.mayForecast;
    this.budget.juneForecast = this.budget.juneForecast;
    this.budget.julyForecast = this.budget.julyForecast;
    this.budget.augustForecast = this.budget.augustForecast;
    this.budget.septemberForecast = this.budget.septemberForecast;
    this.budget.octomberForecast = this.budget.octomberForecast;
    this.budget.novemberForecast = this.budget.novemberForecast;
    this.budget.decemberForecast = this.budget.decemberForecast;
    this.budget.januaryForecast = this.budget.januaryForecast;
    this.budget.februaryForecast = this.budget.februaryForecast;
    this.budget.marchForecast = this.budget.marchForecast;

    this.budget.aprilForecastNew = this.budget.aprilForecastNew;
    this.budget.mayForecastNew = this.budget.mayForecastNew;
    this.budget.juneForecastNew = this.budget.juneForecastNew;
    this.budget.julyForecastNew = this.budget.julyForecastNew;
    this.budget.augustForecastNew = this.budget.augustForecastNew;
    this.budget.septemberForecastNew = this.budget.septemberForecastNew;
    this.budget.octomberForecastNew = this.budget.octomberForecastNew;
    this.budget.novemberForecastNew = this.budget.novemberForecastNew;
    this.budget.decemberForecastNew = this.budget.decemberForecastNew;
    this.budget.januaryForecastNew = this.budget.januaryForecastNew;
    this.budget.februaryForecastNew = this.budget.februaryForecastNew;
    this.budget.marchForecastNew = this.budget.marchForecastNew;

    this.budget.validated = true;

    this.budgetBaseHttpService.updateRequestBudget(this.budget)
      .subscribe((result: RequestResult) => {
        if (result.success) {
          this.notifyService.showInfo(result.message, 'Incarcare buget', 5000, false, 0);
          this.isSaved = true;
          this.dialogRef.close(result);
          //this.router.navigate(['/budget/forecast']);
        } else if (!result.success) {
          this.notifyService.showError('Motiv: ' + result.message + '!', 'Eroare salvare date', 0, false, 0);
        }
      });
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
    this.selectedAssetOp = this.budgetOpList.selectedItem;
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
    this.budgetOpHttpService.process(this.budgetOpList.selectedItem.id).subscribe((data) => {
      this.refreshAssetOperations();
    });
  }

  valueChangeApril(value) {
    this.budget.totalForecastNew = 0;
    this.budgetValueNeed = 0;
    this.budget.aprilForecastNew = value;
    this.budget.totalForecastNew = this.precise_round((this.budget.aprilForecastNew + this.budget.mayForecastNew + this.budget.juneForecastNew + this.budget.julyForecastNew +
      this.budget.augustForecastNew + this.budget.septemberForecastNew + this.budget.octomberForecastNew + this.budget.novemberForecastNew +
      this.budget.decemberForecastNew + this.budget.januaryForecastNew + this.budget.februaryForecastNew + this.budget.marchForecastNew), 2);
    this.budgetValueNeed = this.precise_round((this.budget.totalForecastNew - this.budget.totalForecast - this.budgetValueNeedInitial), 2);
  }

  valueChangeMay(value) {

    this.budget.totalForecastNew = 0;
    this.budgetValueNeed = 0;
    this.budget.mayForecastNew = value;
    this.budget.totalForecastNew = this.precise_round((this.budget.aprilForecastNew + this.budget.mayForecastNew + this.budget.juneForecastNew + this.budget.julyForecastNew +
      this.budget.augustForecastNew + this.budget.septemberForecastNew + this.budget.octomberForecastNew + this.budget.novemberForecastNew +
      this.budget.decemberForecastNew + this.budget.januaryForecastNew + this.budget.februaryForecastNew + this.budget.marchForecastNew), 2);
    console.log(this.budget.totalForecastNew);
      this.budgetValueNeed = this.precise_round((this.budget.totalForecastNew - this.budget.totalForecast - this.budgetValueNeedInitial), 2);
    console.log(this.budgetValueNeed);
  }

  valueChangeJune(value) {
    this.budget.totalForecastNew = 0;
    this.budgetValueNeed = 0;
    this.budget.juneForecastNew = value;
    this.budget.totalForecastNew = this.precise_round((this.budget.aprilForecastNew + this.budget.mayForecastNew + this.budget.juneForecastNew + this.budget.julyForecastNew +
      this.budget.augustForecastNew + this.budget.septemberForecastNew + this.budget.octomberForecastNew + this.budget.novemberForecastNew +
      this.budget.decemberForecastNew + this.budget.januaryForecastNew + this.budget.februaryForecastNew + this.budget.marchForecastNew), 2);
    this.budgetValueNeed = this.precise_round((this.budget.totalForecastNew - this.budget.totalForecast - this.budgetValueNeedInitial), 2);
  }

  valueChangeJuly(value) {
    // console.log(value);
    this.budget.totalForecastNew = 0;
    this.budgetValueNeed = 0;
    this.budget.julyForecastNew = value;
    this.budget.totalForecastNew = this.precise_round((this.budget.aprilForecastNew + this.budget.mayForecastNew + this.budget.juneForecastNew + this.budget.julyForecastNew +
      this.budget.augustForecastNew + this.budget.septemberForecastNew + this.budget.octomberForecastNew + this.budget.novemberForecastNew +
      this.budget.decemberForecastNew + this.budget.januaryForecastNew + this.budget.februaryForecastNew + this.budget.marchForecastNew), 2);
    this.budgetValueNeed = this.precise_round((this.budget.totalForecastNew - this.budget.totalForecast - this.budgetValueNeedInitial), 2);
  }

  valueChangeAugust(value) {
    this.budget.totalForecastNew = 0;
    this.budgetValueNeed = 0;
    this.budget.augustForecastNew = value;
    this.budget.totalForecastNew = this.precise_round((this.budget.aprilForecastNew + this.budget.mayForecastNew + this.budget.juneForecastNew + this.budget.julyForecastNew +
      this.budget.augustForecastNew + this.budget.septemberForecastNew + this.budget.octomberForecastNew + this.budget.novemberForecastNew +
      this.budget.decemberForecastNew + this.budget.januaryForecastNew + this.budget.februaryForecastNew + this.budget.marchForecastNew), 2);
    this.budgetValueNeed = this.precise_round((this.budget.totalForecastNew - this.budget.totalForecast - this.budgetValueNeedInitial), 2);
  }

  valueChangeSeptember(value) {
    this.budget.totalForecastNew = 0;
    this.budgetValueNeed = 0;
    this.budget.septemberForecastNew = value;
    this.budget.totalForecastNew = this.precise_round((this.budget.aprilForecastNew + this.budget.mayForecastNew + this.budget.juneForecastNew + this.budget.julyForecastNew +
      this.budget.augustForecastNew + this.budget.septemberForecastNew + this.budget.octomberForecastNew + this.budget.novemberForecastNew +
      this.budget.decemberForecastNew + this.budget.januaryForecastNew + this.budget.februaryForecastNew + this.budget.marchForecastNew), 2);
    this.budgetValueNeed = this.precise_round((this.budget.totalForecastNew - this.budget.totalForecast - this.budgetValueNeedInitial), 2);
  }

  valueChangeOctomber(value) {
    this.budget.totalForecastNew = 0;
    this.budgetValueNeed = 0;
    this.budget.octomberForecastNew = value;
    this.budget.totalForecastNew = this.precise_round((this.budget.aprilForecastNew + this.budget.mayForecastNew + this.budget.juneForecastNew + this.budget.julyForecastNew +
      this.budget.augustForecastNew + this.budget.septemberForecastNew + this.budget.octomberForecastNew + this.budget.novemberForecastNew +
      this.budget.decemberForecastNew + this.budget.januaryForecastNew + this.budget.februaryForecastNew + this.budget.marchForecastNew), 2);
    this.budgetValueNeed = this.precise_round((this.budget.totalForecastNew - this.budget.totalForecast - this.budgetValueNeedInitial), 2);
  }

  valueChangeNovember(value) {
    this.budget.totalForecastNew = 0;
    this.budgetValueNeed = 0;
    this.budget.novemberForecastNew = value;
    this.budget.totalForecastNew = this.precise_round((this.budget.aprilForecastNew + this.budget.mayForecastNew + this.budget.juneForecastNew + this.budget.julyForecastNew +
      this.budget.augustForecastNew + this.budget.septemberForecastNew + this.budget.octomberForecastNew + this.budget.novemberForecastNew +
      this.budget.decemberForecastNew + this.budget.januaryForecastNew + this.budget.februaryForecastNew + this.budget.marchForecastNew), 2);
    this.budgetValueNeed = this.precise_round((this.budget.totalForecastNew - this.budget.totalForecast - this.budgetValueNeedInitial), 2);
  }

  valueChangeDecember(value) {
    this.budget.totalForecastNew = 0;
    this.budgetValueNeed = 0;
    this.budget.decemberForecastNew = value;
    this.budget.totalForecastNew = this.precise_round((this.budget.aprilForecastNew + this.budget.mayForecastNew + this.budget.juneForecastNew + this.budget.julyForecastNew +
      this.budget.augustForecastNew + this.budget.septemberForecastNew + this.budget.octomberForecastNew + this.budget.novemberForecastNew +
      this.budget.decemberForecastNew + this.budget.januaryForecastNew + this.budget.februaryForecastNew + this.budget.marchForecastNew), 2);
    this.budgetValueNeed = this.precise_round((this.budget.totalForecastNew - this.budget.totalForecast - this.budgetValueNeedInitial), 2);
  }

  valueChangeJanuary(value) {
    this.budget.totalForecastNew = 0;
    this.budgetValueNeed = 0;
    this.budget.januaryForecastNew = value;
    this.budget.totalForecastNew = this.precise_round((this.budget.aprilForecastNew + this.budget.mayForecastNew + this.budget.juneForecastNew + this.budget.julyForecastNew +
      this.budget.augustForecastNew + this.budget.septemberForecastNew + this.budget.octomberForecastNew + this.budget.novemberForecastNew +
      this.budget.decemberForecastNew + this.budget.januaryForecastNew + this.budget.februaryForecastNew + this.budget.marchForecastNew), 2);
    this.budgetValueNeed = this.precise_round((this.budget.totalForecastNew - this.budget.totalForecast - this.budgetValueNeedInitial), 2);
  }

  valueChangeFebruary(value) {
    this.budget.totalForecastNew = 0;
    this.budgetValueNeed = 0;
    this.budget.februaryForecastNew = value;
    this.budget.totalForecastNew = this.precise_round((this.budget.aprilForecastNew + this.budget.mayForecastNew + this.budget.juneForecastNew + this.budget.julyForecastNew +
      this.budget.augustForecastNew + this.budget.septemberForecastNew + this.budget.octomberForecastNew + this.budget.novemberForecastNew +
      this.budget.decemberForecastNew + this.budget.januaryForecastNew + this.budget.februaryForecastNew + this.budget.marchForecastNew), 2);
    this.budgetValueNeed = this.precise_round((this.budget.totalForecastNew - this.budget.totalForecast - this.budgetValueNeedInitial), 2);
  }

  valueChangeMarch(value) {
    this.budget.totalForecastNew = 0;
    this.budgetValueNeed = 0;
    this.budget.marchForecastNew = value;
    this.budget.totalForecastNew = this.precise_round((this.budget.aprilForecastNew + this.budget.mayForecastNew + this.budget.juneForecastNew + this.budget.julyForecastNew +
      this.budget.augustForecastNew + this.budget.septemberForecastNew + this.budget.octomberForecastNew + this.budget.novemberForecastNew +
      this.budget.decemberForecastNew + this.budget.januaryForecastNew + this.budget.februaryForecastNew + this.budget.marchForecastNew), 2);
    this.budgetValueNeed = this.precise_round((this.budget.totalForecastNew - this.budget.totalForecast - this.budgetValueNeedInitial), 2);
  }

  precise_round(num, decimals) {
    var t = Math.pow(10, decimals);
    return Number((Math.round((num * t) + (decimals>0?1:0)*(Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals));
  }

   /*begin REQUEST BUDGET FORECAST */

   public selectRequestBudgetForecast() {

    const params = new Array<Param>();
    params.push(new Param('needBudget', 'true'));

    this.requestBudgetForecastList.refresh(params);
    this.requestBudgetForecastListModal.show();
}
public setSelectedRequestBudgetForecast() {
    const items: Array<RequestBudgetForecast> = this.requestBudgetForecastList.selectedItems;
    this.requestBudgetForecast = ((items != null) && (items.length === 1)) ? items[0] : null;

    // if (this.order != null) {
    //     this.budget.info = this.order.info;
    // }

    // if (this.order != null  && this.order.costCenter != null) {
    //     this.costCenter = this.order.costCenter;
    // }

    // if (this.order != null  && this.order.employee != null) {
    //     this.employee = this.order.employee;
    // }

    // if (this.order != null  && this.order.project != null) {
    //     this.project = this.order.project;
    // }

    //   if (this.order != null  && this.order.country != null) {
    //     this.country = this.order.country;
    // }

    // if (this.order != null  && this.order.appState != null) {
    //     this.appState = this.order.appState;
    // }

    // if (this.order != null  && this.order.activity != null) {
    //     this.activity = this.order.activity;
    // }


    // if (this.order != null && this.order.department != null) {
    //     this.department = this.order.department;
    // }

    // if (this.order != null && this.order.division != null) {
    //     this.division = this.order.division;
    // }

    // if (this.order != null && this.order.admCenter != null) {
    //     this.admCenter = this.order.admCenter;
    // }

    // if (this.request != null && this.order.region != null) {
    //     this.region = this.order.region;
    // }

    // if (this.order != null && this.order.projectType != null) {
    //     this.projectType = this.order.projectType;
    // }

    // if (this.order != null && this.order.assetType != null) {
    //     this.assetType = this.order.assetType;
    // }

    // if (this.order != null && this.order.info != null) {
    //     this.budget.info = this.order.info;
    // }

    // if (this.budget != null && this.budget.company != null) {
    //     this.company = this.budget.company;
    // }


    // if (this.budgetBase != null && this.budgetBase.region != null) {
    //     this.region = this.budgetBase.region;
    // }


    // if (this.budgetBase != null && this.budgetBase.company != null) {
    //     this.company = this.budgetBase.company;
    // }

    // if (this.request != null  && this.request.employee != null) {
    //     this.employee = this.request.employee;
    // }

    //  if (this.order != null  && this.order.endDate != null) {
    //     this.endDate = this.order.endDate;
    // }

    if (this.requestBudgetForecast != null) {
        this.budgetValueNeedInitial = this.requestBudgetForecast.needBudgetValue;
    }

    // this.budgetValueNeed = this.budget.totalForecastNew - this.budget.totalForecast - this.budgetValueNeedInitial;
    this.budgetValueNeed = this.budget.totalForecastNew - this.budget.totalForecast - this.budgetValueNeedInitial;

    this.requestBudgetForecastListModal.hide();
}

/*end REQUEST BUDGET FORECAST */
}

enum OperationType {
  NotSet = 1,
  AssetValidation = 2,
  Delete = 3,
  ProcessAssetOp = 4
}
