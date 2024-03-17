import {AfterViewInit, Component, Inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {EmployeeListComponent} from '../../../administrations/employees/employee.list';
import {PartnerListComponent} from '../../../documents/partners/partner.list';
import {DepartmentListComponent} from '../../../administrations/departments/department.list';
import {AdministrationListComponent} from '../../../administrations/administrations/administration.list';
import {AccountList} from '../../../administrations/account/account.list';
import {DivisionListComponent} from '../../../administrations/divisions/division.list';
import {TypeList} from '../../../administrations/types/type.list';
import {MaterialList} from '../../../administrations/materials/material.list';
import {SubTypeList} from '../../../administrations/sub-types/sub-type.list';
import {EntityFileListComponent} from '../../../common/entity-file.list';
import {RequestBudgetForecastListComponent} from '../../../administrations/request-budget-forecasts/request-budget-forecast.list';
import {EntityFile} from '../../../../model/api/common/entity-file';
import {AppConfig} from '../../../../config';
import {CodeNameEntity} from '../../../../model/api/common/code-name-entity';
import {InterCompany} from '../../../../model/api/assets/inter-company';
import {Project} from '../../../../model/api/assets/project';
import {Uom} from '../../../../model/api/assets/uom';
import {Employee} from '../../../../model/api/administration/employee';
import {CodePartnerEntity} from '../../../../model/api/common/code-partner-entity';
import {AppData} from '../../../../app-data';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProjectHttpService} from '../../../../services/http/assets/project.http.service';
import {InterCompanyHttpService} from '../../../../services/http/assets/inter-company.http.service';
import {Administration} from '../../../../model/api/administration/administration';
import {Company} from '../../../../model/api/assets/company';
import {AccountHttpService} from '../../../../services/http/administration/account.http.service';
import {DivisionHttpService} from '../../../../services/http/administration/division.http.service';
import {TypeHttpService} from '../../../../services/http/administration/type.http.service';
import {MaterialHttpService} from '../../../../services/http/administration/material.http.service';
import {SubTypeHttpService} from '../../../../services/http/administration/sub-type.http.service';
import {AssetTypeHttpService} from '../../../../services/http/assets/asset-type.http.service';
import {EmployeeHttpService} from '../../../../services/http/administration/employee.http.service';
import {UomHttpService} from '../../../../services/http/assets/uom.http.service';
import {PartnerHttpService} from '../../../../services/http/documents/partner.http.service';
import {DepartmentHttpService} from '../../../../services/http/administration/department.http.service';
import {CompanyHttpService} from '../../../../services/http/assets/company.http.service';
import {AdministrationHttpService} from '../../../../services/http/administration/administration.http.service';
import {RequestBudgetForecastHttpService} from '../../../../services/http/requests/request-budget-forecast.http.service';
import {NotificationService} from '../../../../services/notification.service';
import {EntityFileHttpService} from '../../../../services/http/common/entity-file.http.service';
import {InvState} from '../../../../model/api/inventory/inv-state';
import {RequestFilter} from '../../../../model/api/requests/request.filter';
import {AppUtils} from '../../../../common/app.utils';
import {Param} from '../../../../model/common/param';
import {AssetType} from '../../../../model/api/assets/asset-type';
import {Department} from '../../../../model/api/administration/department';
import {Partner} from '../../../../model/api/documents/partner';
import {SubType} from '../../../../model/api/administration/sub-type';
import {Account} from '../../../../model/api/administration/account';
import {Division} from '../../../../model/api/administration/division';
import {Type} from '../../../../model/api/administration/type';
import {MasterType} from '../../../../model/api/assets/master-type';
import {BudgetBaseHttpService} from '../../../../services/http/administration/budget-base.http.service';
import {MasterTypeHttpService} from '../../../../services/http/assets/master-type.http.service';
import {AccMonthHttpService} from '../../../../services/http/accounting/acc-month.http.service';
import {RequestHttpService} from '../../../../services/http/administration/request.http.service';
import {MasterTypeListComponent} from '../../../assets/master-types/master-type.list';
import {AccMonthListComponent} from '../../../accounting/acc-month.list';
import {AccMonth} from '../../../../model/api/accounting/acc-month';
import {RequestResult} from '../../../../model/api/result/request-result';
import {InterCompanyListComponent} from '../../../assets/inter-companies/inter-company.list';
import {CompanyListComponent} from '../../../assets/companies/company.list';
import {AssetTypeListComponent} from '../../../assets/asset-types/asset-type.list';
import {ProjectList} from '../../../assets/projects/project.list';
import {BudgetForecast, BudgetForecastView} from '../../../../model/api/budget/budget-forecast';
import {UomListComponent} from '../../../assets/uoms/uom.list';
import {ProjectTypeDivisionListComponent} from '../../project-type-division/project-type-division.list';
import {BudgetForecastUIListComponent} from '../../budget-forecast/budget-forecast.ui.list';
import {RequestOpDetailList} from '../../request-ops/request-op.detail.list';
import {ProjectTypeDivision} from '../../../../model/api/administration/project-type-division';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {RequestBudgetForecastSave, RequestSave} from '../../../../model/api/administration/request-save';
import {ProjectTypeDivisionHttpService} from '../../../../services/http/administration/project-type-division.http.service';
import {BudgetForecastHttpService} from '../../../../services/http/administration/budget-forecast.http.service';
import {RequestOpHttpService} from '../../../../services/http/administration/request-op.http.service';
import {EmailManagerHttpService} from '../../../../services/http/administration/email-manager.http.service';
import {RateHttpService} from '../../../../services/http/administration/rate.http.service';
import {BudgetFilter} from '../../../../model/api/administration/budget.filter';
import {Observable, Subject} from 'rxjs';
import {NeedBudget} from '../../../../model/api/administration/need-budget';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {BudgetForecastTransferDialogComponent} from '../../budget-forecast/budget-forecast-transfer-dialog/budget-forecast-transfer-dialog.component';

@Component({
  selector: 'app-pr-add-dialog',
  templateUrl: './pr-add-dialog.component.html',
  styleUrls: ['./pr-add-dialog.component.scss']
})
export class PrAddDialogComponent implements OnInit, AfterViewInit {

  public _employee: Employee = null;
  public get employee(): Employee { return this._employee; }
  public set employee(value: Employee) {
    this._employee = value;
  }

  public _employeeOwner: Employee = null;
  public get employeeOwner(): Employee { return this._employeeOwner; }
  public set employeeOwner(value: Employee) {
    this._employeeOwner = value;

    this.setSelectedEmployeeOwner(value);
  }

  public _department: Department = null;
  public get department(): Department { return this._department; }
  public set department(value: Department) {
    this._department = value;

    this.setSelectedDepartment(value);
  }

  public _division: Division = null;
  public get division(): Division { return this._division; }
  public set division(value: Division) {
    this._division = value;

    this.setSelectedDivision(value);
  }

  public _project: CodeNameEntity = null;
  public get project(): CodeNameEntity { return this._project; }
  public set project(value: CodeNameEntity) {
    this._project = value;

    this.setSelectedProject(value);
  }

  public _projectTypeDivision: ProjectTypeDivision = null;
  public get projectTypeDivision(): ProjectTypeDivision { return this._projectTypeDivision; }
  public set projectTypeDivision(value: ProjectTypeDivision) {
    this._projectTypeDivision = value;

    this.setSelectedProjectTypeDivision(value);
  }

  public _assetType: AssetType = null;
  public get assetType(): AssetType { return this._assetType; }
  public set assetType(value: AssetType) {
    this._assetType = value;

    this.setSelectedAssetType(value);
  }

  public get divisionParams(): Array<Param> {
    let params: Array<Param> = [];
    // console.log(this._department);
    params.push(new Param('departmentIds', this._department != null ? this._department?.id!.toString() : null));

    return params;
  }

  public get projectTypeDivisionParams(): Array<Param> {
    let params: Array<Param> = [];
    // console.log(this._department);
    params.push(new Param('divIds', this._division != null ? this._division?.id!.toString() : null));

    return params;
  }

  @ViewChild('masterTypeList') public masterTypeList: MasterTypeListComponent;
  @ViewChild('masterTypeListModal') public masterTypeListModal: ModalDirective;

  @ViewChild('typeList') public typeList: TypeList;
  @ViewChild('typeListModal') public typeListModal: ModalDirective;

  @ViewChild('subTypeList') public subTypeList: SubTypeList;
  @ViewChild('subTypeListModal') public subTypeListModal: ModalDirective;

  @ViewChild('employeeList') public employeeList: EmployeeListComponent;
  @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

  @ViewChild('employeeOwnerList') public employeeOwnerList: EmployeeListComponent;
  @ViewChild('employeeOwnerListModal') public employeeOwnerListModal: ModalDirective;

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

  @ViewChild('budgetForecastList') public budgetForecastList: BudgetForecastUIListComponent;
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

  @ViewChild('departmentListModal') public departmentListModal: ModalDirective;
  @ViewChild('departmentList') public departmentList: DepartmentListComponent;

  @ViewChild('divisionListModal') public divisionListModal: ModalDirective;
  @ViewChild('divisionList') public divisionList: DivisionListComponent;

  public projectTypeDivisions = new Array<ProjectTypeDivision>();
  public selectedprojectTypeDivisions: Array<ProjectTypeDivision> = new Array<ProjectTypeDivision>();
  isProjectTypeDivisionLoading: boolean = false;

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


  public id: number = 0;
  public request: RequestSave = new RequestSave();
  public filesToUpload: Array<File>;
  public selectedAssetOp: any;
  public isSaved: boolean = true;
  
  public monthStartDate: Date | null = null;
  public monthEndDate: Date | null = null;
  minDate: Date;
  maxDate: Date;
  rangeDates: Date[];

  public startPeriodDate: Date | null = null;
  public endPeriodDate: Date | null = null;

  public get allowSaving(): boolean {
    return this.request != null &&
      this.request.info != null && this.request.info.trim().length > 3 &&
      this.employee != null &&
      this.projectTypeDivision != null &&
      this.assetType != null &&
      this.selectedBudgetForecasts.length > 0;
  }

  // public costCenter: CostCenter = null;
  // public assetType: AssetType = null;
  // public employee: Employee = null;
  // public employeeOwner: Employee = null;
  // public department: Department = null;
  // public division: Division = null;
  public accMonth: AccMonth = null;
  public company: CodeNameEntity = null;
  // public budgetBase: BudgetBase = null;
  public budgetForecast: BudgetForecast = null;
  public account: CodeNameEntity = null;
  public partner: CodePartnerEntity = null;
  public uom: CodeNameEntity = null;
  public masterType: CodeNameEntity = null;
  // public project: CodeNameEntity = null;
  public interCompany: CodeNameEntity = null;
  public type: CodeNameEntity = null;
  public subType: CodeNameEntity = null;
  public administration: CodeNameEntity = null;
  // public projectTypeDivision: ProjectTypeDivision = null;
  public startAccMonth: AccMonth = null;

  public readOnlyForm: boolean = false;
  public get isAdmin(): boolean { return AppData.UserIsAdmin; }

  availableBudgetForecasts: BudgetForecastView[] = null;
  selectedBudgetForecasts: BudgetForecastView[] = [];
  selectedBudgetForecastIds: Array<number> = new Array<number>();

  totalBudgetValue = 0;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    public requestHttpService: RequestHttpService,
    public masterTypeHttpService: MasterTypeHttpService,
    public accountHttpService: AccountHttpService,
    public typeHttpService: TypeHttpService,
    public subTypeHttpService: SubTypeHttpService,
    public accMonthHttpService: AccMonthHttpService,
    public employeeHttpService: EmployeeHttpService,
    // public costCenterHttpService: CostCenterHttpService,
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
    public requestBudgetForecastHttpService: RequestBudgetForecastHttpService,
    public departmentHttpService: DepartmentHttpService,
    public divisionHttpService: DivisionHttpService,
    private fb: FormBuilder,
    public entityFileHttpService: EntityFileHttpService,
    public dialogRef: MatDialogRef<PrAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });

    if(data && data.item) {
      this.id = +data.item?.id;
    }

    // this.route.params.subscribe((params: Params) => {
    //   if (params['id']) {
    //     this.id = +params['id'];
    //   }
    // });
  }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // if ((this.assetFullDetail !== null) && (this.assetFullDetail.id === 0)) this.refreshDocumentTypes();
    if (this.id > 0) {
      this.requestHttpService.getDetailById(this.id)
        .subscribe((asset: any) => {
          // this.asset = asset;
          this.updateDetails(asset);

          // if (asset.validated) {
          //     this.refreshAssetOperations();
          //     this.refreshEntityFiles();
          // } else {
          //    // this.refreshAssetTypes();
          //    // this.refreshDocumentTypes();
          // }
        });
    }
  }

  public onBudgetForecastTransfer(id: any) {
    let dialogRef = this.dialog.open(BudgetForecastTransferDialogComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { itemId: id }
    });

    dialogRef.afterClosed().subscribe((item: any) => {
      // if (item !== null) this.chec();
    });
  }

  public get employeeOwnerParams(): Array<Param> {
    let params: Array<Param> = [];
    params.push(new Param('isBudgetOwner', 'true'));

    return params;
  }

  // public refreshEntityFiles() {
  //     const params: Array<Param> = new Array<Param>();

  //     params.push(new Param('entityTypeCode', 'ASSET'));
  //     params.push(new Param('entityId', this.request.id.toString()));

  //     this.entityFileList.refresh(params);
  // }

  // public refreshAssetOperations() {
  //     const params: Array<Param> = new Array<Param>();

  //     params.push(new Param('assetId', this.id.toString()));
  //     this.requestOpList.refresh(params);
  // }

  public updateDetails(request: any) {
    this.request.id = request.id;
    // this.request.costCenterId = request.costCenterId;
    // this.request.budgetId = request.budgetId;
    // this.request.budgetBaseId = request.budgetBaseId;
    this.request.info = request.info;
    this.request.validated = request.validated;
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


  /*begin BUDGET FORECAST */
  public selectBudgetForecast() {

    const params = new Array<Param>();
    const budgetFilter: BudgetFilter = new BudgetFilter();

    // if (this.costCenter != null && this.costCenter.admCenter != null) {
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

    if (this.employeeOwner != null) {
      budgetFilter.employeeIds = new Array<number>();
      budgetFilter.employeeIds.push(this.employeeOwner.id);
    }

    if (this.department != null) {
      budgetFilter.departmentIds = new Array<number>();
      budgetFilter.departmentIds.push(this.department.id);
    }

    if (this.division != null) {
      budgetFilter.divisionIds = new Array<number>();
      budgetFilter.divisionIds.push(this.division.id);
    }

    params.push(new Param('pageSize', '5'));
    params.push(new Param('jsonFilter', JSON.stringify(budgetFilter)));

    this.budgetForecastList.refresh(params);
    this.budgetForecastListModal.show();
  }
  public setSelectedBudgetForecast() {

    const items: Array<BudgetForecast> = this.budgetForecastList.selectedItems;
    // console.log(JSON.stringify(items));
    this.budgetForecast = ((items != null) && (items.length === 1)) ? items[0] : null;

    this.budgetForecastListModal.hide();

    //         // RequestBudgetForecast //

    //         let aIds: number[] = new Array<number>();
    //         let reqBgtsIds: RequestBudgetForecastAdd = new RequestBudgetForecastAdd();
    //         items.forEach(item => {
    //             let index: number = aIds.indexOf(item.id);
    //             if (index < 0) aIds.push(item.id);
    //         });

    //         reqBgtsIds.budgetForecastIds = aIds;
    //         reqBgtsIds.requestId = this.employeeId;

    //         this.employeeDivisionHttpService.addDivisionByEmployee(reqBgtsIds).subscribe( (res) => {
    //                 if (res.statusCode === 200) {
    //                     this.notificationService.showSuccess('Datele au fost salvate cu success!', 'Adauga mapare Departament');
    //                     this.divisionList.refresh(null);
    //                     this.employeeDivisionList.refresh(null);
    //                     this.divisionList.selectedItems = new Array<Division>();
    //                 } else if (res.statusCode === 404) {
    //                     this.notificationService.showError('Nu exista', 'Adauga mapare Departament');
    //                     this.divisionList.selectedItems = new Array<Division>();
    //                 }
    //         }, (error) => {
    //             this.notificationService.showError('Eroare salvare!', 'Adauga mapare Departament');
    //             this.divisionList.selectedItems = new Array<Division>();
    //         });

    // // RequestBudgetForecast //
  }

  /*end BUDGET FORECAST */


  /*begin PROJECT */
  public selectProject() {

    this.projectList.refresh(null);
    this.projectListModal.show();
  }
  public setSelectedProject(value) {
    // const items: Array<Project> = this.projectList.selectedItems;
    // this.project = value;
    // this.projectListModal.hide();
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

  /*begin employee- owner*/
  public selectEmployeeOwner() {

    const params = new Array<Param>();
    params.push(new Param('isBudgetOwner', 'true'));

    this.employeeOwnerList.refresh(params);
    this.employeeOwnerListModal.show();
  }

  public setSelectedEmployeeOwner(value) {
    this.selectedBudgetForecasts = new Array<BudgetForecastView>();
    // const items: Array<Employee> = this.employeeOwnerList.selectedItems;
    // this.employeeOwner = value;
    // this.employeeOwnerListModal.hide();

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

    if (this.employeeOwner != null) {
      budgetFilter.employeeIds = new Array<number>();
      budgetFilter.employeeIds.push(this.employeeOwner.id);
    }


    if (this.department != null) {
      budgetFilter.departmentIds = new Array<number>();
      budgetFilter.departmentIds.push(this.department.id);
    }

    if (this.division != null) {
      budgetFilter.divisionIds = new Array<number>();
      budgetFilter.divisionIds.push(this.division.id);
    }

    params.push(new Param('pageSize', '500'));
    params.push(new Param('jsonFilter', JSON.stringify(budgetFilter)));

    this.budgetForecastHttpService.get(1, 500, 'id', 'asc', params, null, 'detailui').subscribe( (res: any) => {
      this.availableBudgetForecasts = [];
      // console.log(JSON.stringify(res));
      res.items.forEach(element => {
        element.needBudget = false;
        element.needBudgetValue = 0;
        this.availableBudgetForecasts.push(element);
      });
    });
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
  public setSelectedAssetType(value) {
    this.selectedBudgetForecasts = new Array<BudgetForecastView>();
    // const items: Array<AssetType> = this.assetTypeList.selectedItems;
    // this.assetType = value;
    // this.assetTypeListModal.hide();

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

    if (this.employeeOwner != null) {
      budgetFilter.employeeIds = new Array<number>();
      budgetFilter.employeeIds.push(this.employeeOwner.id);
    }

    if (this.department != null) {
      budgetFilter.departmentIds = new Array<number>();
      budgetFilter.departmentIds.push(this.department.id);
    }

    if (this.division != null) {
      budgetFilter.divisionIds = new Array<number>();
      budgetFilter.divisionIds.push(this.division.id);
    }

    params.push(new Param('pageSize', '500'));
    params.push(new Param('jsonFilter', JSON.stringify(budgetFilter)));

    this.budgetForecastHttpService.get(1, 500, 'id', 'asc', params, null, 'detailui').subscribe( (res: any) => {
      this.availableBudgetForecasts = [];
      // console.log(JSON.stringify(res));
      res.items.forEach(element => {
        element.needBudget = false;
        element.needBudgetValue = 0;
        this.availableBudgetForecasts.push(element);
      });
    });
  }
  /*end  assetType  */


  /* begin costcenter */
  public selectProjectTypeDivision() {
    const params = new Array<Param>();
    params.push(new Param('divIds', this.division != null ? this.division.id.toString() : null));

    this.projectTypeDivisionList.refresh(params);
    this.projectTypeDivisionListModal.show();
  }
  public setSelectedProjectTypeDivision(value) {
    this.selectedBudgetForecasts = new Array<BudgetForecastView>();
    // const items: Array<ProjectTypeDivision> = this.projectTypeDivisionList.selectedItems;
    // this.projectTypeDivision = value;
    // this.projectTypeDivisionListModal.hide();

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

    if (this.employeeOwner != null) {
      budgetFilter.employeeIds = new Array<number>();
      budgetFilter.employeeIds.push(this.employeeOwner.id);
    }

    if (this.department != null) {
      budgetFilter.departmentIds = new Array<number>();
      budgetFilter.departmentIds.push(this.department.id);
    }

    if (this.division != null) {
      budgetFilter.divisionIds = new Array<number>();
      budgetFilter.divisionIds.push(this.division.id);
    }

    params.push(new Param('pageSize', '500'));
    params.push(new Param('jsonFilter', JSON.stringify(budgetFilter)));

    this.budgetForecastHttpService.get(1, 500, 'id', 'asc', params, null, 'detailui').subscribe( (res: any) => {
      this.availableBudgetForecasts = [];
      // console.log(JSON.stringify(res));
      res.items.forEach(element => {
        element.needBudget = false;
        element.needBudgetValue = 0;
        this.availableBudgetForecasts.push(element);
      });
    });
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
    this.router.navigate(['/procurement/request']);
  }

  public onDeleteAsset() {
    this.operationType = OperationType.Delete;
    this.confirmationMessage = 'Stergeti inregistrarea curenta?';
    this.confirmationModal.show();
  }

  public deleteAsset() {
    this.requestHttpService.delete(this.request.id)
      .subscribe(() => this.router.navigate(['/assetdepdetails']));
  }

  public onValidateAsset() {
    this.operationType = OperationType.AssetValidation;
    this.confirmationMessage = 'Validati inregistrarea curenta?';
    this.confirmationModal.show();
  }

  public validateBudget() {
    this.request.validated = true;
    this.saveOrder();
  }

  public addNewOperation() {
    // let assets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
    // assets.push(new AssetSimpleDetail(this.asset.id, this.asset.invNo, this.asset.assetName,
    //     '', this.asset.partner, this.asset.assetType, this.asset.accState, this.asset.usageStartDate, '', ''));
    // AppData.AssetList = assets;
    // this.router.navigate(['/newoperation']);
  }


  public saveOrder() {
    this.isSaved = false;
    // this.request.budgetBaseId = this.budgetBase != null ? this.budgetBase.id : null;
    // this.request.budgetForecastId = this.budgetForecast != null ? this.budgetForecast.id : null;
    // this.request.costCenterId = this.costCenter != null ? this.costCenter.id : null;
    this.request.projectTypeId = this.projectTypeDivision != null ? this.projectTypeDivision.projectType.id : null;
    this.request.divisionId = this.projectTypeDivision != null ? this.projectTypeDivision.division.id : null;
    this.request.assetTypeId = this.assetType != null ? this.assetType.id : null;
    this.request.ownerId = this.employeeOwner != null ? this.employeeOwner.id : null;
    this.request.startAccMonthId = this.startAccMonth != null ? this.startAccMonth.id : null;
    // this.request.rangeDates = this.rangeDates;
    this.request.startPeriodDate = this.startPeriodDate;
    this.request.endPeriodDate = this.endPeriodDate;

    this.request.budgetForecastIds = new Array<RequestBudgetForecastSave>();
    this.selectedBudgetForecasts.forEach( item => {
      let data = new RequestBudgetForecastSave();
      data.id = item.id;
      data.needBudgetValue = item.needBudgetValue;
      this.request.budgetForecastIds.push(data);
    });

    this.request.validated = true;

    this.requestHttpService.addNewRequest(this.request)
      .subscribe((result: RequestResult) => {
        if (result.success) {
          this.notificationService.showInfo(result.message, 'P.R. nou', 2000, false, 0);
          this.dialogRef.close(result);
          // this.router.navigate(['/procurement/request']);
        } else if (!result.success) {
          this.notificationService.showError('Motiv: ' + result.message + '!', 'Eroare salvare date', 0, false, 0);
          this.isSaved = true;
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
      case OperationType.DeleteOfferMaterial:
        this.onDeleteOfferMaterial();
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

    params.push(new Param('jsonFilter', JSON.stringify(requestFilter)));

    return params;
  }

  public get allowNeedBudget(): boolean {
    return this.projectTypeDivision != null && this.assetType != null && (this.request != null && this.request.budgetValueNeed > 100);
  }

  needBudget() {
    this.isSaved = false;
    if (confirm('ATENTIE! NU UITA SA INCARCI DOVADA DOCUMENTULUI PENTRU BUGETUL NOU?')) {
      const needBgt = new NeedBudget();
      needBgt.projectTypeDivisionId = this.projectTypeDivision != null ? this.projectTypeDivision.id : null;
      // needBgt.costCenterId = this.costCenter != null ? this.costCenter.id : null;
      needBgt.assetTypeId = this.assetType != null ? this.assetType.id : null;
      needBgt.employeeId = this.employee != null ? this.employee.id : null;
      needBgt.ownerId = this.employeeOwner != null ? this.employeeOwner.id : null;
      needBgt.startAccMonthId = this.startAccMonth != null ? this.startAccMonth.id : null;
      needBgt.info = this.request.info;
      needBgt.budgetValueNeed = this.request.budgetValueNeed;
      needBgt.endDate = this.request.endDate;

      this.requestHttpService.needBudget(needBgt)
        .subscribe((result: RequestResult) => {
          if (result.success) {
            this.notificationService.showSuccess(result.message, 'Purchase Request(PR) -solicitare buget', 5000, false, 0);
            this.dialogRef.close(result);
            //this.router.navigate(['/procurement/request']);
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
    // console.log(event);
    // if(this.projectTypeDivision != null){
    //   event.items.needBudget = true;
    // }
    // console.log(event);
    event.items.isLeftSide = false;
    event.items.needBudget = true;
    // else {
    //   const objIndex = this.selectedBudgetForecasts.findIndex(obj => obj.id === event.id);
    //   if (objIndex > -1) {
    //     this.selectedBudgetForecasts.splice(objIndex, 1);
    //   }
    // }

    // this.selectedBudgetForecasts.forEach(element => {
    //         // element.isLeftSide = false;
    // });
  }

  public moveToSource(event: any) {
    // this.notificationService.showInfo('', 'Move');
    // console.log(JSON.stringify(event));
    // this.showTemplate(1);
    // console.log(event);
    // if(this.projectTypeDivision != null){
    //   event.items.needBudget = false;
    // }
    event.items.isLeftSide = true;
    event.items.needBudget = false;
  }

  public resetDateRange() {
    this.monthStartDate = null;
    this.monthEndDate = null;

    this.startPeriodDate = null;
    this.endPeriodDate = null;
  }

  public reset() {
    // this.filter = "";
    this.resetDateRange();
  }

  public notifyDateChange() {
  }


  /*begin DEPARTMENT */

  public selectDepartment() {

    this.departmentList.refresh(null);
    this.departmentListModal.show();
  }
  public setSelectedDepartment(value) {
    this.selectedBudgetForecasts = new Array<BudgetForecastView>();
    // const items: Array<Department> = this.departmentList.selectedItems;
    // this.department = value;
    // this.departmentListModal.hide();

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

    if (this.employeeOwner != null) {
      budgetFilter.employeeIds = new Array<number>();
      budgetFilter.employeeIds.push(this.employeeOwner.id);
    }

    if (this.department != null) {
      budgetFilter.departmentIds = new Array<number>();
      budgetFilter.departmentIds.push(this.department.id);
    }

    if (this.division != null) {
      budgetFilter.divisionIds = new Array<number>();
      budgetFilter.divisionIds.push(this.division.id);
    }

    params.push(new Param('pageSize', '500'));
    params.push(new Param('jsonFilter', JSON.stringify(budgetFilter)));

    this.budgetForecastHttpService.get(1, 500, 'id', 'asc', params, null, 'detailui').subscribe( (res: any) => {
      this.availableBudgetForecasts = [];
      // console.log(JSON.stringify(res));
      res.items.forEach(element => {
        element.needBudget = false;
        element.needBudgetValue = 0;
        this.availableBudgetForecasts.push(element);
      });
    });
  }

  /*end DEPARTMENT */


  /*begin DIVISION */

  public selectDivision() {
    this.selectedBudgetForecasts = new Array<BudgetForecastView>();
    const params = new Array<Param>();
    params.push(new Param('departmentIds', this.department != null ? this.department.id.toString() : null));

    this.divisionList.refresh(params);
    this.divisionListModal.show();
  }
  public setSelectedDivision(value) {
    // const items: Array<Division> = this.divisionList.selectedItems;
    // this.division = value;
    // this.divisionListModal.hide();

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

    if (this.employeeOwner != null) {
      budgetFilter.employeeIds = new Array<number>();
      budgetFilter.employeeIds.push(this.employeeOwner.id);
    }

    if (this.department != null) {
      budgetFilter.departmentIds = new Array<number>();
      budgetFilter.departmentIds.push(this.department.id);
    }

    if (this.division != null) {
      budgetFilter.divisionIds = new Array<number>();
      budgetFilter.divisionIds.push(this.division.id);
    }

    params.push(new Param('pageSize', '500'));
    params.push(new Param('jsonFilter', JSON.stringify(budgetFilter)));

    this.budgetForecastHttpService.get(1, 500, 'id', 'asc', params, null, 'detailui').subscribe( (res: any) => {
      this.availableBudgetForecasts = [];
      // console.log(JSON.stringify(res));
      res.items.forEach(element => {
        element.needBudget = false;
        element.needBudgetValue = 0;
        this.availableBudgetForecasts.push(element);
      });
    });
  }

  /*end DIVISION */

  public clearFilters() {

    this.employee = null;
    this.employeeOwner = null;
    this.department = null;
    this.division = null;
    this.projectTypeDivision = null;
    this.assetType = null;
    this.availableBudgetForecasts = new Array<BudgetForecastView>();
    this.selectedBudgetForecasts = new Array<BudgetForecastView>();
  }
}

enum OperationType {
  NotSet = 1,
  AssetValidation = 2,
  Delete = 3,
  ProcessAssetOp = 4,
  DeleteOfferMaterial = 2
}



