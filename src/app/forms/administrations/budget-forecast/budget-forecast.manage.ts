import { ConfigValuesHttpService } from './../../../services/http/common/config-values.service';
import { AssetInvDetail } from './../../../model/api/assets/asset-inv-detail';
import { CostCenterHttpService } from '../../../services/http/administration/cost-center.http.service';
import { CostCenter } from './../../../model/api/administration/cost-center';
import { AssetSimpleDetail } from './../../../model/api/assets/asset-simple-detail';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Param } from '../../../model/common/param';
import { AppData } from '../../../app-data';
import { AssetDepDetail } from '../../../model/api/assets/asset-dep-detail';
import { Partner } from '../../../model/api/documents/partner';
import { Employee } from '../../../model/api/administration/employee';
import { PartnerHttpService } from '../../../services/http/documents/partner.http.service';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { AdministrationDetailHttpService } from '../../../services/http/administration/administration-detail.http.service';
import { CompanyHttpService } from '../../../services/http/assets/company.http.service';
import { EmployeeListComponent } from '../employees/employee.list';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CompanyListComponent } from '../../assets/companies/company.list';
import { PartnerListComponent } from '../../documents/partners/partner.list';
import { CostCenterListComponent } from '../cost-centers/cost-center.list';
import { AdministrationListComponent } from '../administrations/administration.list';
import { Administration } from '../../../model/api/administration/administration';
import { Company } from '../../../model/api/assets/company';
import { BudgetHttpService } from '../../../services/http/administration/budget.http.service';
import { AppUtils } from '../../../common/app.utils';
import { BudgetFilter } from '../../../model/api/administration/budget.filter';
import { BudgetImport } from '../../../model/common/import/budget-import';
import { MessageService } from 'primeng/api';
import { AngularTreeGridComponent } from 'angular-tree-grid';
import { DashboardHttpService } from '../../../services/http/common/dashboard.http.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { Project } from '../../../model/api/assets/project';
import { Country } from '../../../model/api/administration/country';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { Region } from '../../../model/api/administration/region';
import { Activity } from '../../../model/api/assets/activity';
import { AssetType } from '../../../model/api/assets/asset-type';
import { Department } from '../../../model/api/administration/department';
import { Division } from '../../../model/api/administration/division';
import { ProjectType } from '../../../model/api/assets/project-type';
import { OverlayPanel } from 'primeng/overlaypanel';
import { AccMonth } from '../../../model/api/accounting/acc-month';
import { AccMonthListComponent } from '../../accounting/acc-month.list';
import { AccMonthHttpService } from '../../../services/http/accounting/acc-month.http.service';
import { BudgetBaseImport } from '../../../model/common/import/budget-base-import';
import { BudgetForecastListComponent } from './budget-forecast.list';
import { BudgetForecastHttpService } from '../../../services/http/administration/budget-forecast.http.service';
import { BudgetManagerHttpService } from '../../../services/http/administration/budget-manager.http.service';
import { ProjectHttpService } from '../../../services/http/assets/project.http.service';
import { ActivityHttpService } from '../../../services/http/assets/activity.http.service';
import { DepartmentHttpService } from '../../../services/http/administration/department.http.service';
import { ProjectTypeHttpService } from '../../../services/http/assets/project-type.http.service';
import { AssetTypeHttpService } from '../../../services/http/assets/asset-type.http.service';
import { DivisionHttpService } from '../../../services/http/administration/division.http.service';
import { BudgetManagerList } from '../budget-manager/budget-manager.list';
import { ProjectList } from '../../assets/projects/project.list';
import { DepartmentListComponent } from '../departments/department.list';
import { DivisionListComponent } from '../divisions/division.list';
import { ActivityList } from '../../assets/activities/activity.list';
import { AssetTypeListComponent } from '../../assets/asset-types/asset-type.list';
import { ProjectTypeListComponent } from '../../assets/project-types/project-type.list';
import { BudgetManager } from '../../../model/api/assets/budget-manager';
import { BudgetForecast } from '../../../model/api/budget/budget-forecast';
import { AdmCenterListComponent } from '../adm-centers/adm-center.list';
import { AdmCenterHttpService } from '../../../services/http/administration/adm-center.http.service';
import { ImportBudgetResult } from '../../../model/api/result/import-budget-result';
import { NotificationService } from '../../../services/notification.service';
import {BudgetAddDialogComponent} from '../budget-base/budget-add-dialog/budget-add-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {BudgetEditDialogComponent} from '../budget-base/budget-edit-dialog/budget-edit-dialog.component';
import {BudgetForecastTransferDialogComponent} from './budget-forecast-transfer-dialog/budget-forecast-transfer-dialog.component';
import {BudgetForecastCorrectionDialogComponent} from './budget-forecast-correction-dialog/budget-forecast-correction-dialog.component';
import {UpdateDataImportModalComponent} from '../../../common/update-data-import-modal/update-data-import-modal.component';
import {DialogService} from '../../../services/dialog.service';

import alasql from 'alasql';
import { RequestResult } from '../../../model/api/result/request-result';
import {ProgressService} from '../../../services/progress.service';
import { DataProgress } from '../../../model/api/common/data-progress';
var XLSX = require('xlsx')
alasql.setXLSX(XLSX);

@Component({
  selector: 'app-budget-forecast-manage',
  templateUrl: 'budget-forecast.manage.html',
  styleUrls: ['budget-forecast.manage.scss'],
  providers: [
    AdministrationDetailHttpService,
    EmployeeHttpService,
    PartnerHttpService,
    CostCenterHttpService,
    ConfigValuesHttpService,
    CompanyHttpService,
    AccMonthHttpService,
  ]
})
export class BudgetForecastManageComponent implements OnInit, AfterViewInit {

  public _projects: Project[] = [];
  public get projects(): Project[] { return this._projects; }
  public set projects(value: Project[]) {
    this._projects = value;

    this.setSelectedProjects(value);
  }

  public _activities: Activity[] = [];
  public get activities(): Activity[] { return this._activities; }
  public set activities(value: Activity[]) {
    this._activities = value;

    this.setSelectedActivities(value);
  }

  public _assetTypes: AssetType[] = [];
  public get assetTypes(): AssetType[] { return this._assetTypes; }
  public set assetTypes(value: AssetType[]) {
    this._assetTypes = value;

    this.selectedAssetTypes = value;
    this.checkForRefresh();
  }

  public _admCenters: AdmCenter[] = [];
  public get admCenters(): AdmCenter[] { return this._admCenters; }
  public set admCenters(value: AdmCenter[]) {
    this._admCenters = value;

    this.selectedAdmCenters = value;
    this.checkForRefresh();
  }

  public _divisions: Division[] = [];
  public get divisions(): Division[] { return this._divisions; }
  public set divisions(value: Division[]) {
    this._divisions = value;

    this.selectedDivisions = value;
    this.checkForRefresh();
  }

  public _employee: Employee[] = [];
  public get employee(): Employee[] { return this._employee; }
  public set employee(value: Employee[]) {
    this._employee = value;

    this.selectedEmployees = value;
    this.checkForRefresh();
  }

  public _projectType: ProjectType[] = [];
  public get projectType(): ProjectType[] { return this._projectType; }
  public set projectType(value: ProjectType[]) {
    this._projectType = value;

    this.selectedProjectTypes = value;
    this.checkForRefresh();
  }

  public get divisionParams(): Array<Param> {
    let selectedDepartments: Array<Department> = null;
    selectedDepartments = this.selectedDepartments;

    const params = new Array<Param>();
    params.push(new Param('departmentIds', AppUtils.getIdsList<Department, number>(selectedDepartments)));

    return params;
  }

  public get employeeParams(): Array<Param> {
    let selectedCostCenters: Array<CostCenter> = null;
    selectedCostCenters = this.selectedCostCenters;

    const params = new Array<Param>();

    params.push(new Param('costCenterIds', AppUtils.getIdsList<CostCenter, number>(selectedCostCenters)));

    return params;
  }

  public onClearFilters() {
    this.projects = null;
    this.activities = null;
    this.assetTypes = null;
    this.admCenters = null;
    this.divisions = null;
    this.filter = '';
  }

   @ViewChild('budgetList') public budgetList: BudgetForecastListComponent;

  @ViewChild('uploadModal') public uploadModal: ModalDirective;

  @ViewChild('employeeList') public employeeList: EmployeeListComponent;
  @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

  @ViewChild('accMonthList') public accMonthList: AccMonthListComponent;
  @ViewChild('accMonthListModal') public accMonthListModal: ModalDirective;

  @ViewChild('companyList') public companyList: CompanyListComponent;
  @ViewChild('companyListModal') public companyListModal: ModalDirective;

  @ViewChild('partnerList') public partnerList: PartnerListComponent;
  @ViewChild('partnerListModal') public partnerListModal: ModalDirective;

  @ViewChild('costCenterList') public costCenterList: CostCenterListComponent;
  @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;

  @ViewChild('budgetManagerList') public budgetManagerList: BudgetManagerList;
  @ViewChild('budgetManagerListModal') public budgetManagerListModal: ModalDirective;

  @ViewChild('projectList') public projectList: ProjectList;
  @ViewChild('projectListModal') public projectListModal: ModalDirective;

  @ViewChild('activityList') public activityList: ActivityList;
  @ViewChild('activityListModal') public activityListModal: ModalDirective;

  @ViewChild('divisionList') public divisionList: DivisionListComponent;
  @ViewChild('divisionListModal') public divisionListModal: ModalDirective;

  @ViewChild('departmentList') public departmentList: DepartmentListComponent;
  @ViewChild('departmentListModal') public departmentListModal: ModalDirective;

  @ViewChild('assetTypeList') public assetTypeList: AssetTypeListComponent;
  @ViewChild('assetTypeListModal') public assetTypeListModal: ModalDirective;

  @ViewChild('admCenterList') public admCenterList: AdmCenterListComponent;
  @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;

  @ViewChild('projectTypeList') public projectTypeList: ProjectTypeListComponent;
  @ViewChild('projectTypeListModal') public projectTypeListModal: ModalDirective;

  @ViewChild('administrationList')
  public administrationList: AdministrationListComponent;
  @ViewChild('administrationListModal')
  public administrationListModal: ModalDirective;

  public fileEventBudget: any = null;
  public fileEventBudgetBase: any = null;
  exportCompleted = true;

  subsription: Subscription;

  tableFilterName = '';
  filterName = '';
  hasChange: string = '-';
  isFirst: string = '-';
  date12: Date;

  public selectedProjects: Array<Project> = new Array<Project>();
   public projectId = 0;
   public selectedCountries: Array<Country> = new Array<Country>();
   public countryId = 0;
   public selectedDepartments: Array<Department> = new Array<Department>();
   public departmentId = 0;
   public selectedDivisions: Array<Division> = new Array<Division>();
   public divisionId = 0;
   public selectedAdmCenters: Array<AdmCenter> = new Array<AdmCenter>();
   public admCenterId = 0;
   public selectedRegions: Array<Region> = new Array<Region>();
   public regionId = 0;
   public selectedAssetTypes: Array<AssetType> = new Array<AssetType>();
   public assetTypeId = 0;
   public selectedCompanies: Array<Company> = new Array<Company>();
   public companyId = 0;
   public selectedActivities: Array<Activity> = new Array<Company>();
   public activityId = 0;
   public selectedProjectTypes: Array<ProjectType> = new Array<ProjectType>();
   public projectTypeId = 0;
   public accMonthId = 36;

   public selectedBudgetManagers: Array<BudgetManager> = new Array<BudgetManager>();

  @ViewChild('fileInputBudget') fileInputBudget: ElementRef;
  @ViewChild('importDataBudgetModal') public importDataBudgetModal: ModalDirective;

  @ViewChild('angularGrid') angularGrid: AngularTreeGridComponent;

  public importBudgetLines: Array<BudgetImport> = new Array<BudgetImport>();
  public importBudgetBaseLines: Array<BudgetBaseImport> = new Array<BudgetBaseImport>();

  public noOfItems: number = 0;
  public importIndex: number = 0;

  public mainViewMode: number = AssetManageViewMode.AssetList;
  public viewMode: number = AssetManageViewMode.AssetList;

  public filter: string;
  isCollapsed: boolean = false;
  public fileEvent: any = null;
  public showExportBtn = true;

  activeState: boolean[] = [true, false, false];

  public updateAssetDepDetailSelectionEvent: EventEmitter<Array<AssetDepDetail>> = new EventEmitter<Array<AssetDepDetail>>();
  public updateAssetInvDetailSelectionEvent: EventEmitter<Array<AssetInvDetail>> = new EventEmitter<Array<AssetInvDetail>>();

  public selectedPartners: Array<Partner> = new Array<Partner>();

  public selectedCostCenters: Array<CostCenter> = new Array<CostCenter>();
  public selectedEmployees: Array<Employee> = new Array<Employee>();
  public selectedAccMonths: Array<AccMonth> = new Array<AccMonth>();
  public selectedAdministrations: Array<Administration> = new Array<Administration>();
  public get isAdmin(): boolean {
    return AppData.UserIsAdmin;
  }

  public params: Array<Param> = null;

  data: any[] = [];

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    private progressService: ProgressService,
    public dialogService: DialogService,
    public administrationDetailHttpService: AdministrationDetailHttpService,
    public budgetForecastHttpService: BudgetForecastHttpService,
    public employeeHttpService: EmployeeHttpService,
    public partnerHttpService: PartnerHttpService,
    public costCenterHttpService: CostCenterHttpService,
    public companyHttpService: CompanyHttpService,
    public accMonthHttpService: AccMonthHttpService,
    public budgetManagerHttpService: BudgetManagerHttpService,
    public projectHttpService: ProjectHttpService,
    public activityHttpService: ActivityHttpService,
    public departmentHttpService: DepartmentHttpService,
    public divisionHttpService: DivisionHttpService,
    public assetTypeHttpService: AssetTypeHttpService,
    public admCenterHttpService: AdmCenterHttpService,
    public projectTypeHttpService: ProjectTypeHttpService,
    public configValuesHttpService: ConfigValuesHttpService,
    public notificationHttpService: NotificationService,
    private messageService: MessageService,
  ) {

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (evt.urlAfterRedirects === '/budget') {
          // console.log('refreshing asset inv details');
          // console.log(JSON.stringify(evt));
          setTimeout(() => {
            this.refreshAssets();
          }, 500);
        }
      }
    });
  }

  public view: string;
  // public selectedAssetId: number = 0;
  public budgetRowSelection: string = 'single';
  public selectedBudgets: Array<BudgetForecast> = new Array<BudgetForecast>();
  public selectedBudgetDetails: Array<AssetInvDetail> = new Array<AssetInvDetail>();

  ngOnInit() {
    // this.date12 = new Date();
    //   this.date12.setFullYear(this.date12.getFullYear(), this.date12.getMonth());
    // this.installOverlayPanelFix();
  //   this.dashbBoardService.getCustomersMedium().then(data => {
  //     this.customers = data;
  //     this.updateRowGroupMetaData();
  // });

  // this.dashbBoardService.getProductsWithOrdersSmall().then(data => this.products = data);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.clearFilters();
    }, 1000);
  }

  private installOverlayPanelFix() {

    const onAlignSource: Function = OverlayPanel.prototype.align;
    OverlayPanel.prototype.align = function (this: OverlayPanel) {
        // var _this = this;
      //   if (_this.container != null && _this.target != null) {
      //       onAlignSource.call(_this);
      //  }
    };

    const onBindDocumentClickListenerSource: Function = OverlayPanel.prototype.bindDocumentClickListener;
    OverlayPanel.prototype.bindDocumentClickListener = function (this: OverlayPanel) {
      const _this = this;
        if (_this.container != null && _this.target != null) {
            onBindDocumentClickListenerSource.call(_this);
        }
    };

    OverlayPanel.prototype.hide = function (this: OverlayPanel) {
        const _this = this;
        _this.render = false;
        _this.overlayVisible = false;
    };

    const onAnimationEndSource: Function = OverlayPanel.prototype.onAnimationEnd;
    OverlayPanel.prototype.onAnimationEnd = function (this: OverlayPanel, event: any) {
      const _this = this;
        onAnimationEndSource.call(_this, event);
        if (event.toState === 'close') {
            _this.render = true;
        }
    };
}

  public clearSelection() {
     // this.budgetList.selectedItems = this.selectedBudgetDetails;
  }

  public clearFilters() {
    this.selectedCostCenters = new Array<CostCenter>();
    this.selectedEmployees = new Array<Employee>();
    this.selectedCompanies = new Array<Company>();
    this.selectedDepartments = new Array<Department>();
    this.selectedDivisions = new Array<Division>();
    this.selectedAdministrations = new Array<Administration>();
    this.selectedPartners = new Array<Partner>();
    this.selectedAssetTypes = new Array<AssetType>();
    this.selectedAdmCenters = new Array<AdmCenter>();
    this.selectedAccMonths = new Array<AccMonth>();
    this.filter = '';
    this.companyId = 0;
    this.departmentId = 0;
    this.divisionId = 0;
    this.admCenterId = 0;
    this.regionId = 0;
    this.assetTypeId = 0;
    this.projectId = 0;
    this.accMonthId = 36;
    this.hasChange = '-';
    this.isFirst = '-';

    this.selectedBudgetDetails = new Array<AssetInvDetail>();
    this.selectedBudgets = new Array<BudgetForecast>();
    this.checkForRefresh();
  }


  // public addNewBudget() {
  //   this.router.navigate(['/budget/new']);
  // }

  public addNewBudget() {
    // this.router.navigate(['/budgetbaseadd/new']);
    this.onAddEditItem();
  }

  public onItemDetails() {
    this.itemDetails();
  }

  public onAddEditItem() {
    const dialogRef = this.dialog.open(BudgetAddDialogComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      // data: { selectedBudget: this.budgetList.selectedItems[0] }
    });

    dialogRef.afterClosed().subscribe((item: RequestResult) => {
       if (item.success) this.refreshAssets();
    });
  }

  public itemDetails() {
    const dialogRef = this.dialog.open(BudgetEditDialogComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { selectedBudget: this.budgetList.selectedItems[0] }
    });

    dialogRef.afterClosed().subscribe((item: RequestResult) => {
    // if (item.success) this.refreshAssets();
    this.refreshAssets();
    });
  }

  public addNewOperation() {
    // AppData.AssetList = this.selectedBudgets;
    // let isInTransfer: number = 0;
    // this.selectedAssets.forEach(asset => {
    //     if (asset.isInTransfer){
    //         this.toastr.warning('Inventory number ' + asset.invNo + ' awaiting validation!');
    //         isInTransfer++;
    //     }
    // });

    // if (isInTransfer > 0){
    //     return;
    // }else{
    //     this.router.navigate(['/newoperation']);
    // }

    this.router.navigate(['/newoperation']);
  }

  public changeRowSelection() {
    if (this.budgetRowSelection === 'single') {
      this.budgetRowSelection = 'multiple';
    } else {
      this.selectedBudgets = new Array<BudgetForecast>();
      // this.selectedAssetId = 0;
      this.budgetRowSelection = 'single';
      this.updateAssetDepDetailSelectionEvent.emit(new Array<AssetDepDetail>());
      this.updateAssetInvDetailSelectionEvent.emit(new Array<AssetInvDetail>());
    }
  }
  // public editBudget() {
  //   let selectedAssetId =
  //     this.selectedBudgets.length > 0 ? this.selectedBudgets[0].id : 0;
  //   if (selectedAssetId > 0) {
  //     this.router.navigate(['/budget', selectedAssetId]);
  //   }
  // }

  // public editBudget() {
  //   const selectedAssetId =
  //     this.selectedBudgets.length > 0 ? this.selectedBudgets[0].budgetBase.id : 0;
  //   if (selectedAssetId > 0) {
  //     this.router.navigate(['/budgetbase', selectedAssetId]);
  //   }
  // }

  public editBudget() {
    const selectedAssetId =
      this.selectedBudgets.length > 0 ? this.selectedBudgets[0].id : 0;
    if (selectedAssetId > 0) {
      this.router.navigate(['/budgetforecast', selectedAssetId]);
    }
  }

  public correctionBudget() {
    const selectedAssetId =
      this.selectedBudgets.length > 0 ? this.selectedBudgets[0].id : 0;
    if (selectedAssetId > 0) {
      // this.router.navigate(['/budgetforecastcorrection', selectedAssetId]);
      this.onBudgetCorrection(selectedAssetId);
    }
  }

  public onBudgetCorrection(selectedAssetId: any) {
    let dialogRef = this.dialog.open(BudgetForecastCorrectionDialogComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { selectedItem: selectedAssetId }
    });

    dialogRef.afterClosed().subscribe((item: any) => {
      if (item !== null) this.checkForRefresh();
    });
  }

  public transferBudget() {
    const selectedAssetId =
      this.selectedBudgets.length > 0 ? this.selectedBudgets[0].id : 0;
    if (selectedAssetId > 0) {
      // this.router.navigate(['/budgetforecasttransfer', selectedAssetId]);
      this.onBudgetTransfer(selectedAssetId);
    }
  }

  public onBudgetTransfer(selectedAssetId: any) {
    let dialogRef = this.dialog.open(BudgetForecastTransferDialogComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { itemId: selectedAssetId }
    });

    dialogRef.afterClosed().subscribe((item: any) => {
      if (item !== null) this.checkForRefresh();
    });
  }

  public onBudgetSelectionChanged(assets: Array<any>) {
    this.selectedBudgetDetails = assets;
    this.selectedBudgets = new Array<any>();
    assets.forEach((asset: any) => {
      this.selectedBudgets.push(asset);
    });
  }

  /*begin asset*/
  public assetDetailGoBack() {
    this.mainViewMode = AssetManageMainViewMode.AssetList;
    this.viewMode = AssetManageViewMode.AssetList;
  }

  public assetDetailChangesCanceled() {
    this.assetDetailGoBack();
  }
  /*end asset*/

  public operationDetailGoBack() {
    this.mainViewMode = AssetManageMainViewMode.AssetList;
    this.viewMode = AssetManageViewMode.AssetList;
  }

  public onOperationCanceled() {
    this.operationDetailGoBack();
  }

  public onOperationSaved() {
    this.operationDetailGoBack();
    this.refreshAssets();
  }

  /*begin costcenter*/
  public selectCostCenters() {
    this.costCenterListModal.show();
    this.costCenterList.selectedItems = this.selectedCostCenters;
    this.costCenterList.refresh(null);
  }

  public removeFromCostCenterSelection(costCenter: CostCenter) {
    const index: number = this.selectedCostCenters.indexOf(costCenter);
    this.selectedCostCenters.splice(index, 1);
    this.checkForRefresh();
  }

  public clearCostCenterSelection() {
    this.selectedCostCenters = new Array<CostCenter>();
    this.checkForRefresh();
  }

  public setSelectedCostCenters() {
    this.selectedCostCenters = this.costCenterList.selectedItems;
    this.costCenterListModal.hide();
    this.checkForRefresh();
  }
  /*end costcenter*/

  /*begin partner*/
  public selectPartners() {
    this.partnerListModal.show();
    this.partnerList.selectedItems = this.selectedPartners;
    this.partnerList.refresh(null);
  }

  public removeFromPartnerSelection(partner: Partner) {
    const index: number = this.selectedPartners.indexOf(partner);
    this.selectedPartners.splice(index, 1);
    this.checkForRefresh();
  }

  public clearPartnerSelection() {
    this.selectedPartners = new Array<Partner>();
    this.checkForRefresh();
  }

  public setSelectedPartners() {
    this.selectedPartners = this.partnerList.selectedItems;
    this.partnerListModal.hide();
    this.checkForRefresh();
  }
  /*end partner*/

  /* begin employee */

  public selectEmployees() {
    let selectedCostCenters: Array<CostCenter> = null;
    selectedCostCenters = this.selectedCostCenters;
    const params = new Array<Param>();
    params.push(
      new Param(
        'costCenterIds',
        AppUtils.getIdsList<CostCenter, number>(selectedCostCenters)
      )
    );
    this.employeeListModal.show();
    this.employeeList.selectedItems = this.selectedEmployees;
    this.employeeList.refresh(params);
  }

  public removeFromEmployeeSelection(employee: Employee) {
    const index: number = this.selectedEmployees.indexOf(employee);
    this.selectedEmployees.splice(index, 1);
    this.checkForRefresh();
  }

  public clearEmployeeSelection() {
    this.selectedEmployees = new Array<Employee>();
    this.checkForRefresh();
  }

  public setSelectedEmployees() {
    this.selectedEmployees = this.employeeList.selectedItems;
    this.employeeListModal.hide();
    this.checkForRefresh();
  }

  /*end employee*/


  /* begin AccMonth */

  public selectAccMonths() {
    this.accMonthListModal.show();
    this.accMonthList.selectedItems = this.selectedAccMonths;
    this.accMonthList.refresh(null);
  }

  public removeFromAccMonthSelection(accMonth: AccMonth) {
    const index: number = this.selectedAccMonths.indexOf(accMonth);
    this.selectedAccMonths.splice(index, 1);
    this.checkForRefresh();
  }

  public clearAccMonthSelection() {
    this.selectedAccMonths = new Array<AccMonth>();
    this.checkForRefresh();
  }

  public setSelectedAccMonths() {
    this.selectedAccMonths = this.accMonthList.selectedItems;
    this.accMonthId = this.selectedAccMonths.length === 1 ? this.selectedAccMonths[0].id : 36;
    this.accMonthListModal.hide();
    this.checkForRefresh();
  }

  /*end acc month */

  /* begin Company */

  public selectCompanies() {
    this.companyListModal.show();
    this.companyList.selectedItems = this.selectedCompanies;
    this.companyList.refresh(null);
  }

  public removeFromCompanySelection(company: Company) {
    const index: number = this.selectedCompanies.indexOf(company);
    this.selectedCompanies.splice(index, 1);
    this.checkForRefresh();
  }

  public clearCompanySelection() {
    this.selectedCompanies = new Array<Company>();
    this.checkForRefresh();
  }

  public setSelectedCompanies() {
    this.selectedCompanies = this.companyList.selectedItems;
    this.companyListModal.hide();
    this.checkForRefresh();
  }

  /* enf Company */

  /* begin administrTION */

  public selectAdministrations() {
    const selectedAdministrations: Array<Administration> = null;

    this.administrationListModal.show();
    this.administrationList.selectedItems = this.selectedAdministrations;
    this.administrationList.refresh(null);
  }

  public removeFromAdministrationSelection(administration: Administration) {
    const index: number = this.selectedAdministrations.indexOf(administration);
    this.selectedAdministrations.splice(index, 1);
    this.checkForRefresh();
  }

  public clearAdministrationSelection() {
    this.selectedAdministrations = new Array<Administration>();
    this.checkForRefresh();
  }

  public setSelectedAdministrations() {
    this.selectedAdministrations = this.administrationList.selectedItems;
    this.administrationListModal.hide();
    this.checkForRefresh();
  }

  /* enf room */

  public checkForRefresh() {
    this.clearSelection();
    this.refreshAssets();
  }

  public deleteBudget() {
    if (confirm('Esti sigur ca vrei sa stergi acest obiect?')) {
      this.budgetForecastHttpService
        .deleteAsset(this.selectedBudgets[0].id)
        .subscribe((res) => {});
    }

    this.checkForRefresh();
  }

  public refreshAssets() {
    const params: Array<Param> = this.getFilters();
    if (this.budgetList !== undefined) {
      this.budgetList.refresh(params);
    }
  }

  public getFilters(): Array<Param> {
    const params = new Array<Param>();
    const budgetFilter: BudgetFilter = new BudgetFilter();

    if (this.selectedAdministrations != null) {
      budgetFilter.administrationIds = new Array<number>();
      this.selectedAdministrations.forEach((administration) => {
        budgetFilter.administrationIds.push(administration.id);
      });
    }

    if (this.selectedPartners != null) {
      budgetFilter.partnerIds = new Array<number>();
      this.selectedPartners.forEach((partner) => {
        budgetFilter.partnerIds.push(partner.id);
      });
    }

    if (this.selectedCostCenters != null) {
      budgetFilter.costCenterIds = new Array<number>();
      this.selectedCostCenters.forEach((costcenter) => {
        budgetFilter.costCenterIds.push(costcenter.id);
      });
    }

    if (this.selectedEmployees != null) {
      budgetFilter.employeeIds = new Array<number>();
      this.selectedEmployees.forEach((employee) => {
        budgetFilter.employeeIds.push(employee.id);
      });
    }

    if (this.selectedCompanies != null) {
      budgetFilter.companyIds = new Array<number>();
      this.selectedCompanies.forEach((company) => {
        budgetFilter.companyIds.push(company.id);
      });
    }

    if (this.selectedProjects != null) {
      budgetFilter.projectIds = new Array<number>();
      this.selectedProjects.forEach((project) => {
        budgetFilter.projectIds.push(project.id);
      });
    }

    if (this.selectedAssetTypes != null) {
      budgetFilter.assetTypeIds = new Array<number>();
      this.selectedAssetTypes.forEach((assetType) => {
        budgetFilter.assetTypeIds.push(assetType.id);
      });
    }

    if (this.selectedProjectTypes != null) {
      budgetFilter.projectTypeIds = new Array<number>();
      this.selectedProjectTypes.forEach((project) => {
        budgetFilter.projectTypeIds.push(project.id);
      });
    }

    if (this.selectedAdmCenters != null) {
      budgetFilter.admCenterIds = new Array<number>();
      this.selectedAdmCenters.forEach((admCenter) => {
        budgetFilter.admCenterIds.push(admCenter.id);
      });
    }

    if (this.selectedAccMonths != null) {
      budgetFilter.accMonthIds = new Array<number>();
      this.selectedAccMonths.forEach((accMonth) => {
        budgetFilter.accMonthIds.push(accMonth.id);
      });
    }

    if (this.selectedDivisions != null) {
      budgetFilter.divisionIds = new Array<number>();
      this.selectedDivisions.forEach((division) => {
        budgetFilter.divisionIds.push(division.id);
      });
    }

    if (this.selectedActivities != null) {
      budgetFilter.activityIds = new Array<number>();
      this.selectedActivities.forEach((activity) => {
        budgetFilter.activityIds.push(activity.id);
      });
    }

    budgetFilter.monthYear = this.date12;

    budgetFilter.filter = this.filter;
    budgetFilter.hasChange = ((this.hasChange === '-') ? null : (this.hasChange === 'DA' ? true : false));
    budgetFilter.isFirst = ((this.isFirst === '-') ? null : (this.isFirst === 'DA' ? true : false));
    // params.push(new Param('pageSize', this.pageSize.toString()));
    params.push(new Param('jsonFilter', JSON.stringify(budgetFilter)));
    return params;
  }

  public export() {
    this.showExportBtn = false;
    let params: Array<Param> = null;

    params = this.getFilters();
    this.budgetForecastHttpService.export(params).subscribe((blob) => {
      fileSaveAs(blob.body, 'Export.xlsx');
      this.showExportBtn = true;
    });
  }

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

//   public onPageUpdate(number: number) {
//     this.pageSize = number;
//     this.checkForRefresh();
// }

public loadFile(ev) {
  this.fileEvent = ev;
}

public importData() {

  if (this.fileEvent === null) { return; }

  // alasql.promise(`select [ASSET SEQ NO-A] as InvNo1,
  //                     [ASSET SEQ NO] as InvNo2,
  //                     [ASSET COMPONENT] as InvNo3,
  //                     [GENERAL CATEGORY] as AssetCategoryCode,
  //                     [FA ACCOUNT DESCRIPTION] as AssetCategoryName,
  //                     [QUANTITY] as Quantity,
  //                     [BRANCH CODE] as LocationCode,
  //                     [COST CENTER] as CostCenterCode,
  //                     [ASSET DESCRIPTION] as AssetName,
  //                     [ACQUISITION DATE] as PurchaseDate,
  //                     CAST([ORIGINAL COST] AS NUMBER) as [ValueInv],
  //                     [SUPPLIER] as PartnerName,
  //                     [TAX NUMBER] as FiscalCode,
  //                     [DOCUMENT NUMBER] as DocNo1,
  //                     [SERIAL NUMBER] as SerialNumber,
  //                     [DISPOSITION DATE] as AssetState,
  //                     [FA ACCOUNT] as AssetType,
  //                     CAST([NET BOOK VALUE] AS NUMBER) as [ValueRem]
  //                     from FILE(?, {headers: true})`, [this.fileEvent])
  // .then((importLines: Array<AssetImportV1>) => {

  //         this.importDataModal.show();

  //         this.importIndex = 0;
  //         this.importLinesV1 = importLines;
  //         this.noOfItems = importLines.length;
  //    //  console.log(importLines);
  //         this.doImportV1();
  // });

}

public uploadBudgetFile() {

  let dialogRef = this.dialog.open(UpdateDataImportModalComponent, {
    panelClass: 'centered-middle-modal', height: '85%', maxHeight: '85%', disableClose: true, width: '700px', position: { bottom: '15%', top: 'auto'},
    data: { itemId: 1 }
  });

  dialogRef.afterClosed().subscribe((results: any) => {
    this.loadFileBudget(results);
  });
}

public loadFileBudget(ev) {
  this.fileEventBudget = ev.files;

  // console.log(this.fileEventBudget);

  // @ts-ignore
  alasql.fn.datetime = function sheetDateToJSDate(n) {
    const d = new Date(1899, 11, 30);
    d.setDate(d.getDate() + n);
    // Rounds milliseconds to seconds
    d.setSeconds(d.getSeconds() + Math.round(d.getMilliseconds() / 1000));
    d.setMilliseconds(0);
    return d;
  };

  alasql.promise(`select
                      [A] as [UniqueCode],
                      [A] as [BudgetCode],
                      [B] as [Employee],
                      [C] as [Project],
                      [D] as [CountryName],
                      [E] as [CountryCode],
                      [F] as [Activity],
                      [G] as [DepartmentName],
                      [H] as [DepartmentCode],
                      [I] as [AdmCenter],
                      [J] as [Region],
                      [K] as [DivisionName],
                      [L] as [DivisionCode],
                      [M] as [ProjectTypeName],
                      CAST([N] as VARCHAR) as [ProjectTypeCode],
                      [O] as [Info],
                      [P] as [AssetTypeName],
                      [Q] as [AssetTypeCode],
                      [R] as [AppState],
                      [S] as [StartMonth],
                      CAST([T] as NUMBER) as [DepPeriod],
                      CAST([U] as NUMBER) as [DepPeriodRem],
                      CAST([V] as NUMBER) as [WIP],
                      CAST([W] as NUMBER) as [ValueMonth1],
                      CAST([X] as NUMBER) as [ValueMonth2],
                      CAST([Y] as NUMBER) as [ValueMonth3],
                      CAST([Z] as NUMBER) as [ValueMonth4],
                      CAST([AA] as NUMBER) as [ValueMonth5],
                      CAST([AB] as NUMBER) as [ValueMonth6],
                      CAST([AC] as NUMBER) as [ValueMonth7],
                      CAST([AD] as NUMBER) as [ValueMonth8],
                      CAST([AE] as NUMBER) as [ValueMonth9],
                      CAST([AF] as NUMBER) as [ValueMonth10],
                      CAST([AG] as NUMBER) as [ValueMonth11],
                      CAST([AH] as NUMBER) as [ValueMonth12],
                      CAST([AJ] as NUMBER) as [ValueOrder]
                      from FILE(?, {headers: true})`, [this.fileEventBudget])
      .then((importLines: Array<BudgetBaseImport>) => {
          // console.log(JSON.stringify(importLines));
          const newArray = importLines.filter(value => value.Employee !== undefined);
           // console.log(JSON.stringify(newArray));
          // importLines = this.removeUndefinedFromArray(importLines);
          // console.log(JSON.stringify(importLines));
          // this.importDataBudgetModal.show();

          this.importIndex = 1;
          this.importBudgetBaseLines = newArray;
          this.noOfItems = newArray.length;

          this.dialogService
            .progressImportDialog({
              title: 'Progress import',
              importIndex: this.importIndex,
              importBudgetBaseLines: this.importBudgetBaseLines,
              noOfItems: this.noOfItems
            })
            .subscribe((confirmed: any) => {

            });

          setTimeout(function() {
            // Send progress to the component
            this.progressService.emitChange(this.importIndex);
          }, 500);

          this.doImportBudget();
  });
}

public uploadBudget() {
  this.uploadModal.hide();
  this.importDataBudget();
}


public importDataBudget() {

  if (this.fileEventBudget === null) { return; }

  alasql.promise(`select
                      [COMPANY] as [Company],
                      [COUNTRY] as [Country],
                      [PROJECT ID (WBS)] as [Project],
                      [ACTIVITY] as [Activity],
                      [PC] as [AdmCenter],
                      [PC DET] as [Region],
                      [TYPE] as [AssetType],
                      [PROJECT] as [ProjectType],
                      [DETAILS] as [Info],
                      [ACQ] as [AppState],
                      CAST([DEP PER] as NUMBER) as [DepPeriod],
                      CAST([DEP PER REM] as NUMBER) as [DepPeriodRem],
                      CAST([VALUE REM] as NUMBER) as [ValueRem],
                      CAST([MONTH 1] as NUMBER) as [ValueMonth1],
                      CAST([MONTH 2] as NUMBER) as [ValueMonth2],
                      CAST([MONTH 3] as NUMBER) as [ValueMonth3],
                      CAST([MONTH 4] as NUMBER) as [ValueMonth4],
                      CAST([MONTH 5] as NUMBER) as [ValueMonth5],
                      CAST([MONTH 6] as NUMBER) as [ValueMonth6],
                      CAST([MONTH 7] as NUMBER) as [ValueMonth7],
                      CAST([MONTH 8] as NUMBER) as [ValueMonth8],
                      CAST([MONTH 9] as NUMBER) as [ValueMonth9],
                      CAST([MONTH 10] as NUMBER) as [ValueMonth10],
                      CAST([MONTH 11] as NUMBER) as [ValueMonth11],
                      CAST([MONTH 12] as NUMBER) as [ValueMonth12],
                      [Month START] as [StartMonth]
                      from FILE(?, {headers: true})`, [this.fileEventBudget])
      .then((importLines: Array<BudgetImport>) => {

          // console.log(JSON.stringify(importLines));
          importLines = this.removeUndefinedFromArray(importLines);
          // console.log(JSON.stringify(importLines));
          this.importDataBudgetModal.show();

          this.importIndex = 0;
          this.importBudgetLines = importLines;
          this.noOfItems = importLines.length;

          this.doImportBudget();
  });

}

public importDataBudgetBase() {

  if (this.fileEventBudgetBase === null) { return; }

  // alasql.promise(`select
  //                     [COMPANY] as [Employee],
  //                     [COUNTRY] as [Project],
  //                     [PROJECT ID (WBS)] as [CountryName],
  //                     [PROJECT ID (WBS)] as [CountryCode],
  //                     [ACTIVITY] as [Activity],
  //                     [PROJECT ID (WBS)] as [DepartmentName],
  //                     [PROJECT ID (WBS)] as [DepartmentCode],
  //                     [PC] as [AdmCenter],
  //                     [PC DET] as [Region],
  //                     [PROJECT ID (WBS)] as [DivisionName],
  //                     [PROJECT ID (WBS)] as [DivisionCode],
  //                     [PROJECT ID (WBS)] as [ProjectTypeName],
  //                     [PROJECT ID (WBS)] as [ProjectTypeCode],
  //                     [DETAILS] as [Info],
  //                     [PROJECT ID (WBS)] as [AssetTypeName],
  //                     [PROJECT ID (WBS)] as [AssetTypeCode],
  //                     [ACQ] as [AppState],
  //                     [Month START] as [StartMonth]
  //                     CAST([DEP PER] as NUMBER) as [DepPeriod],
  //                     CAST([DEP PER REM] as NUMBER) as [DepPeriodRem],
  //                     CAST([MONTH 1] as NUMBER) as [ValueMonth1],
  //                     CAST([MONTH 2] as NUMBER) as [ValueMonth2],
  //                     CAST([MONTH 3] as NUMBER) as [ValueMonth3],
  //                     CAST([MONTH 4] as NUMBER) as [ValueMonth4],
  //                     CAST([MONTH 5] as NUMBER) as [ValueMonth5],
  //                     CAST([MONTH 6] as NUMBER) as [ValueMonth6],
  //                     CAST([MONTH 7] as NUMBER) as [ValueMonth7],
  //                     CAST([MONTH 8] as NUMBER) as [ValueMonth8],
  //                     CAST([MONTH 9] as NUMBER) as [ValueMonth9],
  //                     CAST([MONTH 10] as NUMBER) as [ValueMonth10],
  //                     CAST([MONTH 11] as NUMBER) as [ValueMonth11],
  //                     CAST([MONTH 12] as NUMBER) as [ValueMonth12]
  //                     from FILE(?, {headers: true})`, [this.fileEventBudgetBase])
  //     .then((importLines: Array<BudgetBaseImport>) => {

  //         console.log(JSON.stringify(importLines));
  //         importLines = this.removeUndefinedFromArray(importLines);
  //         console.log(JSON.stringify(importLines));
  //         this.importDataBudgetModal.show();

  //         this.importIndex = 0;
  //         this.importBudgetBaseLines = importLines;
  //         this.noOfItems = importLines.length;

  //         this.doImportBudget();
  // });

}

public removeUndefinedFromArray = (arrayToClean) => {
  const cleanedArray = [];
  arrayToClean.forEach((val) => {
    if (typeof val.Company !== 'undefined') {
      cleanedArray.push(val);
    }
  });

  return cleanedArray;
}

public doImportBudget() {
  if (this.importIndex < this.importBudgetBaseLines.length) {
    this.importBudgetBaseLines[this.importIndex].countLines = this.importBudgetBaseLines.length;
    this.importBudgetBaseLines[this.importIndex].currentIndex = this.importIndex;
      this.budgetForecastHttpService.import(this.importBudgetBaseLines[this.importIndex]).subscribe((data: ImportBudgetResult) => {
          // if (data === 0) {
          //     alert('Seria ' + this.importSNLines[this.importIndex].SerialNumber + ' exista deja in baza de date!');
          //     return;
          // }

          if (data.success) {
            this.notificationHttpService.showSuccess(data.message, 'Linia ' + this.importIndex, 3000, true, 3000);

            this.importIndex = this.importIndex + 1;

            const item = new DataProgress();
            item.currentIndex = this.importIndex;
            item.noOfItems = this.importBudgetBaseLines.length;

            this.progressService.emitModelChange(item);

            this.doImportBudget();
          } else {
            this.notificationHttpService.showError(data.message, 'Linia ' + this.importIndex, 0, true, 0);
            const item = new DataProgress();
            item.currentIndex = this.importIndex;
            item.noOfItems = this.importBudgetBaseLines.length;

            this.progressService.emitModelChange(item);
          }
      });
  } else {
      this.fileEventBudget = null;
      this.importDataBudgetModal.hide();
      this.importIndex = 1;
      this.importBudgetBaseLines = new Array<BudgetBaseImport>();
      this.checkForRefresh();
  }
}

public exportTemplate() {
  this.exportCompleted = false;
  this.budgetForecastHttpService
      .template()
      .subscribe((blob) => {
          fileSaveAs(blob.body, 'model-import-buget.xlsx');
          this.exportCompleted = true;
      });
}

onTabClose(event) {
  this.messageService.add({severity: 'info', summary: 'Tab Closed', detail: 'Index: ' + event.index});
}

onTabOpen(event) {
  this.messageService.add({severity: 'info', summary: 'Tab Expanded', detail: 'Index: ' + event.index});
}

toggle(index: number) {
  this.activeState[index] = !this.activeState[index];
}

handleChange(e) {
  const index = e.index;
  console.log(JSON.stringify(e));
}

collapseAll() {
  this.angularGrid.collapseAll();
}

expandAll() {
  this.angularGrid.expandAll();
}

onRowAdd($e) {
  const data = $e.data;
  setTimeout(() => {
    $e.resolve();
  }, 1000);
}

onRowSave($e) {
  const data = $e.data;
  setTimeout(() => {
    $e.resolve();
  }, 1000);
}

onRowDelete($e) {
  const data = $e.data;
  setTimeout(() => {
    $e.resolve();
  }, 1000);
}

onCellClick(event) {
  // console.log(JSON.stringify(event));
  // this.angularGrid.cellclick.emit();
}

 /*begin Budget Manager */
 public selectBudgetManagers() {
  this.budgetManagerListModal.show();
  this.budgetManagerList.selectedItems = this.selectedBudgetManagers;
  this.budgetManagerList.refresh(null);
}


public removeFromBudgetManagerSelection(budgetManager: BudgetManager) {
  const index: number = this.selectedBudgetManagers.indexOf(budgetManager);
  this.selectedBudgetManagers.splice(index, 1);
  this.checkForRefresh();
}

public clearBudgetManagerSelection() {
  this.selectedBudgetManagers = new Array<BudgetManager>();
  this.checkForRefresh();
}

public setSelectedBudgetManagers() {
  this.selectedBudgetManagers = this.budgetManagerList.selectedItems;
  this.budgetManagerListModal.hide();
  this.checkForRefresh();
}
/*end department*/

/* begin Projeect */

public selectProjects() {

  this.projectListModal.show();
  this.projectList.selectedItems = this.selectedProjects;
  this.projectList.refresh(null);
}

public removeFromProjectSelection(project: Project) {
  const index: number = this.selectedProjects.indexOf(project);
  this.selectedProjects.splice(index, 1);
  this.checkForRefresh();
}

public clearProjectSelection() {
  this.selectedProjects = new Array<Project>();
  this.checkForRefresh();
}

public setSelectedProjects(value) {
  // this.selectedProjects = this.projectList.selectedItems;
  this.selectedProjects = value;
  // this.projectListModal.hide();
  this.checkForRefresh();
}

/*end project*/

/*begin asset type*/

public selectAssetTypes() {
this.assetTypeListModal.show();
this.assetTypeList.selectedItems = this.selectedAssetTypes;
this.assetTypeList.refresh(null);
}

public removeFromAssetTypeSelection(assetType: AssetType) {
const index: number = this.selectedAssetTypes.indexOf(assetType);
this.selectedAssetTypes.splice(index, 1);
this.checkForRefresh();
}

public clearAssetTypeSelection() {
this.selectedAssetTypes = new Array<AssetType>();
this.checkForRefresh();
}

public setSelectedAssetTypes() {
this.selectedAssetTypes = this.assetTypeList.selectedItems;
this.assetTypeListModal.hide();
this.checkForRefresh();
}

/* end ASSET TYPE */


/*begin ADMCENTER */

public selectAdmCenters() {
  this.admCenterListModal.show();
  this.admCenterList.selectedItems = this.selectedAdmCenters;
  this.admCenterList.refresh(null);
  }

  public removeFromAdmCenterSelection(admCenter: AdmCenter) {
  const index: number = this.selectedAdmCenters.indexOf(admCenter);
  this.selectedAdmCenters.splice(index, 1);
  this.checkForRefresh();
  }

  public clearAdmCenterSelection() {
  this.selectedAdmCenters = new Array<AdmCenter>();
  this.checkForRefresh();
  }

  public setSelectedAdmCenters() {
  this.selectedAdmCenters = this.admCenterList.selectedItems;
  this.admCenterListModal.hide();
  this.checkForRefresh();
  }

  /* end ADMCENTER */

/*begin PROJECT type*/

public selectProjectTypes() {
this.projectTypeListModal.show();
this.projectTypeList.selectedItems = this.selectedProjectTypes;
this.projectTypeList.refresh(null);
}

public removeFromProjectTypeSelection(projectType: ProjectType) {
const index: number = this.selectedProjectTypes.indexOf(projectType);
this.selectedProjectTypes.splice(index, 1);
this.checkForRefresh();
}

public clearProjectTypeSelection() {
this.selectedProjectTypes = new Array<ProjectType>();
this.checkForRefresh();
}

public setSelectedProjectTypes() {
this.selectedProjectTypes = this.projectTypeList.selectedItems;
this.projectTypeListModal.hide();
this.checkForRefresh();
}

/* end PROJECT TYPE */

/* begin Activity */

public selectActivities() {

this.activityListModal.show();
this.activityList.selectedItems = this.selectedActivities;
this.activityList.refresh(null);
}

public removeFromActivitySelection(activity: Activity) {
const index: number = this.selectedActivities.indexOf(activity);
this.selectedActivities.splice(index, 1);
this.checkForRefresh();
}

public clearActivitySelection() {
this.selectedActivities = new Array<Activity>();
this.checkForRefresh();
}

public setSelectedActivities(value) {
// this.selectedActivities = this.activityList.selectedItems;
this.selectedActivities = value;
// this.activityListModal.hide();
this.checkForRefresh();
}

/*end Activity */

/*begin department*/
public selectDepartments() {
this.departmentListModal.show();
this.departmentList.selectedItems = this.selectedDepartments;
this.departmentList.refresh(null);
}


public removeFromDepartmentSelection(department: Department) {
const index: number = this.selectedDepartments.indexOf(department);
this.selectedDepartments.splice(index, 1);
this.checkForRefresh();
}

public clearDepartmentSelection() {
this.selectedDepartments = new Array<Department>();
this.checkForRefresh();
}

public setSelectedDepartments() {
this.selectedDepartments = this.departmentList.selectedItems;
this.departmentListModal.hide();
this.checkForRefresh();
}
/*end department*/

/*begin DIVISION */
public selectDivisions() {

let selectedDepartments: Array<Department> = null;
selectedDepartments = this.selectedDepartments;

const params = new Array<Param>();
params.push(new Param('departmentIds', AppUtils.getIdsList<Department, number>(selectedDepartments)));

this.divisionListModal.show();
this.divisionList.selectedItems = this.selectedDivisions;
this.divisionList.refresh(params);
}

public removeFromDivisionSelection(division: Division) {
const index: number = this.selectedDivisions.indexOf(division);
this.selectedDivisions.splice(index, 1);
this.checkForRefresh();
}

public clearDivisionSelection() {
this.selectedDivisions = new Array<Division>();
this.checkForRefresh();
}

public setSelectedDivisions() {
this.selectedDivisions = this.divisionList.selectedItems;
this.divisionListModal.hide();
this.checkForRefresh();
}

/* end DIVISION */

public onHasChangeUpdate(hasChange: string) {
  this.hasChange = hasChange;
  this.checkForRefresh();
}

public onIsFirstUpdate(isFirst: string) {
  this.isFirst = isFirst;
  this.checkForRefresh();
}

  doSimpleSearch($event: string) {
    this.filter = $event;
    this.checkForRefresh();
  }
}

enum AssetManageMainViewMode {
  AssetList = 1,
  AssetDetail = 2,
  OperationDetail = 3,
  AssetRecoList = 4,
}

enum AssetManageViewMode {
  AssetList = 1,
  AssetDetail = 2,
  OperationDetail = 3,
  AssetCategoryList = 4,
  PartnerList = 5,
  DepartmentList = 6,
  EmployeeList = 7,
  LocationList = 8,
  RoomList = 9,
  CostCenterList = 11,
}
