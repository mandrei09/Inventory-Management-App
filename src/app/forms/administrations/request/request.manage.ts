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
import { Param } from '../../../model/common/param';
import { AppData } from '../../../app-data';
import { AssetDepDetail } from '../../../model/api/assets/asset-dep-detail';
import { Partner } from '../../../model/api/documents/partner';
import { Employee } from '../../../model/api/administration/employee';
import { PartnerHttpService } from '../../../services/http/documents/partner.http.service';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { RequestList } from './request.list';
import { AdministrationDetailHttpService } from '../../../services/http/administration/administration-detail.http.service';
import { CompanyHttpService } from '../../../services/http/assets/company.http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { EmployeeListComponent } from '../employees/employee.list';
import { CompanyListComponent } from '../../assets/companies/company.list';
import { PartnerListComponent } from '../../documents/partners/partner.list';
import { CostCenterListComponent } from '../cost-centers/cost-center.list';
import { AdministrationListComponent } from '../administrations/administration.list';
import { Administration } from '../../../model/api/administration/administration';
import { Company } from '../../../model/api/assets/company';
import { AppUtils } from '../../../common/app.utils';
import { Offer } from '../../../model/api/administration/offer';
import { RequestFilter } from '../../../model/api/administration/request.filter';
import { RequestHttpService } from '../../../services/http/administration/request.http.service';
import { UploadModalComponent } from '../../common/upload-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UploadRequestModalComponent } from '../../common/upload-request-modal.component';
import { RequestBudgetForecastHttpService } from '../../../services/http/requests/request-budget-forecast.http.service';
import { RequestBudgetForecastListComponent } from '../request-budget-forecasts/request-budget-forecast.list';
import { Request } from '../../../model/api/administration/request';
import { EntityFileHttpService } from '../../../services/http/common/entity-file.http.service';
import { EntityFile } from '../../../model/api/common/entity-file';
import { RequestOpDetailList } from '../request-ops/request-op.detail.list';
import { EntityFileListComponent } from '../../common/entity-file.list';
import { RequestOpHttpService } from '../../../services/http/administration/request-op.http.service';
import { UploadRequestBudgetForecastModalComponent } from '../../common/upload-request-budget-forecast-modal.component';
import {DialogService} from '../../../services/dialog.service';
import {RequestAddDialogComponent} from './request-add-dialog/request-add-dialog.component';
import {PrAddDialogComponent} from './pr-add-dialog/pr-add-dialog.component';
import {Order} from '../../../model/api/administration/order';
import {PoOrderEditDialogComponent} from '../order/po-order-edit-dialog/po-order-edit-dialog.component';
import {PrRequestEditDialogComponent} from './pr-request-edit-dialog/pr-request-edit-dialog.component';
import { RequestResult } from '../../../model/api/result/request-result';

@Component({
  selector: 'app-request-manage',
  templateUrl: 'request.manage.html',
  styleUrls: ['request.manage.scss'],
  providers: [
    AdministrationDetailHttpService,
    EmployeeHttpService,
    PartnerHttpService,
    CostCenterHttpService,
    // // ConfigValuesHttpService,
    CompanyHttpService,
  ],
})
export class RequestManageComponent implements OnInit, AfterViewInit {
  // // // extends GenericManage<AssetInvDetail>

  @ViewChild('requestList') public requestList: RequestList;
  @ViewChild('confirmationModal') public confirmationModal: ModalDirective;

  @ViewChild('employeeList') public employeeList: EmployeeListComponent;
  @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

  @ViewChild('companyList') public companyList: CompanyListComponent;
  @ViewChild('companyListModal') public companyListModal: ModalDirective;

  @ViewChild('partnerList') public partnerList: PartnerListComponent;
  @ViewChild('partnerListModal') public partnerListModal: ModalDirective;

  @ViewChild('costCenterList') public costCenterList: CostCenterListComponent;
  @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;

  @ViewChild('requestBudgetForecastList') public requestBudgetForecastList: RequestBudgetForecastListComponent;

  @ViewChild('requestOpDetailList') public requestOpList: RequestOpDetailList;
    @ViewChild('entityFileList') public entityFileList: EntityFileListComponent;


  @ViewChild('administrationList')
  public administrationList: AdministrationListComponent;
  @ViewChild('administrationListModal')
  public administrationListModal: ModalDirective;

  type: string = 'me';

  public mainViewMode: number = AssetManageViewMode.AssetList;
  public viewMode: number = AssetManageViewMode.AssetList;
  pageSize = 5;
  public filter: string;
  public confirmationMessage: string = '';
  isCollapsed: boolean = true;
  showExportBtn = true;
  isLoading: boolean = true;
  public entityTypeCode: string = 'REQUEST_BUDGET_FORECAST';
  public entityFile: EntityFile = null;
  public selectedRequestOp: any;

  public updateAssetDepDetailSelectionEvent: EventEmitter<
    Array<AssetDepDetail>
  > = new EventEmitter<Array<AssetDepDetail>>();
  public updateAssetInvDetailSelectionEvent: EventEmitter<
    Array<AssetInvDetail>
  > = new EventEmitter<Array<AssetInvDetail>>();

  public selectedBudgetIds: Array<number> = new Array<number>();
  public selectedRequestBudgetForecasts: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();

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

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public administrationDetailHttpService: AdministrationDetailHttpService,
    public requestHttpService: RequestHttpService,
    public employeeHttpService: EmployeeHttpService,
    public dialogService: DialogService,
    public partnerHttpService: PartnerHttpService,
    public costCenterHttpService: CostCenterHttpService,
    public companyHttpService: CompanyHttpService,
    public configValuesHttpService: ConfigValuesHttpService,
    public requestBudgetForecastHttpService: RequestBudgetForecastHttpService,
    public entityFileHttpService: EntityFileHttpService,
    public requestOpHttpService: RequestOpHttpService,
    public dialog: MatDialog,
  ) {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (evt.urlAfterRedirects === '/procurement/request') {
          // console.log('refreshing asset inv details');
          // console.log(JSON.stringify(evt));
          setTimeout(() => {
            this.refreshAssets();
          }, 100);
        }
      }
    });
  }

  public view: string;
  // public selectedAssetId: number = 0;
  public budgetRowSelection: string = 'single';
  public selectedRequests: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
  public selectedRequestDetails: Array<AssetInvDetail> = new Array<AssetInvDetail>();

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.clearFilters();
    }, 1000);
  }

  public addNewItem(item: any | null = null) {
    let dialogRef = this.dialog.open(PrAddDialogComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((res: RequestResult) => {
      if (res.success) this.checkForRefresh();
    });
  }

  public doSimpleSearch(filter: string) {
    this.filter = filter;
    this.checkForRefresh();
  }

  public clearSelection() {
    this.requestList.selectedItems = this.selectedRequestDetails;
  }

  public clearFilters() {
    this.selectedCostCenters = new Array<CostCenter>();
    this.selectedEmployees = new Array<Employee>();
    this.selectedCompanies = new Array<Company>();
    this.selectedAdministrations = new Array<Administration>();
    this.selectedPartners = new Array<Partner>();
    this.filter = '';

    this.selectedRequestDetails = new Array<AssetInvDetail>();
    this.selectedRequests = new Array<AssetSimpleDetail>();
    this.checkForRefresh();
  }

  public addNewBudget() {
    this.router.navigate(['/procurement/request/new']);
    // this.onAddEditItem();
  }

  public onAddEditItem(item: Request | null = null) {
    const dialogRef = this.dialog.open(RequestAddDialogComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      // data: { selected: item }
    });

    dialogRef.afterClosed().subscribe((item: Request) => {
      if (item !== null) { this.checkForRefresh(); }
    });
  }

  public addNewOperation() {
    AppData.AssetList = this.selectedRequests;
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

  public onEntityFileListSelectionChanged(entityFiles: Array<EntityFile>) {
    this.entityFile = ((entityFiles != null) && (entityFiles.length === 1)) ? entityFiles[0] : null;
}

public onAssetOpDetailListSelectionChanged(assetOpDetails: Array<any>) {
  this.selectedRequestOp = this.requestOpList.selectedItem;
}

  public changeRowSelection() {
    if (this.budgetRowSelection === 'single') {
      this.budgetRowSelection = 'multiple';
    } else {
      this.selectedRequests = new Array<AssetSimpleDetail>();
      // this.selectedAssetId = 0;
      this.budgetRowSelection = 'single';
      this.updateAssetDepDetailSelectionEvent.emit(new Array<AssetDepDetail>());
      this.updateAssetInvDetailSelectionEvent.emit(new Array<AssetInvDetail>());
    }
  }
  public editBudget() {
    const selectedAssetId = this.selectedRequests.length > 0 ? this.selectedRequests[0].id : 0;
    if (selectedAssetId > 0) {
      this.router.navigate(['/procurement/request', selectedAssetId]);
    }
  }

  public onBudgetSelectionChanged(assets: Array<any>) {
    this.selectedRequestDetails = assets;
    this.selectedRequests = new Array<any>();
    this.selectedRequestBudgetForecasts = new Array<any>();
    assets.forEach((asset: any) => {
      this.selectedRequests.push(asset);
    });

    const params: Array<Param> = new Array<Param>();

    // params.push(new Param('offerIds', AppUtils.getIdsList<Offer, number>([ this.requestList != null &&
    // this.requestList.selectedItem != null && this.requestList.selectedItem.offer != null ? this.requestList.selectedItem.offer : null ])));

    params.push(new Param('requestIds', AppUtils.getIdsList<Request, number>([ this.requestList != null &&
      this.requestList.selectedItem != null ? this.requestList.selectedItem : null ])));

      setTimeout(() => {
        if(this.requestBudgetForecastList != undefined){
          this.requestBudgetForecastList.refresh(params);
          this.refreshEntityFiles();
        }
      }, 300);

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
      this.requestHttpService
        .deleteAsset(this.selectedRequests[0].id)
        .subscribe((res) => {});
    }

    this.checkForRefresh();
  }

  public refreshAssets() {
    const params: Array<Param> = this.getFilters();

    // if (this.depView) this.requestAssetDepDetailRefreshEvent.emit(params);
    // if (this.invView) this.requestAssetInvDetailRefreshEvent.emit(params);
    if(this.requestList != undefined){
      this.requestList.refresh(params);
    }

    // this.assetRecoList.refresh(params);
  }

  public getFilters(): Array<Param> {
    const params = new Array<Param>();
    const budgetFilter: RequestFilter = new RequestFilter();

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
    budgetFilter.type = this.type;
    // params.push(new Param('pageSize', this.pageSize.toString()));
    params.push(new Param('jsonFilter', JSON.stringify(budgetFilter)));
    return params;
  }

  public exportSocgen() {
    this.showExportBtn = false;
    let params: Array<Param> = null;

    params = this.getFilters();
    this.requestHttpService.export(params).subscribe((blob) => {
      fileSaveAs(blob, 'Export.xlsx');
      this.showExportBtn = true;
    });
  }

  public onProcessLevel1() {
    this.mainViewMode = AssetManageMainViewMode.Validate1;
    // this.confirmationMessage = 'Alocati tichetul selectat?';
    // this.confirmationModal.show();
    this.dialogService
      .confirmDialog({
        title: 'Confirm Action',
        message: 'Alocati tichetul selectat?',
        confirmCaption: 'Da',
        cancelCaption: 'Nu',
      })
      .subscribe((confirmed) => {
        console.log(confirmed);
        if (confirmed) {
          this.onConfirmationApproved();
        }
      });
}

public onProcessLevel2() {
    this.mainViewMode = AssetManageMainViewMode.Validate2;
    // this.confirmationMessage = 'Refuzati tichetul selectat?';
    this.dialogService
      .reasonDialog({
        title: 'Confirm Action',
      message: 'Refuzati tichetul selectat?',
      label: 'Motiv refuz',
      confirmCaption: 'Da',
      cancelCaption: 'Nu',
      })
      .subscribe((confirmed) => {
        // console.log(confirmed);
        if (confirmed) {
          this.onConfirmationApproved();
        }
      });
}

// public onProcessLevel3() {
//     this.mainViewMode = AssetManageMainViewMode.Validate3;
//     this.confirmationMessage = 'Validati operatia selectata?';
//     this.confirmationModal.show();
// }

// public onProcessLevel4() {
//     this.mainViewMode = AssetManageMainViewMode.Validate4;
//     this.confirmationMessage = 'Validati operatia selectata?';
//     this.confirmationModal.show();
// }

public onConfirmationApproved() {

  switch (this.mainViewMode) {
      case AssetManageMainViewMode.Validate1:
          this.processLevel1();
          break;
      case AssetManageMainViewMode.Validate2:
          this.processLevel2();
          break;
      // case AssetManageMainViewMode.Validate3:
      //     this.processLevel3();
      //     break;
      // case AssetManageMainViewMode.Validate4:
      //     this.processLevel4();
      //     break;
      default:
          break;
  }

  this.mainViewMode = AssetManageViewMode.AssetList;
  // this.confirmationModal.hide();
}

public onConfirmationCanceled() {
  this.mainViewMode = AssetManageViewMode.AssetList;
  this.confirmationModal.hide();
}

public processLevel1() {

  let isValid = true;
  this.selectedRequests.forEach( item => {

      if (item.appStateId === 34) {

          isValid = false;
          alert('Tichetul ' + item.name + ' a fost aprobat deja!');
          return;
      } else {
          if (this.selectedBudgetIds.indexOf(item.id)  === -1) {
              this.selectedBudgetIds.push(item.id);
          }
      }

  });

  if (isValid) {
      this.requestHttpService.validateLevel1(this.selectedBudgetIds).subscribe((data) => {
          this.refreshAssets();
          this.selectedBudgetIds = new Array<number>();
      });
  }

}

public processLevel2() {

  let isValid = true;
  this.selectedRequests.forEach( item => {

      if (item.appStateId === 34) {

          isValid = false;
          alert('P.R.- ul ' + item.name + ' a fost aprobat deja!');
          return;
      } else {
          if (this.selectedBudgetIds.indexOf(item.id)  === -1) {
              this.selectedBudgetIds.push(item.id);
          }
      }

  });

  if (isValid) {
      this.requestHttpService.reject(this.selectedBudgetIds).subscribe((data) => {
          alert('Tichetul a fost refuzat cu succes!');
          this.refreshAssets();
          this.selectedBudgetIds = new Array<number>();
      });
  }

}

public processLevel3() {

  let isValid = true;
  this.selectedRequests.forEach( item => {

      if (item.appStateId === 1 || item.appStateId === 13 || item.appStateId === 15) {

          isValid = false;
          alert('Oferta ' + item.name + ' a fost aprobata deja!');
          return;
      } else {
          if (this.selectedBudgetIds.indexOf(item.id)  === -1) {
              this.selectedBudgetIds.push(item.id);
          }
      }

  });

  if (isValid) {
      this.requestHttpService.validateLevel3(this.selectedBudgetIds, 14).subscribe((data) => {
          this.refreshAssets();
          this.selectedBudgetIds = new Array<number>();
      });
  }

}

public processLevel4() {

  let isValid = true;
  this.selectedRequests.forEach( item => {

      if (item.appStateId === 1 || item.appStateId === 13 || item.appStateId === 14) {

          isValid = false;
          alert('Oferta ' + item.name + ' a fost aprobata deja!');
          return;
      } else {
          if (this.selectedBudgetIds.indexOf(item.id)  === -1) {
              this.selectedBudgetIds.push(item.id);
          }
      }

  });

  if (isValid) {
      this.requestHttpService.validateLevel4(this.selectedBudgetIds, 15).subscribe((data) => {
          this.refreshAssets();
          this.selectedBudgetIds = new Array<number>();
      });
  }

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

onAssetFileUpload() {
  const requestId = this.requestList.selectedItems.length > 0 ? this.requestList.selectedItems[0].id : 0;
  const dialogRef = this.dialog.open(UploadRequestModalComponent, {
    panelClass: 'centered-middle-modal', height: '90%', maxHeight: '90%', disableClose: true, width: '600px', position: { bottom: '15%', top: 'auto'},
    data: { uploadType: 'REQUEST_BOOK', uploadFolder: 'REQUEST', assetId: requestId }
  });
  dialogRef.afterClosed().subscribe(() => {
    this.checkForRefresh();
  });
}

onAssetDocumentFileUpload() {
  const requestBudgetForecastId = this.requestBudgetForecastList.selectedItems.length > 0 ? this.requestBudgetForecastList.selectedItems[0].id : 0;
  const dialogRef = this.dialog.open(UploadRequestBudgetForecastModalComponent, {
    panelClass: 'centered-middle-modal', height: '80%', maxHeight: '80%', disableClose: true, width: '600px', position: { bottom: '15%', top: 'auto'},
    data: { uploadType: 'REQUEST_BUDGET_FORECAST', uploadFolder: 'REQUESTBUDGETFORECAST', entityId: requestBudgetForecastId }
  });
  dialogRef.afterClosed().subscribe(() => {
    this.checkForRefresh();
    this.entityFile = null;
    this.refreshEntityFiles();
  });
}

public changeTab(type, e){
  if (type === 'componente') {
      // this.showComponent = true;
  } else {
      // this.showComponent = false;
  }
}

public refreshEntityFiles(){
  const params: Array<Param> = new Array<Param>();

  params.push(new Param('entityTypeCode', this.entityTypeCode));
  params.push(new Param('entityId', this.selectedRequestBudgetForecasts.length > 0 ? this.selectedRequestBudgetForecasts[0].id.toString() : this.selectedRequests.length > 0  ? this.selectedRequests[0].id.toString() : null));
  this.entityFile = null;
  this.entityFileList.refresh(params);
}

public setSelectedItem(reqBF: Array<any>) {

let params: Array<Param> = new Array<Param>();

if (this.requestBudgetForecastList != null) {

  this.selectedRequestBudgetForecasts = new Array<any>();
  this.requestBudgetForecastList.selectedItems.forEach((requestBGF) => {
      this.selectedRequestBudgetForecasts.push(requestBGF);
  });

  this.refreshEntityFiles();
}
}

  onValChange(value) {
    this.clearSelection();
    // this.requestList.selectedItems = [];
    // this.requestBudgetForecastList.selectedItems = [];
    // this.entityFileList.selectedItems = [];

    this.type = value;
    this.refreshAssets();
  }

  public onPrRequestEdit(item: Request) {
    let dialogRef = this.dialog.open(PrRequestEditDialogComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: RequestResult) => {
      if (item.success) this.checkForRefresh();
    });
  }

  public export() {
    this.showExportBtn = false;
    let params: Array<Param> = null;

    params = this.getFilters();
    this.requestHttpService.export(params).subscribe((blob) => {
      fileSaveAs(blob.body, 'Export.xlsx');
      this.showExportBtn = true;
    });
  }
}

enum AssetManageMainViewMode {
  AssetList = 1,
  AssetDetail = 2,
  OperationDetail = 3,
  AssetRecoList = 4,
  Validate1 = 5,
  Validate2 = 6,
  Validate3 = 7,
  Validate4 = 8
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
