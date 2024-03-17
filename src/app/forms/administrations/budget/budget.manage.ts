import { ConfigValuesHttpService } from './../../../services/http/common/config-values.service';
import { AssetInvDetail } from './../../../model/api/assets/asset-inv-detail';
import { CostCenterHttpService } from '../../../services/http/administration/cost-center.http.service';
import { CostCenter } from './../../../model/api/administration/cost-center';
import { AssetSimpleDetail } from './../../../model/api/assets/asset-simple-detail';
import {
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
import { BudgetList } from './budget.list';
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
import alasql from 'alasql';
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
import { Customer } from '../../../model/api/assets/customer';
import { Product } from '../../../model/api/assets/product';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ProjectType } from '../../../model/api/assets/project-type';
import { OverlayPanel } from 'primeng/overlaypanel';
import { AccMonth } from '../../../model/api/accounting/acc-month';
import { AccMonthListComponent } from '../../accounting/acc-month.list';
import { AccMonthHttpService } from '../../../services/http/accounting/acc-month.http.service';
import { BudgetBaseImport } from '../../../model/common/import/budget-base-import';

@Component({
  selector: 'budget-manage',
  templateUrl: 'budget.manage.html',
  styleUrls: ['budget.manage.scss'],
  providers: [
    AdministrationDetailHttpService,
    EmployeeHttpService,
    PartnerHttpService,
    CostCenterHttpService,
    ConfigValuesHttpService,
    CompanyHttpService,
    AccMonthHttpService,
  ],
//   animations: [
//     trigger('rowExpansionTrigger', [
//         state('void', style({
//             transform: 'translateX(-10%)',
//             opacity: 0
//         })),
//         state('active', style({
//             transform: 'translateX(0)',
//             opacity: 1
//         })),
//         transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
//     ])
// ]
})
export class BudgetManage implements OnInit {
  // extends GenericManage<AssetInvDetail> {

  // @ViewChild('budgetList') public budgetList: BudgetList;

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
  isCollapsed: boolean = true;
  pageSize = 5;
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

  dataChildDepartment: any[] = [];
  dataChildDivision: any[] = [];
  dataChildAdmCenter: any[] = [];
  dataChildRegion: any[] = [];
  dataChildAssetType: any[] = [];
  dataChildProject: any[] = [];
  dataChildProjectType: any[] = [];

  dataCompanyValues: any[] = [];

  configs: any = {
    id_field: 'id',
    parent_id_field: 'parent',
    parent_display_field: 'code',
    load_children_on_expand: true,
    filter: true,
    multi_select: true,
    // show_parent_on_edit: false,
    // show_summary_row: true,
    css: { // Optional
      expand_class: 'fa fa-caret-right',
      collapse_class: 'fa fa-caret-down',
      // table_class: 'table table-striped table-sm',
      // row_selection_class: ''
    },
    data_loading_text: 'Nu exista date',
    // actions: {
    //   add: true,
    //   edit: true,
    //   delete: true,
    //   edit_parent: true
    // },
    columns: [
      {
        name: 'code',
        header: 'Company',
        editable: true,
        width: '100px',
        summary_renderer: () => {
          return '<b>Total:</b>';
        }
      },
      {
        name: 'name',
        header: 'B.U.',
        editable: true
      },
      {
        name: 'division',
        header: 'Departament',
        editable: true
      },
      {
        name: 'admCenter',
        header: 'PC',
        editable: true
      },
      {
        name: 'region',
        header: 'PC DET',
        editable: true
      },
      {
        name: 'assetType',
        header: 'Type',
        editable: true
      },
      {
        name: 'projectType',
        header: 'Project',
        editable: true
      },

            // --------------------------------- VIEW  12 MONTH --------------------------------//
      {
        name: 'fy2019Actual',
        header: 'FY 2019 Act',
        editable: true,
        renderer: function(value) {
          return value + ' RON';
        },
        summary_renderer: (data) => {
          return data.map(rec => rec.fy2019Actual).reduce((a, b) => a + b, 0) + ' RON';
        }
      },
      {
        name: 'fy2020Actual',
        header: 'FY 2020 Act',
        editable: true,
        renderer: function(value) {
          return value + ' RON';
        },
        summary_renderer: (data) => {
          return data.map(rec => rec.fy2020Actual).reduce((a, b) => a + b, 0) + ' RON';
        }
      },
      {
        name: 'fy2021Actual',
        header: 'FY 2021 Act',
        editable: true,
        renderer: function(value) {
          return value + ' RON';
        },
        summary_renderer: (data) => {
          return data.map(rec => rec.fy2021Actual).reduce((a, b) => a + b, 0) + ' RON';
        }
      },
      {
        name: 'fy2022BudgetBase',
        header: 'FY 22 Bgt @31Mart',
        editable: true,
        renderer: function(value) {
          return value + ' RON';
        },
        summary_renderer: (data) => {
          return data.map(rec => rec.fy2022BudgetBase).reduce((a, b) => a + b, 0) + ' RON';
        }
      },
      {
        name: 'fy2022BudgetDynamic',
        header: 'FY 22 Aug FF',
        editable: true,
        renderer: function(value) {
          return value + ' RON';
        },
        summary_renderer: (data) => {
          return data.map(rec => rec.fy2022BudgetDynamic).reduce((a, b) => a + b, 0) + ' RON';
        }
      },

      // --------------------------------- VIEW  12 MONTH --------------------------------//

      // --------------------------------- VAR VIEW  12 MONTH ----------------------------//
      {
        name: 'varView12MonthActual',
        header: '∆ Aug FF vs FY21 Act',
        editable: true,
        renderer: function(value) {
          return value + ' RON';
        },
        summary_renderer: (data) => {
          return data.map(rec => rec.varView12MonthActual).reduce((a, b) => a + b, 0) + ' RON';
        }
      },
      {
        name: 'varView12MonthBudget',
        header: '∆ Aug FF vs FY22 Bgt',
        editable: true,
        renderer: function(value) {
          return value + ' RON';
        },
        summary_renderer: (data) => {
          return data.map(rec => rec.varView12MonthBudget).reduce((a, b) => a + b, 0) + ' RON';
        }
      },
      {
        name: 'viewYTDBudgetBase',
        header: 'Apr-Aug Budget',
        editable: true,
        renderer: function(value) {
          return value + ' RON';
        },
        summary_renderer: (data) => {
          return data.map(rec => rec.viewYTDBudgetBase).reduce((a, b) => a + b, 0) + ' RON';
        }
      },

      {
        name: 'viewYTDBudgetDynamic',
        header: 'Apr-Aug AUG FF',
        editable: true,
        renderer: function(value) {
          return value + ' RON';
        },
        summary_renderer: (data) => {
          return data.map(rec => rec.viewYTDBudgetDynamic).reduce((a, b) => a + b, 0) + ' RON';
        }
      },

      {
        name: 'viewYTDActual',
        header: 'Apr-Aug Actuals',
        editable: true,
        renderer: function(value) {
          return value + ' RON';
        },
        summary_renderer: (data) => {
          return data.map(rec => rec.viewYTDActual).reduce((a, b) => a + b, 0) + ' RON';
        }
      },
     // ---------------------------------------VIEW YTD ---------------------------------//
     // ----------------------------------------VAR YTD ---------------------------------//
      {
        name: 'varYTDActual',
        header: '∆ Aug Act vs Aug FF',
        editable: true,
        renderer: function(value) {
          return value + ' RON';
        },
        summary_renderer: (data) => {
          return data.map(rec => rec.varYTDActual).reduce((a, b) => a + b, 0) + ' RON';
        }
      },

      {
        name: 'varYTDBudget',
        header: '∆ Aug FF vs Buget',
        editable: true,
        renderer: function(value) {
          return value + ' RON';
        },
        summary_renderer: (data) => {
          return data.map(rec => rec.varYTDBudget).reduce((a, b) => a + b, 0) + ' RON';
        }
      },

       // ----------------------------------------VAR YTD ---------------------------------//


       // ---------------------------------------VIEW MONTH -------------------------------//
      {
        name: 'viewPerMonthBudgetBase',
        header: 'Aug Budget',
        editable: true,
        renderer: function(value) {
          return value + ' RON';
        },
        summary_renderer: (data) => {
          return data.map(rec => rec.viewPerMonthBudgetBase).reduce((a, b) => a + b, 0) + ' RON';
        }
      },

      {
        name: 'viewPerMonthBudgetDynamic',
        header: 'Aug AUG FF',
        editable: true,
        renderer: function(value) {
          return value + ' RON';
        },
        summary_renderer: (data) => {
          return data.map(rec => rec.viewPerMonthBudgetDynamic).reduce((a, b) => a + b, 0) + ' RON';
        }
      },

      {
        name: 'viewPerMonthActual',
        header: 'Aug Actuals',
        editable: true,
        renderer: function(value) {
          return value + ' RON';
        },
        summary_renderer: (data) => {
          return data.map(rec => rec.viewPerMonthActual).reduce((a, b) => a + b, 0) + ' RON';
        }
      },

      // ---------------------------------------------VIEW MONTH -------------------------------//

      // ---------------------------------------------VAR MONTH -------------------------------//

      {
        name: 'varPerMonthActual',
        header: '∆ Aug Act vs Aug FF',
        editable: true,
        renderer: function(value) {
          return value + ' RON';
        },
        summary_renderer: (data) => {
          return data.map(rec => rec.varPerMonthActual).reduce((a, b) => a + b, 0) + ' RON';
        }
      },

      {
        name: 'varPerMonthBudget',
        header: '∆ Aug FF vs Buget',
        editable: true,
        renderer: function(value) {
          return value + ' RON';
        },
        summary_renderer: (data) => {
          return data.map(rec => rec.varPerMonthBudget).reduce((a, b) => a + b, 0) + ' RON';
        }
      },

        // ---------------------------------------------VAR MONTH -------------------------------//
    ],
    // subgrid: true,
    // subgrid_config: {
    //   id_field: 'technology_id',
    //   show_summary_row: true,
    //   columns: [
    //     {
    //       name: 'type',
    //       header: 'Type'
    //     },
    //     {
    //       name: 'technology',
    //       header: 'Technology',
    //       type: 'custom',
    //       sortable: true,
    //       component: CustomCellViewComponent,
    //       summary_renderer: () => {
    //         return '<b>Total:</b>';
    //       }
    //     },
    //     {
    //       name: 'experience',
    //       header: 'Experience',
    //       sortable: true,
    //       renderer: function(value) {
    //         return value + ' years';
    //       },
    //       summary_renderer: (data) => {
    //         return data.map(rec => rec.experience).reduce((a, b) => a + b, 0) + ' years';
    //       }
    //     }
    //   ]
    // },
    row_edit_function: function(rec) {
      if (rec.parent === 0) {
        return false;
      } else {
        return true;
      }
    },
    row_delete_function: function(rec) {
      if (rec.parent === 0) {
        return false;
      } else {
        return true;
      }
    },
    row_class_function: function(rec) {
      return 'row-custom';
    }
    };

    customers: Customer[];
    rowGroupMetadata: any;

    products: Product[];

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public administrationDetailHttpService: AdministrationDetailHttpService,
    public budgetHttpService: BudgetHttpService,
    public employeeHttpService: EmployeeHttpService,
    public partnerHttpService: PartnerHttpService,
    public costCenterHttpService: CostCenterHttpService,
    public companyHttpService: CompanyHttpService,
    public accMonthHttpService: AccMonthHttpService,
    public configValuesHttpService: ConfigValuesHttpService,
    public dashbBoardService: DashboardHttpService,
    private messageService: MessageService,
  ) {

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (evt.urlAfterRedirects === '/budget') {
          // console.log('refreshing asset inv details');
          // console.log(JSON.stringify(evt));
          // setTimeout(() => {
          //   this.refreshAssets();
          // }, 500);
        }
      }
    });
  }

  public view: string;
  // public selectedAssetId: number = 0;
  public budgetRowSelection: string = 'single';
  public selectedBudgets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
  public selectedBudgetDetails: Array<AssetInvDetail> = new Array<AssetInvDetail>();

  ngOnInit() {
    // this.installOverlayPanelFix();
    this.getCompanyDynamicGroup();
  //   this.dashbBoardService.getCustomersMedium().then(data => {
  //     this.customers = data;
  //     this.updateRowGroupMetaData();
  // });

  // this.dashbBoardService.getProductsWithOrdersSmall().then(data => this.products = data);
  }

  // tslint:disable-next-line:use-lifecycle-interface
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

    this.selectedBudgetDetails = new Array<AssetInvDetail>();
    this.selectedBudgets = new Array<AssetSimpleDetail>();
    this.checkForRefresh();
    this.getCompanyDynamicGroup();
  }

  public addNewBudget() {
    this.router.navigate(['/budget/new']);
  }

  public addNewOperation() {
    AppData.AssetList = this.selectedBudgets;
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
      this.selectedBudgets = new Array<AssetSimpleDetail>();
      // this.selectedAssetId = 0;
      this.budgetRowSelection = 'single';
      this.updateAssetDepDetailSelectionEvent.emit(new Array<AssetDepDetail>());
      this.updateAssetInvDetailSelectionEvent.emit(new Array<AssetInvDetail>());
    }
  }
  public editBudget() {
    const selectedAssetId =
      this.selectedBudgets.length > 0 ? this.selectedBudgets[0].id : 0;
    if (selectedAssetId > 0) {
      this.router.navigate(['/budget', selectedAssetId]);
    }
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
    this.getCompanyDynamicGroup();
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
      this.budgetHttpService
        .deleteAsset(this.selectedBudgets[0].id)
        .subscribe((res) => {});
    }

    this.checkForRefresh();
  }

  public refreshAssets() {
    const params: Array<Param> = this.getFilters();
    // if (this.budgetList !== undefined) {
    //   this.budgetList.refresh(params);
    // }
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

    budgetFilter.filter = this.filter;
    params.push(new Param('pageSize', this.pageSize.toString()));
    params.push(new Param('jsonFilter', JSON.stringify(budgetFilter)));
    return params;
  }

  public exportSocgen() {
    this.showExportBtn = false;
    let params: Array<Param> = null;

    params = this.getFilters();
    this.budgetHttpService.export(params).subscribe((blob) => {
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

  public onPageUpdate(number: number) {
    this.pageSize = number;
    this.checkForRefresh();
}

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

  this.uploadModal.show();
}

public loadFileBudget(ev) {
  this.fileEventBudget = ev;

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
                      [A] as [Employee],
                      [B] as [Project],
                      [C] as [CountryName],
                      [D] as [CountryCode],
                      [E] as [Activity],
                      [F] as [DepartmentName],
                      [G] as [DepartmentCode],
                      [H] as [AdmCenter],
                      [I] as [Region],
                      [J] as [DivisionName],
                      [K] as [DivisionCode],
                      [L] as [ProjectTypeName],
                      [M] as [ProjectTypeCode],
                      [N] as [Info],
                      [O] as [AssetTypeName],
                      [P] as [AssetTypeCode],
                      [Q] as [AppState],
                      datetime([R]) as [StartMonth],
                      CAST([S] as NUMBER) as [DepPeriod],
                      CAST([T] as NUMBER) as [DepPeriodRem],
                      CAST([U] as NUMBER) as [ValueMonth1],
                      CAST([V] as NUMBER) as [ValueMonth2],
                      CAST([W] as NUMBER) as [ValueMonth3],
                      CAST([X] as NUMBER) as [ValueMonth4],
                      CAST([Y] as NUMBER) as [ValueMonth5],
                      CAST([Z] as NUMBER) as [ValueMonth6],
                      CAST([AA] as NUMBER) as [ValueMonth7],
                      CAST([AB] as NUMBER) as [ValueMonth8],
                      CAST([AC] as NUMBER) as [ValueMonth9],
                      CAST([AD] as NUMBER) as [ValueMonth10],
                      CAST([AE] as NUMBER) as [ValueMonth11],
                      CAST([AF] as NUMBER) as [ValueMonth12]
                      from FILE(?, {headers: true})`, [this.fileEventBudget])
      .then((importLines: Array<BudgetBaseImport>) => {
          // console.log(JSON.stringify(importLines));
          const newArray = importLines.filter(value => value.Employee !== undefined);
           console.log(JSON.stringify(newArray));
          // importLines = this.removeUndefinedFromArray(importLines);
          // console.log(JSON.stringify(importLines));
          this.importDataBudgetModal.show();

          this.importIndex = 1;
          this.importBudgetBaseLines = newArray;
          this.noOfItems = newArray.length;

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

          console.log(JSON.stringify(importLines));
          importLines = this.removeUndefinedFromArray(importLines);
          console.log(JSON.stringify(importLines));
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
      this.budgetHttpService.import(this.importBudgetBaseLines[this.importIndex]).subscribe((data: any) => {
          // if (data === 0) {
          //     alert('Seria ' + this.importSNLines[this.importIndex].SerialNumber + ' exista deja in baza de date!');
          //     return;
          // }
          this.importIndex = this.importIndex + 1;
          this.doImportBudget();
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
  this.budgetHttpService
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

onExpand(e) {
  // console.log(e.data.parent);
  // console.log(JSON.stringify(e));
  if (e.data.table === 'Company') {
    this.companyId = e.data.id;
    this.updateDepartmentListSelection(e.data.id).subscribe(() => {
      setTimeout(() => {
        e.resolve(this.dataChildDepartment);
      }, 1000);
    });
  } else if (e.data.table === 'Department') {
    this.departmentId = e.data.id;
    this.updateDivisionListSelection(e.data.id).subscribe(() => {
      setTimeout(() => {
        e.resolve(this.dataChildDivision);
      }, 1000);
    });
  } else if (e.data.table === 'Division') {
    this.divisionId = e.data.id;
    this.refreshAdmCenterList(e.data.id).subscribe(() => {
      setTimeout(() => {
        e.resolve(this.dataChildAdmCenter);
      }, 1000);
    });
  } else if (e.data.table === 'Region') {
    this.regionId = e.data.id;
    this.refreshAssetTypeList(e.data.id).subscribe(() => {
      setTimeout(() => {
        e.resolve(this.dataChildAssetType);
      }, 1000);
    });
  } else if (e.data.table === 'AdmCenter') {
    this.admCenterId = e.data.id;
    this.refreshRegionList(e.data.id).subscribe(() => {
      setTimeout(() => {
        e.resolve(this.dataChildRegion);
      }, 1000);
    });
  } else if (e.data.table === 'AssetType') {
    this.assetTypeId = e.data.id;
    this.refreshProjectTypeList(e.data.id).subscribe(() => {
      setTimeout(() => {
        e.resolve(this.dataChildProjectType);
      }, 1000);
    });
  }



  // const row_data = e.data;
  // if (row_data.id === 5) {
  //   setTimeout(() => {
  //     e.resolve([{ id: 4, code: 'Ashok', department: 'BU', division: 'Division', fy2019Act: 1000, fy2020Act: 900, fy2021Act: 800, fy2022Budget: 60, fy2022BudgetRem: 1, node_leaf: true},
  //       { id: 5, code: 'Sam', department: 'BU', division: 'Division', fy2019Act: 1000, fy2020Act: 900, fy2021Act: 800, fy2022Budget: 60, fy2022BudgetRem: 1},
  //       { id: 6, code: 'Sriya', department: 'BU', division: 'Division', fy2019Act: 1000, fy2020Act: 900, fy2021Act: 800, fy2022Budget: 60, fy2022BudgetRem: 1}]);
  //   }, 2000);
  // } else if (row_data.id === 4) {
  //   setTimeout(() => {
  //     e.resolve([{ id: 7, code: 'Ashok', department: 'BU', division: 'Division', fy2019Act: 1000, fy2020Act: 900, fy2021Act: 800, fy2022Budget: 60, fy2022BudgetRem: 60},
  //       { id: 8, code: 'Sam', department: 'BU', division: 'Division', fy2019Act: 1000, fy2020Act: 900, fy2021Act: 800, fy2022Budget: 40, weight: 60, fy2022BudgetRem: 1},
  //       { id: 9, code: 'Sriya', department: 'BU', division: 'Division', fy2019Act: 1000, fy2020Act: 900, fy2021Act: 800, fy2022Budget: 36, weight: 60, fy2022BudgetRem: 1}]);
  //   }, 2000);
  // }
}

getCompanyDynamicGroup() {
  this.subsription = this.dashbBoardService.companyDynamicGroup(this.accMonthId, this.companyId, this.countryId, this.projectId, this.admCenterId, this.regionId,
    this.assetTypeId, this.activityId).subscribe( data => {
      this.data = [...data];
  });
}

refreshDepartmentList(parentId: number): Observable<boolean> {
  const resultSubject = new Subject<boolean>();

  this.dashbBoardService.departmentDynamicGroup(36, this.companyId, this.countryId, this.projectId, this.admCenterId, this.regionId,
    this.assetTypeId, this.activityId, parentId).subscribe( (res: any[]) => {
    this.dataChildDepartment = res;
    resultSubject.next(true);
  }, () => { resultSubject.next(false); }, () => {});

  return resultSubject.asObservable();
}

updateDepartmentListSelection(parentId: number): Observable<boolean> {
  const resultSubject = new Subject<boolean>();
  this.refreshDepartmentList(parentId).subscribe(() => {
    resultSubject.next(true);
  });
  return resultSubject.asObservable();
}


refreshDivisionList(parentId: number): Observable<boolean> {
  const resultSubject = new Subject<boolean>();

  this.dashbBoardService.divisionDynamicGroup(36, this.companyId, this.countryId, this.projectId, this.admCenterId, this.regionId,
    this.assetTypeId, this.activityId, parentId).subscribe( (res: any[]) => {
    this.dataChildDivision = res;
    resultSubject.next(true);
  }, () => { resultSubject.next(false); }, () => {});

  return resultSubject.asObservable();
}

updateDivisionListSelection(parentId: number): Observable<boolean> {
  const resultSubject = new Subject<boolean>();
  this.refreshDivisionList(parentId).subscribe(() => {
    resultSubject.next(true);
  });
  return resultSubject.asObservable();
}


refreshAdmCenterList(parentId: number): Observable<boolean> {
  const resultSubject = new Subject<boolean>();

  this.dashbBoardService.admCenterDynamicGroup(36, this.companyId, this.countryId, this.departmentId, this.divisionId, this.projectId, this.admCenterId, this.regionId,
    this.assetTypeId, this.activityId, parentId).subscribe( (res: any[]) => {
    this.dataChildAdmCenter = res;
    resultSubject.next(true);
  }, () => { resultSubject.next(false); }, () => {});

  return resultSubject.asObservable();
}

updateAdmCenterListSelection(parentId: number): Observable<boolean> {
  const resultSubject = new Subject<boolean>();
  this.refreshAdmCenterList(parentId).subscribe(() => {
    resultSubject.next(true);
  });
  return resultSubject.asObservable();
}


refreshRegionList(parentId: number): Observable<boolean> {
  const resultSubject = new Subject<boolean>();

  this.dashbBoardService.regionDynamicGroup(36, this.companyId, this.countryId, this.departmentId, this.divisionId, this.projectId, this.admCenterId, this.regionId,
    this.assetTypeId, this.activityId, parentId).subscribe( (res: any[]) => {
    this.dataChildRegion = res;
    resultSubject.next(true);
  }, () => { resultSubject.next(false); }, () => {});

  return resultSubject.asObservable();
}

updateRegionListSelection(parentId: number): Observable<boolean> {
  const resultSubject = new Subject<boolean>();
  this.refreshRegionList(parentId).subscribe(() => {
    resultSubject.next(true);
  });
  return resultSubject.asObservable();
}


refreshAssetTypeList(parentId: number): Observable<boolean> {
  const resultSubject = new Subject<boolean>();

  this.dashbBoardService.assetTypeDynamicGroup(36, this.companyId, this.countryId, this.departmentId, this.divisionId, this.projectId, this.admCenterId, this.regionId,
    this.assetTypeId, this.activityId, parentId).subscribe( (res: any[]) => {
    this.dataChildAssetType = res;
    resultSubject.next(true);
  }, () => { resultSubject.next(false); }, () => {});

  return resultSubject.asObservable();
}

updateAssetTypeListSelection(parentId: number): Observable<boolean> {
  const resultSubject = new Subject<boolean>();
  this.refreshAssetTypeList(parentId).subscribe(() => {
    resultSubject.next(true);
  });
  return resultSubject.asObservable();
}




refreshProjectList(parentId: number): Observable<boolean> {
  const resultSubject = new Subject<boolean>();

  this.dashbBoardService.projectDynamicGroup(36, this.companyId, this.countryId, this.projectId, this.admCenterId, this.regionId,
    this.assetTypeId, this.activityId, parentId).subscribe( (res: any[]) => {
    this.dataChildProject = res;
    resultSubject.next(true);
  }, () => { resultSubject.next(false); }, () => {});

  return resultSubject.asObservable();
}

updateProjectListSelection(parentId: number): Observable<boolean> {
  const resultSubject = new Subject<boolean>();
  this.refreshProjectList(parentId).subscribe(() => {
    resultSubject.next(true);
  });
  return resultSubject.asObservable();
}


refreshProjectTypeList(parentId: number): Observable<boolean> {
  const resultSubject = new Subject<boolean>();

  this.dashbBoardService.projectTypeDynamicGroup(36, this.companyId, this.countryId, this.departmentId, this.divisionId, this.projectId, this.admCenterId, this.regionId,
    this.assetTypeId, this.activityId, parentId).subscribe( (res: any[]) => {
    this.dataChildProjectType = res;
    resultSubject.next(true);
  }, () => { resultSubject.next(false); }, () => {});

  return resultSubject.asObservable();
}

updateProjectTypeListSelection(parentId: number): Observable<boolean> {
  const resultSubject = new Subject<boolean>();
  this.refreshProjectTypeList(parentId).subscribe(() => {
    resultSubject.next(true);
  });
  return resultSubject.asObservable();
}

// VALUES //

refreshCompanyListValues(companyId: number): Observable<boolean> {
  const resultSubject = new Subject<boolean>();

  this.dashbBoardService.dynamicGroupMonth(36, this.companyId, this.departmentId, this.divisionId, this.countryId, this.projectId, this.admCenterId, this.regionId,
    this.assetTypeId, this.activityId, this.projectTypeId).subscribe( (res: any[]) => {
    this.dataCompanyValues = res;
    resultSubject.next(true);
  }, () => { resultSubject.next(false); }, () => {});

  return resultSubject.asObservable();
}

// VALUES //

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


onRowSelect($e) {
  const data = $e.data;
  console.log(JSON.stringify(data));

  this.companyId = 0;
  this.departmentId = 0;
  this.divisionId = 0;
  this.admCenterId = 0;
  this.regionId = 0;
  this.assetTypeId = 0;
  this.projectTypeId = 0;

  this.tableFilterName = data.table;

  if (data.table === 'Company') {
    this.companyId = data.id;
    this.filterName = data.name;
  } else if (data.table === 'Department') {
    this.departmentId = data.id;
    this.filterName = data.name;
    this.tableFilterName = data.name;
  } else if (data.table === 'Division') {
    this.divisionId = data.id;
    this.filterName = data.division;
  }  else if (data.table === 'AdmCenter') {
    this.admCenterId = data.id;
    this.filterName = data.admCenter;
  } else if (data.table === 'Region') {
    this.regionId = data.id;
    this.filterName = data.region;
  } else if (data.table === 'AssetType') {
    this.assetTypeId = data.id;
    this.filterName = data.assetType;
  } else if (data.table === 'ProjectType') {
    this.projectTypeId = data.id;
    this.filterName = data.projectType;
  }

  this.refreshCompanyListValues(data.id);
}

calculateCustomerTotal(name) {
  let total = 0;

  if (this.customers) {
      for (const customer of this.customers) {
          if (customer.representative.name === name) {
              total++;
          }
      }
  }

  return total;
}

onSort() {
  this.updateRowGroupMetaData();
}

updateRowGroupMetaData() {
  this.rowGroupMetadata = {};

  if (this.customers) {
      for (let i = 0; i < this.customers.length; i++) {
          const rowData = this.customers[i];
          const representativeName = rowData.representative.name;

          if (i === 0) {
              this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
          } else {
              const previousRowData = this.customers[i - 1];
              const previousRowGroup = previousRowData.representative.name;
              if (representativeName === previousRowGroup) {
                  this.rowGroupMetadata[representativeName].size++;
              } else {
                  this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
              }
          }
      }
  }
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
