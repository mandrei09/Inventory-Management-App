import { ConfigValuesHttpService } from "./../../../services/http/common/config-values.service";
import { AssetInvDetail } from "./../../../model/api/assets/asset-inv-detail";
import { CostCenterHttpService } from "../../../services/http/administration/cost-center.http.service";
import { CostCenter } from "./../../../model/api/administration/cost-center";
import { AssetSimpleDetail } from "./../../../model/api/assets/asset-simple-detail";
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Param } from "../../../model/common/param";
import { AssetDepDetail } from "../../../model/api/assets/asset-dep-detail";
import { Partner } from "../../../model/api/documents/partner";
import { Employee } from "../../../model/api/administration/employee";
import { PartnerHttpService } from "../../../services/http/documents/partner.http.service";
import { EmployeeHttpService } from "../../../services/http/administration/employee.http.service";
import { saveAs as fileSaveAs } from "file-saver-es";
import { AdministrationDetailHttpService } from "../../../services/http/administration/administration-detail.http.service";
import { CompanyHttpService } from "../../../services/http/assets/company.http.service";
import { EmployeeListComponent } from "../employees/employee.list";
import { ModalDirective } from "ngx-bootstrap/modal";
import { CompanyListComponent } from "../../assets/companies/company.list";
import { PartnerListComponent } from "../../documents/partners/partner.list";
import { CostCenterListComponent } from "../cost-centers/cost-center.list";
import { AdministrationListComponent } from "../administrations/administration.list";
import { Administration } from "../../../model/api/administration/administration";
import { Company } from "../../../model/api/assets/company";
import { AppUtils } from "../../../common/app.utils";
import { BudgetFilter } from "../../../model/api/administration/budget.filter";
import { BudgetImport } from "../../../model/common/import/budget-import";
import { MessageService } from "primeng/api";
import { AngularTreeGridComponent } from "angular-tree-grid";
import { Project } from "../../../model/api/assets/project";
import { Country } from "../../../model/api/administration/country";
import { AdmCenter } from "../../../model/api/administration/adm-center";
import { Region } from "../../../model/api/administration/region";
import { Activity } from "../../../model/api/assets/activity";
import { AssetType } from "../../../model/api/assets/asset-type";
import { Department } from "../../../model/api/administration/department";
import { Division } from "../../../model/api/administration/division";
import { ProjectType } from "../../../model/api/assets/project-type";
import { AccMonth } from "../../../model/api/accounting/acc-month";
import { AccMonthListComponent } from "../../accounting/acc-month.list";
import { AccMonthHttpService } from "../../../services/http/accounting/acc-month.http.service";
import { BudgetBaseImport } from "../../../model/common/import/budget-base-import";
import { BudgetBaseListComponent } from "./budget-base.list";
import { BudgetBaseHttpService } from "../../../services/http/administration/budget-base.http.service";
import { BudgetManager } from "../../../model/api/assets/budget-manager";
import { BudgetManagerList } from "../budget-manager/budget-manager.list";
import { BudgetManagerHttpService } from "../../../services/http/administration/budget-manager.http.service";
import { ProjectList } from "../../assets/projects/project.list";
import { ProjectHttpService } from "../../../services/http/assets/project.http.service";
import { ActivityList } from "../../assets/activities/activity.list";
import { ActivityHttpService } from "../../../services/http/assets/activity.http.service";
import { DivisionListComponent } from "../divisions/division.list";
import { DepartmentListComponent } from "../departments/department.list";
import { DepartmentHttpService } from "../../../services/http/administration/department.http.service";
import { DivisionHttpService } from "../../../services/http/administration/division.http.service";
import { AssetTypeListComponent } from "../../assets/asset-types/asset-type.list";
import { AssetTypeHttpService } from "../../../services/http/assets/asset-type.http.service";
import { ProjectTypeListComponent } from "../../assets/project-types/project-type.list";
import { ProjectTypeHttpService } from "../../../services/http/assets/project-type.http.service";

import alasql from "alasql";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UpdateDataImportModalComponent } from "../../../common/update-data-import-modal/update-data-import-modal.component";
import { DialogService } from "../../../services/dialog.service";
import { ProgressService } from "../../../services/progress.service";
import { ProgressImportDialogComponent } from "../../../common/progress-import-dialog/progress-import-dialog.component";
import { DataProgress } from "../../../model/api/common/data-progress";
import { NotificationService } from "../../../services/notification.service";
var XLSX = require("xlsx");
alasql.setXLSX(XLSX);

@Component({
  selector: "app-budget-base-manage",
  templateUrl: "budget-base.manage.html",
  styleUrls: ["budget-base.manage.scss"],
  providers: [
    AdministrationDetailHttpService,
    EmployeeHttpService,
    PartnerHttpService,
    CostCenterHttpService,
    ConfigValuesHttpService,
    CompanyHttpService,
    AccMonthHttpService,
  ],
})
export class BudgetBaseManageComponent implements OnInit, AfterViewInit {

  public TRANSLOCO = 'page_budget_base_component'

  @ViewChild("budgetList") public budgetList: BudgetBaseListComponent;

  @ViewChild("employeeList") public employeeList: EmployeeListComponent;
  @ViewChild("employeeListModal") public employeeListModal: ModalDirective;

  @ViewChild("accMonthList") public accMonthList: AccMonthListComponent;
  @ViewChild("accMonthListModal") public accMonthListModal: ModalDirective;

  @ViewChild("companyList") public companyList: CompanyListComponent;
  @ViewChild("companyListModal") public companyListModal: ModalDirective;

  @ViewChild("partnerList") public partnerList: PartnerListComponent;
  @ViewChild("partnerListModal") public partnerListModal: ModalDirective;

  @ViewChild("costCenterList") public costCenterList: CostCenterListComponent;
  @ViewChild("costCenterListModal") public costCenterListModal: ModalDirective;

  @ViewChild("budgetManagerList") public budgetManagerList: BudgetManagerList;
  @ViewChild("budgetManagerListModal") public budgetManagerListModal: ModalDirective;

  @ViewChild("projectList") public projectList: ProjectList;
  @ViewChild("projectListModal") public projectListModal: ModalDirective;

  @ViewChild("activityList") public activityList: ActivityList;
  @ViewChild("activityListModal") public activityListModal: ModalDirective;

  @ViewChild("divisionList") public divisionList: DivisionListComponent;
  @ViewChild("divisionListModal") public divisionListModal: ModalDirective;

  @ViewChild("departmentList") public departmentList: DepartmentListComponent;
  @ViewChild("departmentListModal") public departmentListModal: ModalDirective;

  @ViewChild("assetTypeList") public assetTypeList: AssetTypeListComponent;
  @ViewChild("assetTypeListModal") public assetTypeListModal: ModalDirective;

  @ViewChild("projectTypeList")
  public projectTypeList: ProjectTypeListComponent;
  @ViewChild("projectTypeListModal")
  public projectTypeListModal: ModalDirective;

  @ViewChild("administrationList")
  public administrationList: AdministrationListComponent;
  @ViewChild("administrationListModal")
  public administrationListModal: ModalDirective;

  public fileEventBudget: any = null;
  public fileEventBudgetBase: any = null;
  exportCompleted = true;

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
  public selectedActivities: Array<Activity> = new Array<Activity>();
  public activityId = 0;
  public selectedProjectTypes: Array<ProjectType> = new Array<ProjectType>();
  public projectTypeId = 0;
  public accMonthId = 45;

  public selectedBudgetManagers: Array<BudgetManager> =
    new Array<BudgetManager>();

  @ViewChild("fileInputBudget") fileInputBudget: ElementRef;
  //@ViewChild('importDataBudgetModal') public importDataBudgetModal: ModalDirective;

  @ViewChild("angularGrid") angularGrid: AngularTreeGridComponent;

  public importBudgetLines: Array<BudgetImport> = new Array<BudgetImport>();
  public importBudgetBaseLines: Array<BudgetBaseImport> =
    new Array<BudgetBaseImport>();

  public noOfItems: number = 0;
  public importIndex: number = 0;

  public mainViewMode: number = AssetManageViewMode.AssetList;
  public viewMode: number = AssetManageViewMode.AssetList;

  public filter: string;
  isCollapsed: boolean = true;
  //pageSize = 10;
  public fileEvent: any = null;
  public showExportBtn = true;

  activeState: boolean[] = [true, false, false];

  public updateAssetDepDetailSelectionEvent: EventEmitter<
    Array<AssetDepDetail>
  > = new EventEmitter<Array<AssetDepDetail>>();
  public updateAssetInvDetailSelectionEvent: EventEmitter<
    Array<AssetInvDetail>
  > = new EventEmitter<Array<AssetInvDetail>>();

  public selectedPartners: Array<Partner> = new Array<Partner>();

  public selectedCostCenters: Array<CostCenter> = new Array<CostCenter>();
  public selectedEmployees: Array<Employee> = new Array<Employee>();
  public selectedAccMonths: Array<AccMonth> = new Array<AccMonth>();
  public selectedAdministrations: Array<Administration> =
    new Array<Administration>();

  public params: Array<Param> = null;

  data: any[] = [];

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public administrationDetailHttpService: AdministrationDetailHttpService,
    public budgetBaseHttpService: BudgetBaseHttpService,
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
    public projectTypeHttpService: ProjectTypeHttpService,
    public configValuesHttpService: ConfigValuesHttpService,
    private messageService: MessageService,
    public dialog: MatDialog,
    public dialogService: DialogService,
    public progressService: ProgressService,
    public notificationService : NotificationService,
    public importProgressDialogRef: MatDialogRef<ProgressImportDialogComponent>
  ) {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (evt.urlAfterRedirects === "/budget") {
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
  public budgetRowSelection: string = "multiple";
  public selectedBudgets: Array<AssetSimpleDetail> =
    new Array<AssetSimpleDetail>();
  public selectedBudgetDetails: Array<AssetInvDetail> =
    new Array<AssetInvDetail>();

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.clearFilters();
    }, 1000);
  }

  public doSimpleSearch(filter: string) {
    this.filter = filter;
    this.checkForRefresh();
  }

  public clearFilters() {
    this.selectedCostCenters = new Array<CostCenter>();
    this.selectedEmployees = new Array<Employee>();
    this.selectedCompanies = new Array<Company>();
    this.selectedDepartments = new Array<Department>();
    this.selectedDivisions = new Array<Division>();
    this.selectedAdministrations = new Array<Administration>();
    this.selectedPartners = new Array<Partner>();
    this.selectedAccMonths = new Array<AccMonth>();
    this.selectedBudgetManagers = new Array<BudgetManager>();
    this.selectedProjects = new Array<Project>();
    this.selectedActivities = new Array<Activity>();
    this.selectedAssetTypes = new Array<AssetType>();
    this.selectedProjectTypes = new Array<ProjectType>();
    this.filter = "";
    this.companyId = 0;
    this.departmentId = 0;
    this.divisionId = 0;
    this.admCenterId = 0;
    this.regionId = 0;
    this.assetTypeId = 0;
    this.projectId = 0;
    this.accMonthId = 45;

    this.selectedBudgetDetails = new Array<AssetInvDetail>();
    this.selectedBudgets = new Array<AssetSimpleDetail>();
    this.checkForRefresh();
  }

  public onBudgetSelectionChanged(assets: Array<any>) {
    this.selectedBudgetDetails = assets;
    this.selectedBudgets = new Array<any>();
    assets.forEach((asset: any) => {
      this.selectedBudgets.push(asset);
    });
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

  public setSelectedProjects() {
    this.selectedProjects = this.projectList.selectedItems;
    this.projectListModal.hide();
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

  public setSelectedActivities() {
    this.selectedActivities = this.activityList.selectedItems;
    this.activityListModal.hide();
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
    params.push(
      new Param(
        "departmentIds",
        AppUtils.getIdsList<Department, number>(selectedDepartments)
      )
    );

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

  /* begin employee */

  public selectEmployees() {
    let selectedCostCenters: Array<CostCenter> = null;
    selectedCostCenters = this.selectedCostCenters;
    const params = new Array<Param>();
    params.push(
      new Param(
        "costCenterIds",
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
    this.accMonthId =
      this.selectedAccMonths.length === 1 ? this.selectedAccMonths[0].id : 45;
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
    this.refreshAssets();
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

    if (this.selectedBudgetManagers != null) {
      budgetFilter.budgetManagerIds = new Array<number>();
      this.selectedBudgetManagers.forEach((budgetManager) => {
        budgetFilter.budgetManagerIds.push(budgetManager.id);
      });
    }

    if (this.selectedProjects != null) {
      budgetFilter.projectIds = new Array<number>();
      this.selectedProjects.forEach((project) => {
        budgetFilter.projectIds.push(project.id);
      });
    }

    if (this.selectedActivities != null) {
      budgetFilter.activityIds = new Array<number>();
      this.selectedActivities.forEach((activity) => {
        budgetFilter.activityIds.push(activity.id);
      });
    }

    if (this.selectedDepartments != null) {
      budgetFilter.departmentIds = new Array<number>();
      this.selectedDepartments.forEach((department) => {
        budgetFilter.departmentIds.push(department.id);
      });
    }

    if (this.selectedDivisions != null) {
      budgetFilter.divisionIds = new Array<number>();
      this.selectedDivisions.forEach((division) => {
        budgetFilter.divisionIds.push(division.id);
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
      this.selectedProjectTypes.forEach((projectType) => {
        budgetFilter.projectTypeIds.push(projectType.id);
      });
    }

    budgetFilter.filter = this.filter;
    budgetFilter.accMonthId = this.accMonthId;
    //params.push(new Param('pageSize', this.pageSize.toString()));
    params.push(new Param("jsonFilter", JSON.stringify(budgetFilter)));
    return params;
  }

  public export() {
    this.showExportBtn = false;
    let params: Array<Param> = null;

    params = this.getFilters();
    this.notificationService.showTransSucces(null,'showExportNotification')
    this.budgetBaseHttpService.export(params).subscribe((blob) => {
      fileSaveAs(blob.body, "Export_Budget_Detail.xlsx");
      this.showExportBtn = true;
    });
  }

  public loadFile(ev) {
    this.fileEvent = ev;
  }

  public uploadBudgetFile() {
    let dialogRef = this.dialog.open(UpdateDataImportModalComponent, {
      panelClass: "centered-middle-modal",
      height: "90%",
      maxHeight: "90%",
      disableClose: true,
      width: "700px",
      position: { bottom: "15%", top: "auto" },
      data: { itemId: 1 },
    });

    dialogRef.afterClosed().subscribe((results: any) => {
      this.loadFileBudget(results);
    });
  }

  public loadFileBudget(ev) {
    this.fileEventBudget = ev.files;

    // @ts-ignore
    alasql.fn.datetime = function sheetDateToJSDate(n) {
      const d = new Date(1899, 11, 30);
      d.setDate(d.getDate() + n);
      // Rounds milliseconds to seconds
      d.setSeconds(d.getSeconds() + Math.round(d.getMilliseconds() / 1000));
      d.setMilliseconds(0);
      return d;
    };

    alasql
      .promise(
        `select
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
              [N] as [ProjectTypeCode],
              [O] as [Info],
              [P] as [AssetTypeName],
              [Q] as [AssetTypeCode],
              [R] as [AppState],
              datetime([S]) as [StartMonth],
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
              CAST([AH] as NUMBER) as [ValueMonth12]
              from FILE(?, {headers: true})`,
        [this.fileEventBudget]
      )
      .then((importLines: Array<BudgetBaseImport>) => {
        const newArray = importLines.filter(
          (value) => value.Employee !== undefined
        );

        this.importIndex = 1;
        this.importBudgetBaseLines = newArray;
        this.noOfItems = newArray.length;

        this.dialogService
          .progressImportDialog({
            title: "Progress import",
            importIndex: this.importIndex,
            importBudgetBaseLines: this.importBudgetBaseLines,
            noOfItems: this.noOfItems,
          })
          .subscribe((confirmed: any) => {});

        this.doImportBudget();
      });
  }

  public doImportBudget() {
    if (this.importIndex < this.importBudgetBaseLines.length) {
      this.budgetBaseHttpService
        .import(this.importBudgetBaseLines[this.importIndex])
        .subscribe((data: any) => {
          this.importIndex = this.importIndex + 1;

          const item = new DataProgress();
          item.currentIndex = this.importIndex;
          item.noOfItems = this.importBudgetBaseLines.length;

          this.progressService.emitModelChange(item);

          this.doImportBudget();
        });
    } 
    else 
    {
      this.fileEventBudget = null;
      this.importIndex = 1;
      this.importBudgetBaseLines = new Array<BudgetBaseImport>();
      this.checkForRefresh();
    }
  }

  handleChange(e) {
    const index = e.index;
    console.log(JSON.stringify(e));
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
