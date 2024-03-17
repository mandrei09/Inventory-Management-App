import { ConfigValuesHttpService } from './../../../services/http/common/config-values.service';
import { AssetInvDetail } from './../../../model/api/assets/asset-inv-detail';
import { CostCenterHttpService } from '../../../services/http/administration/cost-center.http.service';
import { CostCenter } from './../../../model/api/administration/cost-center';
import { AssetSimpleDetail } from './../../../model/api/assets/asset-simple-detail';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AppConfig } from '../../../config';
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
import { AppUtils } from '../../../common/app.utils';
import { ContractListComponent } from './contract.list';
import { ContractHttpService } from '../../../services/http/administration/contract.http.service';
import { ContractFilter } from '../../../model/api/administration/contract.filter';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../../../services/dialog.service';
import {Budget} from '../../../model/api/administration/budget';
import {Contract} from '../../../model/api/administration/contract';
import {ContractAddEditComponent} from './contract-add-edit/contract-add-edit.component';

@Component({
  selector: 'app-contract-manage',
  templateUrl: 'contract.manage.html',
  styleUrls: ['contract.manage.scss'],
  providers: [
    AdministrationDetailHttpService,
    EmployeeHttpService,
    PartnerHttpService,
    CostCenterHttpService,
    ConfigValuesHttpService,
    CompanyHttpService,
  ],
})
export class ContractManageComponent implements OnInit, AfterViewInit {

  @ViewChild('contractList') public contractList: ContractListComponent;

  @ViewChild('employeeList') public employeeList: EmployeeListComponent;
  @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

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

  public mainViewMode: number = AssetManageViewMode.AssetList;
  public viewMode: number = AssetManageViewMode.AssetList;

  public filter: string;
  pageSize = 10;
  public updateAssetDepDetailSelectionEvent: EventEmitter<Array<AssetDepDetail>> = new EventEmitter<Array<AssetDepDetail>>();
  public updateAssetInvDetailSelectionEvent: EventEmitter<Array<AssetInvDetail>> = new EventEmitter<Array<AssetInvDetail>>();

  showExportBtn = true;
  showEmailBtn = true;

  public selectedPartners: Array<Partner> = new Array<Partner>();

  public selectedCostCenters: Array<CostCenter> = new Array<CostCenter>();
  public selectedEmployees: Array<Employee> = new Array<Employee>();
  public selectedAdministrations: Array<Administration> = new Array<Administration>();
  public selectedCompanies: Array<Company> = new Array<Company>();
  public get isAdmin(): boolean {
    return AppData.UserIsAdmin;
  }

  public data;
  public params: Array<Param> = null;

  public _partners: Partner[] = [];
  public get partners(): Partner[] { return this._partners; }
  public set partners(value: Partner[]) {
    this._partners = value;

    this.selectedPartners = value;
    this.checkForRefresh();
  }

  public _costCenters: CostCenter[] = [];
  public get costCenters(): CostCenter[] { return this._costCenters; }
  public set costCenters(value: CostCenter[]) {
    this._costCenters = value;

    this.setSelectedCostCenters(value);
    this.checkForRefresh();
  }

  public _companies: Company[] = [];
  public get companies(): Company[] { return this._companies; }
  public set companies(value: Company[]) {
    this._companies = value;

    this.selectedCompanies = value;
    this.checkForRefresh();
  }

  public _employee: Employee[] = [];
  public get employee(): Employee[] { return this._employee; }
  public set employee(value: Employee[]) {
    this._employee = value;

    // this.selectedEmployees = value;
    this.checkForRefresh();
  }

  public get employeeParams(): Array<Param> {
    let selectedCostCenters: Array<CostCenter> = null;
    selectedCostCenters = this.selectedCostCenters;
    const params = new Array<Param>();
    params.push(
      new Param(
        'costCenterIds',
        AppUtils.getIdsList<CostCenter, number>(selectedCostCenters)
      )
    );

    return params;
  }

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    public administrationDetailHttpService: AdministrationDetailHttpService,
    public contractHttpService: ContractHttpService,
    public employeeHttpService: EmployeeHttpService,
    public partnerHttpService: PartnerHttpService,
    public costCenterHttpService: CostCenterHttpService,
    public companyHttpService: CompanyHttpService,
    public configValuesHttpService: ConfigValuesHttpService,
    private dialogService: DialogService,
  ) {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (evt.urlAfterRedirects === '/procurement/contract/status') {
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
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.clearFilters();
    }, 1000);
  }

  public clearSelection() {
    this.contractList.selectedItems = this.selectedBudgetDetails;
  }

  public clearFilters() {
    this.selectedCostCenters = new Array<CostCenter>();
    this.selectedEmployees = new Array<Employee>();
    this.selectedCompanies = new Array<Company>();
    this.selectedAdministrations = new Array<Administration>();
    this.selectedPartners = new Array<Partner>();
    this.filter = '';

    this.selectedBudgetDetails = new Array<AssetInvDetail>();
    this.selectedBudgets = new Array<AssetSimpleDetail>();

    this.partners = null;
    this.costCenters = null;
    this.companies = null;
    this.employee = null;
    this.checkForRefresh();
  }

  public onPageUpdate(number: number) {
    this.pageSize = number;
    this.checkForRefresh();
}

  public addNewBudget() {
    this.router.navigate(['/procurement/contract/new']);
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

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: Contract | null = null) {
    let dialogRef = this.dialog.open(ContractAddEditComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: Contract) => {
      if (item !== null) this.checkForRefresh();
    });
  }

  public onItemEdit(item: Contract) {
    this.onAddEditItem(item);
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
  public editBudget(item: any) {
    console.log(item);
    const selectedAssetId = this.selectedBudgets.length > 0 ? this.selectedBudgets[0].id : 0;
    if (selectedAssetId > 0) {
      this.router.navigate(['/procurement/contract', selectedAssetId]);
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

  public setSelectedCostCenters(value) {
    // this.selectedCostCenters = this.costCenterList.selectedItems;
    console.log(value);
    this.selectedCostCenters = value;
    // this.costCenterListModal.hide();
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

  public selectEmployees(value) {
    let selectedCostCenters: Array<CostCenter> = null;
    selectedCostCenters = this.selectedCostCenters;
    const params = new Array<Param>();
    params.push(
      new Param(
        'costCenterIds',
        AppUtils.getIdsList<CostCenter, number>(selectedCostCenters)
      )
    );
    // this.employeeListModal.show();
    // this.employeeList.selectedItems = this.selectedEmployees;
    this.employeeList.selectedItems = value;
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

  public deleteBudget(item: any) {
    this.dialogService
      .confirmDialog({
        title: 'Confirm Action',
        message: 'Esti sigur ca vrei sa stergi acest obiect?',
        confirmCaption: 'Confirm',
        cancelCaption: 'Cancel',
      })
      .subscribe((confirmed: any) => {
        if (confirmed) {
          this.contractHttpService
            .deleteAsset(item?.id)
            .subscribe((res) => {});
          // this.notificationSvc.success('Company successfully deleted.');
        }
      });

    // if (confirm('Esti sigur ca vrei sa stergi acest obiect?')) {
    //   this.contractHttpService
    //     .deleteAsset(this.selectedBudgets[0].id)
    //     .subscribe((res) => {});
    // }

    this.checkForRefresh();
  }

  public refreshAssets() {
    const params: Array<Param> = this.getFilters();

    // if (this.depView) this.requestAssetDepDetailRefreshEvent.emit(params);
    // if (this.invView) this.requestAssetInvDetailRefreshEvent.emit(params);
    this.contractList.refresh(params);
    // this.assetRecoList.refresh(params);
  }

  public getFilters(): Array<Param> {
    const params = new Array<Param>();
    const budgetFilter: ContractFilter = new ContractFilter();

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
    //params.push(new Param('pageSize', this.pageSize.toString()));
    params.push(new Param('jsonFilter', JSON.stringify(budgetFilter)));
    return params;
  }

  public export() {
    this.showExportBtn = false;
    let params: Array<Param> = null;

    params = this.getFilters();
    this.contractHttpService.export(params).subscribe((blob) => {
      fileSaveAs(blob.body, 'Export.xlsx');
      this.showExportBtn = true;
    });
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
