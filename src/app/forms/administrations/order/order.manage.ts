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
import { OrderList } from './order.list';
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
import { OrderHttpService } from '../../../services/http/administration/order.http.service';
import { AppUtils } from '../../../common/app.utils';
import { OrderFilter } from '../../../model/api/administration/order.filter';
import { OfferMaterialHttpService } from '../../../services/http/administration/offer-material.http.service';
import { OrderMaterialListComponent } from '../order-materials/order-material.list';
import { OrderMaterialHttpService } from '../../../services/http/administration/order-material.http.service';
import { Order } from '../../../model/api/administration/order';
import { MatrixHttpService } from '../../../services/http/administration/matrix.http.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadOrderModalComponent } from '../../common/upload-order-modal.component';
import { CreateAssetSAPResult } from '../../../model/api/result/create-asset-SAP-result';
import { NotificationService } from '../../../services/notification.service';
import { RequestBudgetForecastMaterialHttpService } from '../../../services/http/requests/request-budget-forecast-material.http.service';
import { RequestBudgetForecastHttpService } from '../../../services/http/requests/request-budget-forecast.http.service';
import { RequestBudgetForecastListComponent } from '../request-budget-forecasts/request-budget-forecast.list';
import { RequestBudgetForecastMaterialListComponent } from '../request-budget-forecast-materials/request-budget-forecast-material.list';
import { RequestBudgetForecast } from '../../../model/api/requests/request-budget-forecast';
import { Request } from '../../../model/api/administration/request';
import { RequestFilter } from '../../../model/api/requests/request.filter';
import {OrderDetailsDialogComponent} from './order-details-dialog/order-details-dialog.component';
import {OrderEditDialogComponent} from './order-edit-dialog/order-edit-dialog.component';
import {PoOrderEditDialogComponent} from './po-order-edit-dialog/po-order-edit-dialog.component';
import {PoOrderDetailsDialogComponent} from './po-order-details-dialog/po-order-details-dialog.component';
import {OrderResult} from '../../../model/api/result/order-result';
import {AssetAddDialogComponent} from '../../assets/assets/asset-add-dialog/asset-add-dialog.component';
import {DialogService} from '../../../services/dialog.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'order-manage',
  templateUrl: 'order.manage.html',
  styleUrls: ['order.manage.scss'],
  providers: [
    AdministrationDetailHttpService,
    EmployeeHttpService,
    PartnerHttpService,
    CostCenterHttpService,
    ConfigValuesHttpService,
    CompanyHttpService,
    MatrixHttpService,
  ],
})
export class OrderManageComponent implements OnInit, AfterViewInit {

  @ViewChild('orderList') public orderList: OrderList;
  @ViewChild('confirmationModal') public confirmationModal: ModalDirective;

  @ViewChild('employeeList') public employeeList: EmployeeListComponent;
  @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

  @ViewChild('companyList') public companyList: CompanyListComponent;
  @ViewChild('companyListModal') public companyListModal: ModalDirective;

  @ViewChild('partnerList') public partnerList: PartnerListComponent;
  @ViewChild('partnerListModal') public partnerListModal: ModalDirective;

  @ViewChild('costCenterList') public costCenterList: CostCenterListComponent;
  @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;

  // @ViewChild('offerMaterialList') public offerMaterialList: OfferMaterialListComponent;
  // @ViewChild('orderMaterialList') public orderMaterialList: OrderMaterialListComponent;

  @ViewChild('requestBudgetForecastList') public requestBudgetForecastList: RequestBudgetForecastListComponent;
  @ViewChild('requestBudgetForecastMaterialList') public requestBudgetForecastMaterialList: RequestBudgetForecastMaterialListComponent;

  @ViewChild('administrationList')
  public administrationList: AdministrationListComponent;
  @ViewChild('administrationListModal')
  public administrationListModal: ModalDirective;

  public mainViewMode: number = AssetManageViewMode.AssetList;
  public viewMode: number = AssetManageViewMode.AssetList;
  public filter: string;
  public confirmationMessage: string = '';
  isCollapsed: boolean = true;
  showExportBtn = true;
  public isSaved: boolean = true;
  // matrixData: Matrix[] = new Array<Matrix>();

  public updateAssetDepDetailSelectionEvent: EventEmitter<Array<AssetDepDetail>> = new EventEmitter<Array<AssetDepDetail>>();
  public updateAssetInvDetailSelectionEvent: EventEmitter<Array<AssetInvDetail>> = new EventEmitter<Array<AssetInvDetail>>();

  public selectedBudgetIds: Array<number> = new Array<number>();

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
  type: string = 'all';
  public token = '';
  decodedToken: any;
  roleName = '';
  userName = '';
  public pageSize = 10;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public administrationDetailHttpService: AdministrationDetailHttpService,
    public orderHttpService: OrderHttpService,
    public employeeHttpService: EmployeeHttpService,
    public partnerHttpService: PartnerHttpService,
    public costCenterHttpService: CostCenterHttpService,
    public companyHttpService: CompanyHttpService,
    public configValuesHttpService: ConfigValuesHttpService,
    // public offerMaterialHttpService: OfferMaterialHttpService,
    // public orderMaterialHttpService: OrderMaterialHttpService,
    public matrixHttpService: MatrixHttpService,
    private notificationService: NotificationService,
    public requestBudgetForecastHttpService: RequestBudgetForecastHttpService,
    public requestBudgetForecastMaterialHttpService: RequestBudgetForecastMaterialHttpService,
    public dialog: MatDialog,
    public dialogService: DialogService,
    private jwtService: JwtHelperService,
  ) {

    if (AppData.UserIsSignedIn) {
      this.token = localStorage.getItem('id_token');
      this.decodedToken = this.jwtService.decodeToken(this.token);
      this.userName = this.decodedToken.name;
    } else {
     this.router.navigate(['/login']);
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (evt.urlAfterRedirects === '/procurement/order') {
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
  public selectedOrders: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
  public selectedRequestBudgetForecasts: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
  public selectedOrderDetails: Array<AssetInvDetail> = new Array<AssetInvDetail>();

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.clearFilters();
    }, 1000);
  }

  public setSelectedItem(reqBF: Array<any>) {
    const requestFilter: RequestFilter = new RequestFilter();

    let selectedRequestBudgetForecastMaterials = new Array<any>();

    setTimeout(() => {
      if(this.requestBudgetForecastMaterialList != undefined){
        this.requestBudgetForecastMaterialList.selectedItems = selectedRequestBudgetForecastMaterials;
      }
    }, 200);


  let params: Array<Param> = new Array<Param>();

  if (this.requestBudgetForecastList != null) {
    requestFilter.requestBudgetForecastIds = new Array<number>();

    this.selectedRequestBudgetForecasts = new Array<any>();
    this.requestBudgetForecastList.selectedItems.forEach((requestBGF) => {
        requestFilter.requestBudgetForecastIds.push(requestBGF.id);
        this.selectedRequestBudgetForecasts.push(requestBGF);
    });
}
   params.push(new Param('requestBudgetForecastIds', ''));
   params.push(new Param('orderId', this.orderList.selectedItem != null ? this.orderList.selectedItem.id.toString() : null));
   params.push(new Param('jsonFilter', JSON.stringify(requestFilter)));

   setTimeout(() => {
    if(this.requestBudgetForecastMaterialList != undefined){
      this.requestBudgetForecastMaterialList.refresh(params);
    }
   }, 400);

  // params.push(new Param('requestBudgetForecastIds', AppUtils.getIdsList<RequestBudgetForecast, number>([
  //   this.requestBudgetForecastList.selectedItem != null ? this.requestBudgetForecastList.selectedItem : null ])));
}

  public clearSelection() {
    this.orderList.selectedItems = this.selectedOrderDetails;
  }

  public clearFilters() {
    this.selectedCostCenters = new Array<CostCenter>();
    this.selectedEmployees = new Array<Employee>();
    this.selectedCompanies = new Array<Company>();
    this.selectedAdministrations = new Array<Administration>();
    this.selectedPartners = new Array<Partner>();
    this.filter = '';

    this.selectedOrderDetails = new Array<AssetInvDetail>();
    this.selectedOrders = new Array<AssetSimpleDetail>();
    this.selectedRequestBudgetForecasts = new Array<AssetSimpleDetail>();
    this.checkForRefresh();
  }

  public addNewBudget() {
    this.router.navigate(['/procurement/order/new']);
  }

  public onAddNew() {
    this.onAddEditItem();
  }

  public onAddEditItem(item: Order | null = null) {
    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      // data: { item: item }
    });

    dialogRef.afterClosed().subscribe((result: OrderResult) => {
      if (result.success) this.checkForRefresh();
    });
  }

  public addNewOperation() {
    AppData.AssetList = this.selectedOrders;
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
      this.selectedOrders = new Array<AssetSimpleDetail>();
      // this.selectedAssetId = 0;
      this.budgetRowSelection = 'single';
      this.updateAssetDepDetailSelectionEvent.emit(new Array<AssetDepDetail>());
      this.updateAssetInvDetailSelectionEvent.emit(new Array<AssetInvDetail>());
    }
  }
  public editBudget(item: any) {
    console.log(item);
    const selectedAssetId =
      this.selectedOrders.length > 0 ? this.selectedOrders[0].id : 0;
    if (selectedAssetId > 0) {
      this.router.navigate(['/procurement/orderchange', selectedAssetId]);
    }
  }

  public onItemView($event) {
    const dialogRef = this.dialog.open(PoOrderDetailsDialogComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { selectedItem: $event }
    });

    dialogRef.afterClosed().subscribe((item: Order) => {
      if (item !== null) this.checkForRefresh();
    });
  }

  public onOrderSelectionChanged(assets: Array<any>) {

    let selectedRequestBudgetForecasts = new Array<any>();

    setTimeout(() => {
      if(this.requestBudgetForecastList != undefined){
        this.requestBudgetForecastList.selectedItems = selectedRequestBudgetForecasts;
      }
    }, 200);


    let params: Array<Param> = new Array<Param>();
    const requestFilter: RequestFilter = new RequestFilter();
    let selectedRequestBudgetForecastMaterials = new Array<any>();

    setTimeout(() => {
      if(this.requestBudgetForecastMaterialList != undefined){
        this.requestBudgetForecastMaterialList.selectedItems = selectedRequestBudgetForecastMaterials;

        requestFilter.requestBudgetForecastIds = new Array<number>();

        this.selectedRequestBudgetForecasts = new Array<any>();
        requestFilter.requestBudgetForecastIds.push(-1);


        params.push(new Param('requestBudgetForecastIds', ''));
        params.push(new Param('jsonFilter', JSON.stringify(requestFilter)));

        this.requestBudgetForecastMaterialList.refresh(params);
      }
    }, 200);

    // this.matrixData = new Array<Matrix>();
    this.selectedOrderDetails = assets;
    this.selectedOrders = new Array<any>();
    assets.forEach((asset: any) => {
      this.selectedOrders.push(asset);
    });

    params = new Array<Param>();

    params.push(new Param('orderIds', AppUtils.getIdsList<Order, number>([ this.orderList != null &&
    this.orderList.selectedItem != null ? this.orderList.selectedItem : null ])));
    // this.orderMaterialList.refresh(params);

    params.push(new Param('requestIds', AppUtils.getIdsList<Request, number>([ this.orderList != null &&
      this.orderList.selectedItem != null && this.orderList.selectedItem.offer != null &&
      this.orderList.selectedItem.offer.request != null ? this.orderList.selectedItem.offer.request : null ])));

      setTimeout(() => {
        if(this.requestBudgetForecastList != null){
          this.requestBudgetForecastList.refresh(params);
        }
      }, 400);

    // if (this.orderList != null && this.orderList.selectedItem != null && this.orderList.selectedItem.project != null && this.orderList.selectedItem.costCenter != null && this.orderList.selectedItem.projectType && this.orderList.selectedItem.assetType ) {
    //   const orderValue = this.orderList.selectedItem.valueIni;
    //   // this.matrixHttpService.getData(this.orderList.selectedItem.project.id, this.orderList.selectedItem.costCenter.id).subscribe( (res: MatrixData[]) => {
    //   //   this.matrixData = new MatrixData();
    //   //   this.matrixData.children = new Array<MatrixChildrenBase>();
    //   //   if (res.length > 0) {
    //   //     res[0].children.forEach(element => {
    //   //       this.matrixData.children.push(element);
    //   //     });
    //   //   }
    //   // });
    //   // console.log(JSON.stringify(this.orderList.selectedItem));
    //   // params.push(new Param('projectIds', this.orderList.selectedItem.project.id));
    //   // params.push(new Param('costCenterIds', this.orderList.selectedItem.costCenter.id));
    //   // params.push(new Param('projectTypeIds', this.orderList.selectedItem.projectType.id));

    //   this.matrixHttpService.getMatrixData(this.orderList.selectedItem.project.id, this.orderList.selectedItem.costCenter.id, this.orderList.selectedItem.projectType.id, this.orderList.selectedItem.assetType.id, orderValue).subscribe( (res: Matrix[]) => {
    //     // this.matrixData.children = new Array<MatrixChildrenBase>();
    //     // if (res.length > 0) {
    //     //   res[0].children.forEach(element => {
    //     //     this.matrixData.children.push(element);
    //     //   });
    //     // }
    //     this.matrixData = res;
    //   });
    // } else {
    //   this.matrixData = null;
    // }
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
    var index: number = this.selectedCostCenters.indexOf(costCenter);
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
    var index: number = this.selectedPartners.indexOf(partner);
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
    let params = new Array<Param>();
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
    let index: number = this.selectedEmployees.indexOf(employee);
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
    let index: number = this.selectedCompanies.indexOf(company);
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
    let selectedAdministrations: Array<Administration> = null;

    this.administrationListModal.show();
    this.administrationList.selectedItems = this.selectedAdministrations;
    this.administrationList.refresh(null);
  }

  public removeFromAdministrationSelection(administration: Administration) {
    let index: number = this.selectedAdministrations.indexOf(administration);
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
      this.orderHttpService
        .deleteAsset(this.selectedOrders[0].id)
        .subscribe((res) => {});
    }

    this.checkForRefresh();
  }

  public refreshAssets() {
    let params: Array<Param> = this.getFilters();

    // if (this.depView) this.requestAssetDepDetailRefreshEvent.emit(params);
    // if (this.invView) this.requestAssetInvDetailRefreshEvent.emit(params);
    setTimeout(() => {
      if(this.orderList != undefined){
        this.orderList.refresh(params);
      }
    }, 200);

    setTimeout(() => {
      if(this.requestBudgetForecastList != undefined){
        this.requestBudgetForecastList.refresh(params);
      }
    }, 400);

    setTimeout(() => {
      if(this.requestBudgetForecastMaterialList != undefined){
        this.requestBudgetForecastMaterialList.refresh(params);
      }
    }, 600);
    // this.assetRecoList.refresh(params);
  }

  public getFilters(): Array<Param> {
    let params = new Array<Param>();
    let budgetFilter: OrderFilter = new OrderFilter();

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

    //params.push(new Param('pageSize', this.pageSize.toString()));
    params.push(new Param('jsonFilter', JSON.stringify(budgetFilter)));
    return params;
  }

  public exportSocgen() {
    this.showExportBtn = false;
    let params: Array<Param> = null;

    params = this.getFilters();
    this.orderHttpService.export(params).subscribe((blob) => {
      fileSaveAs(blob, 'Export.xlsx');
      this.showExportBtn = true;
    });
  }

  public onProcessLevel1() {
    this.mainViewMode = AssetManageMainViewMode.Validate1;
    // this.confirmationMessage = 'Validati operatia selectata?';
    // this.confirmationModal.show();

    this.dialogService
    .confirmDialog({
      title: 'Confirm Action',
      message: 'Validati operatia selectata?',
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

public onProcessLevel2() {
    this.mainViewMode = AssetManageMainViewMode.Validate2;
    // this.confirmationMessage = 'Validati operatia selectata?';
    // this.confirmationModal.show();

    this.dialogService
    .confirmDialog({
      title: 'Confirm Action',
      message: 'Validati operatia selectata?',
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

public onProcessLevel3() {
    this.mainViewMode = AssetManageMainViewMode.Validate3;
    // this.confirmationMessage = 'Validati operatia selectata?';
    // this.confirmationModal.show();

    this.dialogService
    .confirmDialog({
      title: 'Confirm Action',
      message: 'Validati operatia selectata?',
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

public onProcessLevel4() {
    this.mainViewMode = AssetManageMainViewMode.Validate4;
    // this.confirmationMessage = 'Validati operatia selectata?';
    // this.confirmationModal.show();

    this.dialogService
    .confirmDialog({
      title: 'Confirm Action',
      message: 'Validati operatia selectata?',
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

public onProcessS1() {
  this.mainViewMode = AssetManageMainViewMode.ValidateS1;
  // this.confirmationMessage = 'Validati operatia selectata?';
  // this.confirmationModal.show();

  this.dialogService
  .confirmDialog({
    title: 'Confirm Action',
    message: 'Validati operatia selectata?',
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

public onProcessS2() {
  this.mainViewMode = AssetManageMainViewMode.ValidateS2;
  // this.confirmationMessage = 'Validati operatia selectata?';
  // this.confirmationModal.show();

  this.dialogService
  .confirmDialog({
    title: 'Confirm Action',
    message: 'Validati operatia selectata?',
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

public onProcessS3() {
  this.mainViewMode = AssetManageMainViewMode.ValidateS3;
  // this.confirmationMessage = 'Validati operatia selectata?';
  // this.confirmationModal.show();

  this.dialogService
  .confirmDialog({
    title: 'Confirm Action',
    message: 'Validati operatia selectata?',
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

public onProcessB1() {
  this.mainViewMode = AssetManageMainViewMode.ValidateB1;
  // this.confirmationMessage = 'Validati operatia selectata?';
  // this.confirmationModal.show();

  this.dialogService
    .confirmDialog({
      title: 'Confirm Action',
      message: 'Validati operatia selectata?',
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

public onValidate() {
  switch (this.selectedOrders[0].appStateId) {
    case 86:
      this.mainViewMode = AssetManageMainViewMode.ValidateB1;;
      break;
    case 12:
      this.mainViewMode = AssetManageMainViewMode.Validate1;
      break;
    case 13:
      this.mainViewMode = AssetManageMainViewMode.Validate2;
      break;
    case 14:
      this.mainViewMode = AssetManageMainViewMode.Validate3;
      break;
    case 15:
      this.mainViewMode = AssetManageMainViewMode.Validate4;
      break;
    case 57:
      this.mainViewMode = AssetManageMainViewMode.ValidateS1;
      break;
    case 58:
      this.mainViewMode = AssetManageMainViewMode.ValidateS2;
      break;
    case 59:
      this.mainViewMode = AssetManageMainViewMode.ValidateS3;
      break;
    default:
        break;
  }
  this.dialogService
    .confirmDialog({
      title: 'Confirm Action',
      message: 'Validati operatia selectata?',
      confirmCaption: 'Da',
      cancelCaption: 'Nu',
    })
    .subscribe((confirmed) => {
      if (confirmed) {
        this.onConfirmationApproved();
      }
    });
}

public onProcessNeedContract() {
  this.mainViewMode = AssetManageMainViewMode.ValidateNeedContract;
  // this.confirmationMessage = 'Validati operatia selectata?';
  // this.confirmationModal.show();

  this.dialogService
    .confirmDialog({
      title: 'Confirm Action',
      message: 'Aprobati comanda cu lipsa contract selectata?',
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






public onProcessPreAmount1() {
  this.mainViewMode = AssetManageMainViewMode.ValidatePreAmount1;
  this.confirmationMessage = 'Validati operatia selectata?';
  this.confirmationModal.show();
}

public onProcessPreAmount2() {
  this.mainViewMode = AssetManageMainViewMode.ValidatePreAmount2;
  this.confirmationMessage = 'Validati operatia selectata?';
  this.confirmationModal.show();
}

// public onProcessNeedContract() {
//   this.mainViewMode = AssetManageMainViewMode.ValidateNeedContract;
//   this.confirmationMessage = 'Aprobati comanda cu lipsa contract selectata?';
//   this.confirmationModal.show();
// }

public onConfirmationApproved() {

  switch (this.mainViewMode) {
      case AssetManageMainViewMode.Validate1:
          this.processLevel();
          break;
      case AssetManageMainViewMode.Validate2:
          this.processLevel();
          break;
      case AssetManageMainViewMode.Validate3:
          this.processLevel();
          break;
      case AssetManageMainViewMode.Validate4:
          this.processLevel();
          break;
      case AssetManageMainViewMode.ValidateS1:
            this.processLevel();
            break;
      case AssetManageMainViewMode.ValidateS2:
            this.processLevel();
            break;
      case AssetManageMainViewMode.ValidateS3:
            this.processLevel();
            break;
      case AssetManageMainViewMode.ValidateB1:
        this.processLevel();
        break;
      case AssetManageMainViewMode.ValidatePreAmount1:
        this.processPreAmount1();
        break;
      case AssetManageMainViewMode.ValidatePreAmount2:
        this.processPreAmount2();
        break;
        case AssetManageMainViewMode.ValidateNeedContract:
        this.processNeedContract();
        break;
      default:
          break;
  }

  this.mainViewMode = AssetManageViewMode.AssetList;
  this.confirmationModal.hide();
}

public onConfirmationCanceled() {
  this.mainViewMode = AssetManageViewMode.AssetList;
  this.confirmationModal.hide();
}

public processLevel()
{
  let isValid = true;
  this.selectedOrders.forEach( item => {
    if (item.appStateId === 1)
    {
      isValid = false;
      alert('Oferta ' + item.name + ' a fost aprobata deja!');
      return;
    }
    else
    {
      if (this.selectedBudgetIds.indexOf(item.id)  === -1) 
      {
        this.selectedBudgetIds.push(item.id);
        isValid = true;
      }  
    }
  });

  if (isValid) {      
    this.isSaved = false;
      this.orderHttpService.validateLevel(this.selectedBudgetIds, this.selectedOrders[0].appStateId).subscribe((result: CreateAssetSAPResult) => {
        if (result.success) {
            this.notificationService.showInfo('Operatia a fost finalizata cu success!', 'Aprobare comanda', 5000, false, 0);
            this.selectedOrders = []
            this.refreshAssets();
            setTimeout(() => {
              if(this.orderList != undefined){
                this.orderList.refresh(null);
              }
            }, 300);

            setTimeout(() => {
              if(this.orderList != undefined){
                this.requestBudgetForecastList.refresh(null);
              }
            }, 500);

            setTimeout(() => {
              if(this.orderList != undefined){
                this.requestBudgetForecastMaterialList.refresh(null);
              }
            }, 700);
            // this.orderMaterialList.refresh(null);
          this.selectedBudgetIds = new Array<number>();
        } else if (!result.success) {
            this.notificationService.showError('Motiv: ' + result.errorMessage + '!', 'Eroare salvare date', 0, false, 0);
            this.isSaved = true;
        }
    });
  }
}

public processPreAmount1() {

  let isValid = true;
  this.selectedOrders.forEach( item => {

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
      this.orderHttpService.validatePreAmount1(this.selectedBudgetIds, 6).subscribe((data) => {
          this.refreshAssets();
          this.selectedBudgetIds = new Array<number>();
      });
  }
}

public processPreAmount2() {

  let isValid = true;
  this.selectedOrders.forEach( item => {

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
      this.orderHttpService.validatePreAmount2(this.selectedBudgetIds, 6).subscribe((data) => {
          this.refreshAssets();
          this.selectedBudgetIds = new Array<number>();
      });
  }
}

public processNeedContract() {

  let isValid = true;
  this.selectedOrders.forEach( item => {
    if (this.selectedBudgetIds.indexOf(item.id) === -1) {
      this.selectedBudgetIds.push(item.id);
  }
  });

  if (isValid) {
      this.orderHttpService.validateNeedContract(this.selectedBudgetIds, 15).subscribe((data) => {
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
  const orderId = this.orderList.selectedItems.length > 0 ? this.orderList.selectedItems[0].id : 0;
  const requestBudgetForecastId = this.requestBudgetForecastList.selectedItems.length > 0 ? this.requestBudgetForecastList.selectedItems[0].id : 0;
  const dialogRef = this.dialog.open(UploadOrderModalComponent, {
    panelClass: 'centered-middle-modal', height: '80%', maxHeight: '80%', disableClose: true, width: '600px', position: { bottom: '15%', top: 'auto'},
    data: { uploadType: 'ORDER_BOOK', uploadFolder: 'ORDER', assetId: orderId, reqBFId:  requestBudgetForecastId}
  });
  dialogRef.afterClosed().subscribe(() => {
    //
  });
}

onValChange(value) {
  this.type = value;
  this.refreshAssets();
}

  doSimpleSearch($event: string) {
    this.filter = $event;
    this.checkForRefresh();
  }

  public onPoOrderEdit(item: Order) {
    let dialogRef = this.dialog.open(PoOrderEditDialogComponent, {
      panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe((item: Order) => {
      if (item !== null) this.checkForRefresh();
    });
  }

  public onExportData() {
    this.showExportBtn = false;
    let params: Array<Param> = null;

    params = this.getFilters();
    this.orderHttpService.export(params).subscribe((blob) => {
      fileSaveAs(blob.body, 'Export PO.xlsx');
      this.showExportBtn = true;
    });
  }

  public onExportDataPOStatus() {
    this.showExportBtn = false;
    let params: Array<Param> = null;

    params = this.getFilters();
    this.orderHttpService.exportStatusPO(params).subscribe((blob) => {
      fileSaveAs(blob.body, 'Export P.O. Status.xlsx');
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
  Validate4 = 8,
  ValidateS1 = 9,
  ValidateS2 = 10,
  ValidateS3 = 11,
  ValidatePreAmount1 = 12,
  ValidatePreAmount2 = 13,
  ValidateNeedContract = 14,
  ValidateB1 = 15,
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
  CostCenterList = 11
}
