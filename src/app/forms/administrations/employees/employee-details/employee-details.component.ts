import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { Param } from '../../../../model/common/param';
import {Employee} from '../../../../model/api/administration/employee';
import {CompanySelectionDialog} from '../../../assets/companies/selection/company.selection.dialog';
import {EmployeeUI} from '../../../../model/api/administration/employee-detail.ui';
import {EmployeeHttpService} from '../../../../services/http/administration/employee.http.service';
import {DialogService} from '../../../../services/dialog.service';
import {NotificationService} from '../../../../services/notification.service';
import {CostCenterHttpService} from '../../../../services/http/administration/cost-center.http.service';
import {DivisionHttpService} from '../../../../services/http/administration/division.http.service';
import {AssetComponentHttpService} from '../../../../services/http/assets/asset-component.http.service';
import {EmployeeCostCenterHttpService} from '../../../../services/http/administration/employee-cost-center.http.service';
import {EmployeeDivisionHttpService} from '../../../../services/http/administration/employee-division.http.service';
import {AssetHttpService} from '../../../../services/http/assets/asset.http.service';
import {InvStateHttpService} from '../../../../services/http/inventory/inv-state.http.service';
import {AssetComponentOpHttpService} from '../../../../services/http/assets/asset-component-op.http.service';
import {EntityFileHttpService} from '../../../../services/http/common/entity-file.http.service';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {AssetComponentList} from '../../../assets/asset-components/asset-component.list';
import {EmployeeCostCenterList} from '../../employee-cost-centers/employee-cost-center.list';
import {EmployeeDivisionList} from '../../employee-divisions/employee-division.list';
import {CostCenterListComponent} from '../../cost-centers/cost-center.list';
import {DivisionListComponent} from '../../divisions/division.list';
import {AssetEntityListComponent} from '../../../assets/assets/asset-entity.list';
import {AssetComponentOpDetailList} from '../../../assets/asset-component-ops/asset-component-op.detail.list';
import {EntityFileListComponent} from '../../../common/entity-file.list';
import {AssetTypeDropDownListComponent} from '../../../assets/asset-types/asset-type.drop-down.list';
import {DocumentTypeDropDownListComponent} from '../../../documents/document-types/document-type.drop-down.list';
import {AssetListComponent} from '../../../assets/assets/asset.list';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {CodeNameEntity} from '../../../../model/api/common/code-name-entity';
import {InvState} from '../../../../model/api/inventory/inv-state';
import {AppData} from '../../../../app-data';
import {Location as NgLocation} from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AssetComponentAdd} from '../../../../model/api/assets/asset-component-add';
import {AssetComponent} from '../../../../model/api/assets/asset-component';
import {AppUtils} from '../../../../common/app.utils';
import {EmployeeCostCenterAdd} from '../../../../model/api/assets/employee-cost-center-add';
import {CostCenter} from '../../../../model/api/administration/cost-center';
import {EmployeeDivisionAdd} from '../../../../model/api/assets/employee-division-add';
import {Division} from '../../../../model/api/administration/division';
import {AssetComponentTransferAdd} from '../../../../model/api/assets/asset-component-transfer-add';
import {AssetTransferAdd} from '../../../../model/api/assets/asset-transfer-add';
import {Asset} from '../../../../model/api/assets/asset';
import {CostCenterSelectionDialog} from '../../cost-centers/selection/cost-center.selection.dialog';
import {DivisionsSelectionDialog} from '../../divisions/selection/divisions.selection.dialog';
import { DepartmentSelectionDialog } from '../../departments/selection/department.selection.dialog';
import {EmployeeCostCenter} from '../../../../model/api/administration/employee-cost-center';
import {EmployeeDivision} from '../../../../model/api/administration/employee-division';
import { EmployeeCompanyAdd } from '../../../../model/api/assets/employee-cmpany-add';
import { Company } from '../../../../model/api/assets/company';
import { EmployeeCompanyList } from '../../employee-companies/employee-company.list';
import { CompanyHttpService } from '../../../../services/http/assets/company.http.service';
import { EmployeeCompanyHttpService } from '../../../../services/http/administration/employee-company.http.service';
import { CompanyListComponent } from '../../../assets/companies/company.list';
import { EmployeeCompany } from '../../../../model/api/administration/employee-company';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit, AfterViewInit {

  @ViewChild(TabsetComponent)
  staticTabs: TabsetComponent;
  @ViewChild('assetComponentDetailModal') public assetComponentDetailModal: ModalDirective;
  @ViewChild('assetComponentListModal') public assetComponentListModal: ModalDirective;
  @ViewChild('assetComponentList') public assetComponentList: AssetComponentList;

  @ViewChild('employeeCostCenterListModal') public employeeCostCenterListModal: ModalDirective;
  @ViewChild('employeeCostCenterList') public employeeCostCenterList: EmployeeCostCenterList;

  @ViewChild('employeeCompanyListModal') public employeeCompanyListModal: ModalDirective;
  @ViewChild('employeeCompanyList') public employeeCompanyList: EmployeeCompanyList;

  @ViewChild('employeeDivisionListModal') public employeeDivisionListModal: ModalDirective;
  @ViewChild('employeeDivisionList') public employeeDivisionList: EmployeeDivisionList;

  
  

  @ViewChild('assetComponentAddListModal') public assetComponentAddListModal: ModalDirective;
  @ViewChild('assetComponentAddList') public assetComponentAddList: AssetComponentList;

  @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;
  @ViewChild('costCenterList') public costCenterList: CostCenterListComponent;

  @ViewChild('companyListModal') public companyListModal: ModalDirective;
  @ViewChild('companyList') public companyList: CompanyListComponent;

  @ViewChild('divisionListModal') public divisionListModal: ModalDirective;
  @ViewChild('divisionList') public divisionList: DivisionListComponent;

  @ViewChild('assetComponentTransferDetailModal') public assetComponentTransferDetailModal: ModalDirective;
  @ViewChild('assetDetailModal') public assetDetailModal: ModalDirective;
  @ViewChild('assetEntityListModal') assetEntityListModal: ModalDirective;
  @ViewChild('assetEntityList') assetEntityList: AssetEntityListComponent;

  @ViewChild('assetAddListModal') public assetAddListModal: ModalDirective;
  @ViewChild('assetAddList') public assetAddList: AssetEntityListComponent;

  @ViewChild('assetComponentTransferAddListModal') public assetComponentTransferAddListModal: ModalDirective;
  @ViewChild('assetComponentTransferAddList') public assetComponentTransferAddList: AssetComponentList;

  @ViewChild('assetComponentOpDetailList') public assetComponentOpList: AssetComponentOpDetailList;
  @ViewChild('entityFileList') public entityFileList: EntityFileListComponent;

  @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
  @ViewChild('assetTypeDropDownList') public assetTypeDropDownList: AssetTypeDropDownListComponent;
  @ViewChild('documentTypeDropDownList') public documentTypeDropDownList: DocumentTypeDropDownListComponent;
  @ViewChild('fileInput') fileInput;

  @ViewChild('assetList') public assetList: AssetListComponent;

  public employeeId: number = 0;
  public employee: Employee;
  public employeeUI: EmployeeUI = new EmployeeUI();
  public selectedAssetComponent: any;
  public selectedEmployeeCostCenter: any;
  public selectedEmployeeCompany: any;
  public selectedEmployeeDivision: any;
  public selectedEmployeeStorage: any;
  public selectedAsset: any;
  public selectedAssetComponentOp: any;
  public assetComponent: CodeNameEntity = null;
  public costCenter: CodeNameEntity = null;
  public company: CodeNameEntity = null;
  public department: CodeNameEntity = null;
  public storage: CodeNameEntity = null;
  public asset: CodeNameEntity = null;
  public assetComponentTransfer: CodeNameEntity = null;
  public operationType: OperationType = OperationType.NotSet;
  public confirmationMessage: string = '';
  public showMoveToStocksBtn = false;
  public showTransferBtn = false;
  public invStateId: number;
  public invState: string = 'Asset States';
  public invStates: Array<InvState> = new Array<InvState>();
  message = '';
  public get isAdmin(): boolean { return AppData.UserIsAdmin; }

  constructor(
    public ngLocation: NgLocation,
    public route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public employeeHttpService: EmployeeHttpService,
    public costCenterHttpService: CostCenterHttpService,
    public companyHttpService: CompanyHttpService,
    public divisionHttpService: DivisionHttpService,
    
    public assetComponentHttpService: AssetComponentHttpService,
    public employeeCostCenterHttpService: EmployeeCostCenterHttpService,
    public employeeCompanyHttpService: EmployeeCompanyHttpService,
    public employeeDivisionHttpService: EmployeeDivisionHttpService,
    
    public assetHttpService: AssetHttpService,
    public invStateHttpService: InvStateHttpService,
    public assetComponentOpHttpService: AssetComponentOpHttpService,
    public entityFileHttpService: EntityFileHttpService,
    public dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data && data.employee) {
      this.employee = data.employee;
      this.employeeId = data.employee?.id;
    }

    // this.route.params.subscribe((params: Params) => {
    //   if (params['id']) {
    //     // let id: number = +params['id'];
    //     this.employeeId = +params['id'];
    //   }
    // });
  }
  ngOnInit(): void {
    // this.staticTabs.tabs[2].active = true;
  }

  ngAfterViewInit() {
    if (this.employeeId > 0) {
      this.employeeHttpService.getDetailById(this.employeeId)
        .subscribe((employeeUI: EmployeeUI) => {
          this.updateDetails(employeeUI);
          this.refreshAssets();
          // this.refreshAssetComponents();
          // this.refreshAssetComponentOperations();
          this.refreshEmployeeCompanies();
          this.refreshEmployeeCostCenters();
          this.refreshEmployeeDivisions();
          //this.refreshEmployeeStorages();
          // this.refreshEntityFiles();
        });
    }

  }


  public updateDetails(employeeUI: EmployeeUI) {
    this.employeeUI.id = employeeUI.id;
    this.employeeUI.internalCode = employeeUI.internalCode;
    this.employeeUI.firstName = employeeUI.firstName;
    this.employeeUI.lastName = employeeUI.lastName;

  }


  public cancelChanges() {
    this.router.navigate(['/employee']);
  }

  public onAssetListSelectionChanged(assets: Array<any>) {
    this.selectedAsset = this.assetList.selectedItem;
    this.showTransferBtn = true;
  }


  public onAssetComponentListSelectionChanged(assetComponents: Array<any>) {
    this.selectedAssetComponent = this.assetComponentList.selectedItem;
    this.showMoveToStocksBtn = true;
  }

  public onEmployeeCostCenterListSelectionChanged(employeeCostCenters: Array<any>) {
    this.selectedEmployeeCostCenter = this.employeeCostCenterList.selectedItem;
  }

  public onEmployeeCompanyListSelectionChanged(employeeCostCenters: Array<any>) {
    this.selectedEmployeeCompany = this.employeeCompanyList.selectedItem;
  }

  public onEmployeeDivisionListSelectionChanged(employeeDivisions: Array<any>) {
    this.selectedEmployeeDivision = this.employeeDivisionList.selectedItem;
  }

  public onAssetComponentOpDetailListSelectionChanged(assetComponentOpDetails: Array<any>) {
    this.selectedAssetComponentOp = this.assetComponentOpList.selectedItem;
  }


  public refreshAssets(){
    let params: Array<Param> = new Array<Param>();

    params.push(new Param('employeeId', this.employeeId.toString()));
    this.assetList.refresh(params);
  }

  public refreshAssetComponents(){
    let params: Array<Param> = new Array<Param>();

    params.push(new Param('employeeId', this.employeeId.toString()));
    this.assetComponentList.refresh(params);
  }

  public refreshEmployeeCostCenters(){
    let params: Array<Param> = new Array<Param>();

    params.push(new Param('employeeIds', this.employeeId.toString()));
    this.employeeCostCenterList.refresh(params);
  }

  public refreshEmployeeCompanies(){
    let params: Array<Param> = new Array<Param>();

    params.push(new Param('employeeIds', this.employeeId.toString()));
    this.employeeCompanyList.refresh(params);
  }

  public refreshEmployeeDivisions(){
    let params: Array<Param> = new Array<Param>();

    params.push(new Param('employeeIds', this.employeeId.toString()));
    this.employeeDivisionList.refresh(params);
  }

  // public refreshEmployeeStorages(){
  //   let params: Array<Param> = new Array<Param>();

  //   params.push(new Param('employeeIds', this.employeeId.toString()));
  //   this.employeeStorageList.refresh(params);
  // }

  public refreshAssetComponentOperations(){
    let params: Array<Param> = new Array<Param>();

    params.push(new Param('employeeId', this.employeeId.toString()));
    this.assetComponentOpList.refresh(params);

  }

  public refreshEntityFiles(){
    let params: Array<Param> = new Array<Param>();

    params.push(new Param('entityTypeCode', 'ASSETCOMPONENT'));
    params.push(new Param('entityId', this.employeeId.toString()));

    this.entityFileList.refresh(params);
  }

  /* ASSET COMPONENT */

  public selectAssetComponent() {
    this.assetComponentAddList.refresh(null);
    this.assetComponentAddListModal.show();
  }


  public setSelectedAssetComponent() {

    let items: Array<any> = this.assetComponentAddList.selectedItems;
    this.assetComponent = ((items != null) && (items.length === 1)) ? items[0] : null;
    this.assetComponentAddListModal.hide();

    let aIds: number[] = new Array<number>();
    let assetComponentsIds: AssetComponentAdd = new AssetComponentAdd();
    items.forEach(item => {
      // aIds.indexOf(item.id) !== -1 ? aIds.push(item.id) : '';
      let index: number = aIds.indexOf(item.id);
      if (index < 0) aIds.push(item.id);
    });

    assetComponentsIds.assetComponentIds = aIds;
    assetComponentsIds.employeeId = this.employeeId;

    this.assetComponentHttpService.addAssetComponentByEmployee(assetComponentsIds).subscribe( (res) => {
      if (res.statusCode === 200) {
        alert('Datele au fost salvate cu success!');
        this.assetComponentList.refresh(null);
        this.assetComponentOpList.refresh(null);
        this.assetComponentAddList.selectedItems = new Array<AssetComponent>();
      } else if (res.statusCode === 404) {
        alert('Accesorul nu exista!');
        this.assetComponentAddList.selectedItems = new Array<AssetComponent>();
      }
    }, (error) => {
      alert('Save error!!');
      this.assetComponentAddList.selectedItems = new Array<AssetComponent>();
    });



  }

  public assetComponentAdded(assetComponent: AssetComponent) {
    this.assetComponent = assetComponent;
    this.assetComponentDetailModal.hide();
  }
  public assetComponentAddCanceled() {
    this.assetComponentDetailModal.hide();
  }

  public closeAssetComponent() {
    this.assetComponentAddList.selectedItems = new Array<AssetComponent>();
    this.assetComponentAddListModal.hide();
  }

  /* ASSET COMPONENT */

  /* COSTCENTER */

  public get costCenterParams(): Array<Param> {
    let params:Array<Param> = Array<Param>();
    params.push(new Param('exceptCostCenterIds', AppUtils.getIdsList<CodeNameEntity, number>(this.selectedCostCenters())));

    return params;
  }

  public selectCostCenter() {
    // this.costCenterListModal.show();
    let params:Array<Param> = Array<Param>();
    params.push(new Param('exceptCostCenterIds', AppUtils.getIdsList<CodeNameEntity, number>(this.selectedCostCenters())));
    // console.log(JSON.stringify(params));
    this.costCenterList.refresh(params);
  }

  public onCostCenterMap() {
    let dialogRef = this.dialog.open(CostCenterSelectionDialog, { panelClass: 'centered-middle-modal', width: '80%', maxWidth: '90%', maxHeight: '80%', height: 'auto', position: {top: '10em'},
      data: {params: this.costCenterParams}
    });

    dialogRef.afterClosed().subscribe((items: any) => {
      console.log(items);
      this.setSelectedCostCenter(items);
    });
  }

  private selectedCostCenters(): Array<CodeNameEntity> {
    let mappedCostCenters: Array<CodeNameEntity> = new Array<CodeNameEntity>();

    if(this.employeeCostCenterList.items.length > 0) {
      this.employeeCostCenterList.items.forEach(element => {
        mappedCostCenters.push(element.costCenter);
      });
    }

    return mappedCostCenters;
  }


  public setSelectedCostCenter(value) {

    // let items: Array<any> = this.costCenterList.selectedItems;
    let items: Array<any> = value;
    this.costCenter = ((items != null) && (items.length === 1)) ? items[0] : null;
    // this.costCenterListModal.hide();

    let aIds: number[] = new Array<number>();
    let costCentersIds: EmployeeCostCenterAdd = new EmployeeCostCenterAdd();
    items.forEach(item => {
      // aIds.indexOf(item.id) !== -1 ? aIds.push(item.id) : '';
      let index: number = aIds.indexOf(item.id);
      if (index < 0) aIds.push(item.id);
    });

    costCentersIds.costCenterIds = aIds;
    costCentersIds.employeeId = this.employeeId;

    this.employeeCostCenterHttpService.addCostCenterByEmployee(costCentersIds).subscribe( (res) => {
      if (res.statusCode === 200) {
        this.notificationService.showSuccess('Datele au fost salvate cu success!', 'Adauga mapare CC', 2000, false, 0);
        this.costCenterList.refresh(null);
        this.employeeCostCenterList.refresh(null);
        this.costCenterList.selectedItems = new Array<CostCenter>();
      } else if (res.statusCode === 404) {
        this.notificationService.showError('Nu exista', 'Adauga mapare CC', 0, false, 0);
        this.costCenterList.selectedItems = new Array<CostCenter>();
      }
    }, (error) => {
      this.notificationService.showError('Eroare salvare!', 'Adauga mapare CC', 0, false, 0);
      this.costCenterList.selectedItems = new Array<CostCenter>();
    });



  }

  public closeCostCenter() {
    this.costCenterList.selectedItems = new Array<CostCenter>();
    this.costCenterListModal.hide();
  }

  /* COSTCENTER */

  /* COMPANY */

  public get companyParams(): Array<Param> {
    let params:Array<Param> = Array<Param>();
    params.push(new Param('exceptCompanyIds', AppUtils.getIdsList<CodeNameEntity, number>(this.selectedCompanies())));

    return params;
  }

  public selectCompany() {
    // this.costCenterListModal.show();
    let params:Array<Param> = Array<Param>();
    params.push(new Param('exceptCompanyIds', AppUtils.getIdsList<CodeNameEntity, number>(this.selectedCompanies())));
    // console.log(JSON.stringify(params));
    this.costCenterList.refresh(params);
  }

  public onCompanyMap() {
    let dialogRef = this.dialog.open(CompanySelectionDialog, { panelClass: 'centered-middle-modal', width: '80%', maxWidth: '90%', maxHeight: '80%', height: 'auto', position: {top: '10em'},
      data: {params: this.companyParams}
    });

    dialogRef.afterClosed().subscribe((items: any) => {
      console.log(items);
      this.setSelectedCompany(items);
    });
  }

  private selectedCompanies(): Array<CodeNameEntity> {
    let mappedCompanies: Array<CodeNameEntity> = new Array<CodeNameEntity>();

    if(this.employeeCompanyList.items.length > 0) {
      this.employeeCompanyList.items.forEach(element => {
        mappedCompanies.push(element.company);
      });
    }

    return mappedCompanies;
  }


  public setSelectedCompany(value) {

    // let items: Array<any> = this.costCenterList.selectedItems;
    let items: Array<any> = value;
    this.company = ((items != null) && (items.length === 1)) ? items[0] : null;
    // this.costCenterListModal.hide();

    let aIds: number[] = new Array<number>();
    let companiesIds: EmployeeCompanyAdd = new EmployeeCompanyAdd();
    items.forEach(item => {
      // aIds.indexOf(item.id) !== -1 ? aIds.push(item.id) : '';
      let index: number = aIds.indexOf(item.id);
      if (index < 0) aIds.push(item.id);
    });

    companiesIds.companyIds = aIds;
    companiesIds.employeeId = this.employeeId;

    this.employeeCompanyHttpService.addCompanyByEmployee(companiesIds).subscribe( (res) => {
      if (res.statusCode === 200) {
        this.notificationService.showSuccess('Datele au fost salvate cu success!', 'Adauga mapare companie', 2000, false, 0);
        this.companyList.refresh(null);
        this.employeeCompanyList.refresh(null);
        this.companyList.selectedItems = new Array<Company>();
      } else if (res.statusCode === 404) {
        this.notificationService.showError('Nu exista', 'Adauga mapare companie', 0, false, 0);
        this.companyList.selectedItems = new Array<Company>();
      }
    }, (error) => {
      this.notificationService.showError('Eroare salvare!', 'Adauga mapare companie', 0, false, 0);
      this.companyList.selectedItems = new Array<Company>();
    });



  }

  public closeCompany() {
    this.companyList.selectedItems = new Array<Company>();
    this.companyListModal.hide();
  }

  /* COMPANY */


  /* DIVISION */

  public onDepartmentMap() {
    let dialogRef = this.dialog.open(DepartmentSelectionDialog, { panelClass: 'centered-middle-modal', width: '80%', maxWidth: '90%', maxHeight: '80%', height: 'auto', position: {top: '10em'},
      data: {params: this.divisionParams}
    });

    dialogRef.afterClosed().subscribe((items: any) => {
      this.setSelectedDepartment(items);
    });
  }

  public get divisionParams(): Array<Param> {
    let params:Array<Param> = Array<Param>();
    params.push(new Param('exceptDivisionIds', AppUtils.getIdsList<CodeNameEntity, number>(this.selectedDivisions())));

    return params;
  }

  public selectDivision() {
    this.divisionListModal.show();
    let params:Array<Param> = Array<Param>();
    params.push(new Param('exceptDivisionIds', AppUtils.getIdsList<CodeNameEntity, number>(this.selectedDivisions())));
    // console.log(JSON.stringify(params));
    this.divisionList.refresh(params);

  }

  private selectedDivisions(): Array<CodeNameEntity> {
    let mappedDivisions: Array<CodeNameEntity> = new Array<CodeNameEntity>();

    if(this.employeeDivisionList.items.length > 0) {
      this.employeeDivisionList.items.forEach(element => {
        mappedDivisions.push(element.division);
      });
    }

    return mappedDivisions;
  }


  public setSelectedDepartment(value) {
    // let items: Array<any> = this.divisionList.selectedItems;
    let items: Array<any> = value;
    this.department = ((items != null) && (items.length === 1)) ? items[0] : null;
    // this.divisionListModal.hide();

    let aIds: number[] = new Array<number>();
    let depIds: number[] = new Array<number>();
    let divisionsIds: EmployeeDivisionAdd = new EmployeeDivisionAdd();
    items.forEach(item => {
      // aIds.indexOf(item.id) !== -1 ? aIds.push(item.id) : '';
      let index: number = aIds.indexOf(item.id);
      if (index < 0) {
        aIds.push(item.id);
        depIds.push(item.id);
      }
    });
   
    divisionsIds.divisionIds = aIds;
    divisionsIds.employeeId = this.employeeId;
    divisionsIds.departmentIds =  depIds;
    const filters = new Array<Param>;
    this.employeeDivisionHttpService.addDivisionByEmployee(divisionsIds).subscribe( (res) => {
      this.employeeDivisionList.refresh(filters);
      this.employeeCostCenterList.refresh(null);
      if (res.statusCode === 200) {
        this.notificationService.showSuccess('Datele au fost salvate cu success!', 'Adauga mapare B.U', 2000, false, 0);
        this.divisionList.refresh(null);
        this.employeeDivisionList.refresh(null);
        this.divisionList.selectedItems = new Array<Division>();
      } else if (res.statusCode === 404) {
        this.notificationService.showError('Nu exista', 'Adauga mapare B.U', 0, false, 0);
        this.divisionList.selectedItems = new Array<Division>();
      }
    }, (error) => {
      this.notificationService.showError('Eroare salvare!', 'Adauga mapare B.U', 0, false, 0);
      this.divisionList.selectedItems = new Array<Division>();
    });

  }

  public closeDivision() {
    this.divisionList.selectedItems = new Array<Division>();
    this.divisionListModal.hide();
  }

  /* DIVISION */

  /* STORAGE */

  // public get storageParams(): Array<Param> {
  //   let params: Array<Param> = Array<Param>();
  //   params.push(new Param('exceptStorageIds', AppUtils.getIdsList<CodeNameEntity, number>(this.selectedStorages())));

  //   return params;
  // }

  // public onStorageMap() {
  //   let dialogRef = this.dialog.open(StorageSelectionDialog, { panelClass: 'centered-middle-modal', width: '80%', maxWidth: '90%', maxHeight: '80%', height: 'auto', position: {top: '10em'},
  //     data: {params: this.storageParams}
  //   });

  //   dialogRef.afterClosed().subscribe((items: any) => {
  //     this.setSelectedStorage(items);
  //   });
  // }

  // public selectStorage() {
  //   this.storageListModal.show();
  //   let params:Array<Param> = Array<Param>();
  //   params.push(new Param('exceptStorageIds', AppUtils.getIdsList<CodeNameEntity, number>(this.selectedStorages())));
  //   // console.log(JSON.stringify(params));
  //   this.storageList.refresh(params);

  // }

  // private selectedStorages(): Array<CodeNameEntity> {
  //   let mappedStorages: Array<CodeNameEntity> = new Array<CodeNameEntity>();

  //   if(this.employeeStorageList.items.length > 0) {
  //     this.employeeStorageList.items.forEach(element => {
  //       mappedStorages.push(element.storage);
  //     });
  //   }

  //   return mappedStorages;
  // }


  // public setSelectedStorage(value) {

  //   // let items: Array<any> = this.storageList.selectedItems;
  //   let items: Array<any> = value;
  //   this.storage = ((items != null) && (items.length === 1)) ? items[0] : null;
  //   // this.storageListModal.hide();

  //   let aIds: number[] = new Array<number>();
  //   // let empStoragesIds: EmployeeStorageAdd = new EmployeeStorageAdd();
  //   items.forEach(item => {
  //     // aIds.indexOf(item.id) !== -1 ? aIds.push(item.id) : '';
  //     let index: number = aIds.indexOf(item.id);
  //     if (index < 0) aIds.push(item.id);
  //   });

  //   empStoragesIds.storageIds = aIds;
  //   empStoragesIds.employeeId = this.employeeId;

  //   this.employeeStorageHttpService.addStorageByEmployee(empStoragesIds).subscribe( (res) => {
  //     if (res.statusCode === 200) {
  //       this.notificationService.showSuccess('Datele au fost salvate cu success!', 'Adauga mapare Storage', 2000, false, 0);
  //       this.storageList.refresh(null);
  //       this.employeeStorageList.refresh(null);
  //       this.storageList.selectedItems = new Array<Storage>();
  //     } else if (res.statusCode === 404) {
  //       this.notificationService.showError('Nu exista', 'Adauga mapare Storage', 0, false, 0);
  //       this.storageList.selectedItems = new Array<Storage>();
  //     }
  //   }, (error) => {
  //     this.notificationService.showError('Eroare salvare!', 'Adauga mapare Storage', 0, false, 0);
  //     this.storageList.selectedItems = new Array<Storage>();
  //   });



  // }

  // public closeStorage() {
  //   this.storageList.selectedItems = new Array<Storage>();
  //   this.storageListModal.hide();
  // }

  /* STORAGE */

  /* ASSET COMPONENT TRANSFER */

  public selectAssetComponentTransfer() {
    this.assetComponentTransferAddList.refresh(null);
    this.assetComponentTransferAddListModal.show();
    this.invStateHttpService.get(0, 0, null, null, null).subscribe((res: any) => { this.invStates = res; });
  }


  public setSelectedAssetComponentTransfer() {

    let items: Array<any> = this.assetComponentTransferAddList.selectedItems;
    let itemSelected: Array<any> = this.assetComponentList.selectedItems;
    this.assetComponentTransfer = ((items != null) && (items.length === 1)) ? items[0] : null;
    this.assetComponentTransferAddListModal.hide();

    let aOldIds: number[] = new Array<number>();
    let aNewIds: number[] = new Array<number>();
    let assetsIds: AssetComponentTransferAdd = new AssetComponentTransferAdd();
    items.forEach(item => {
      // aIds.indexOf(item.id) !== -1 ? aIds.push(item.id) : '';
      let index: number = aNewIds.indexOf(item.id);
      if (index < 0) aNewIds.push(item.id);
    });

    itemSelected.forEach(item => {
      // aIds.indexOf(item.id) !== -1 ? aIds.push(item.id) : '';
      let index: number = aOldIds.indexOf(item.id);
      if (index < 0) aOldIds.push(item.id);
    });

    assetsIds.assetComponentOldIds = aOldIds;
    assetsIds.assetComponentNewIds = aNewIds;
    assetsIds.employeeId = this.employeeId;
    assetsIds.invStateId = this.invStateId;

    this.assetComponentHttpService.addAssetByEmployee(assetsIds).subscribe( (res) => {
      if (res.statusCode === 200) {
        alert('Datele au fost salvate cu success!');
        this.assetComponentList.refresh(null);
        this.assetComponentOpList.refresh(null);
        this.assetComponentTransferAddList.selectedItems = new Array<AssetComponent>();
      } else if (res.statusCode === 404) {
        alert('Accesorul nu exista!');
        this.assetComponentTransferAddList.selectedItems = new Array<AssetComponent>();
      }
    }, (error) => {
      alert('Save error!!');
      this.assetComponentTransferAddList.selectedItems = new Array<AssetComponent>();
    });
  }
  public assetComponentTransferAddCanceled() {
    this.assetComponentTransferDetailModal.hide();
  }

  public closeAssetComponentTransfer() {
    this.assetComponentTransferAddList.selectedItems = new Array<AssetComponent>();
    this.assetComponentTransferAddListModal.hide();
  }

  /* ASSET COMPONENT TRANSFER */


  /* ASSET */

  public selectAsset() {
    this.assetAddList.refresh(null);
    this.assetAddListModal.show();
    this.invStateHttpService.get(0, 0, null, null, null).subscribe((res: any) => { this.invStates = res; });
  }


  public setSelectedAsset() {

    let items: Array<any> = this.assetAddList.selectedItems;
    let itemSelected: Array<any> = this.assetList.selectedItems;
    this.asset = ((items != null) && (items.length === 1)) ? items[0] : null;
    this.assetAddListModal.hide();

    let aOldIds: number[] = new Array<number>();
    let aNewIds: number[] = new Array<number>();
    let assetsIds: AssetTransferAdd = new AssetTransferAdd();
    items.forEach(item => {
      // aIds.indexOf(item.id) !== -1 ? aIds.push(item.id) : '';
      let index: number = aOldIds.indexOf(item.id);
      if (index < 0) aOldIds.push(item.id);
    });

    itemSelected.forEach(item => {
      // aIds.indexOf(item.id) !== -1 ? aIds.push(item.id) : '';
      let index: number = aNewIds.indexOf(item.id);
      if (index < 0) aNewIds.push(item.id);
    });

    assetsIds.assetOldIds = aOldIds;
    assetsIds.assetNewIds = aNewIds;
    assetsIds.employeeId = this.employeeId;
    assetsIds.invStateId = this.invStateId;

    this.assetHttpService.addAssetByEmployee(assetsIds).subscribe( (res) => {
      if (res.statusCode === 200) {
        alert('Datele au fost salvate cu success!');
        this.assetList.refresh(null);
        this.assetComponentOpList.refresh(null);
        this.assetAddList.selectedItems = new Array<Asset>();
      } else if (res.statusCode === 404) {
        alert('Accesorul nu exista!');
        this.assetAddList.selectedItems = new Array<Asset>();
      }
    }, (error) => {
      alert('Save error!!');
      this.assetAddList.selectedItems = new Array<Asset>();
    });



  }

  public assetAddCanceled() {
    this.assetDetailModal.hide();
  }

  public closeAsset() {
    this.assetAddList.selectedItems = new Array<Asset>();
    this.assetAddListModal.hide();
  }

  /* ASSET */

  public onDeleteEmployeeCostCenter() {
    this.operationType = OperationType.DeleteEmployeeCostCenter;
    this.confirmationMessage = 'Esti sigur?';
    this.confirmationModal.show();
  }

  public onDeleteEmployeeDivision() {
    this.operationType = OperationType.DeleteEmployeeDivision;
    this.confirmationMessage = 'Esti sigur?';
    this.confirmationModal.show();
  }

  public onDeleteEmployeeStorage() {
    this.operationType = OperationType.DeleteEmployeeStorage;
    this.confirmationMessage = 'Esti sigur?';
    this.confirmationModal.show();
  }

  public onDeleteAssetComponent() {
    this.operationType = OperationType.DeleteAssetComponent;
    this.confirmationMessage = 'Are you sure?';
    this.confirmationModal.show();
  }

  public onDeleteAssetComponentOp() {
    this.operationType = OperationType.DeleteAssetComponentOp;
    this.confirmationMessage = 'Stergeti operatia selectata?';
    this.confirmationModal.show();
  }

  public deleteAssetComponent() {
    this.assetComponentHttpService.deleteAssetComponent(this.assetComponentList.selectedItem.id)
      .subscribe((res) => {
        if (res.statusCode === 200) {
          alert('The operation was completed successfully!');
          this.assetComponentOpList.refresh(null);
          this.assetComponentList.refresh(null);
        } else if (res.statusCode === 404) {
          alert('Save error!');
        }
      }, (error) => {
        alert('Server error!!');
      });
  }

  public deleteEmployeeCostCenter() {
    this.employeeCostCenterHttpService.deleteEmployeeCostCenter(this.employeeCostCenterList.selectedItem.id)
      .subscribe((res) => {
        if (res.statusCode === 200) {
          this.notificationService.showSuccess('Operatia a fost finalizata cu success!', 'Stergere mapare CC', 2000, false, 0);
          this.employeeCostCenterList.refresh(null);
        } else if (res.statusCode === 404) {
          this.notificationService.showError('Eroare salvare', 'Stergere mapare CC', 0, false, 0);
        }
      }, (error) => {
        this.notificationService.showError('Eroare server', 'Stergere mapare CC', 0, false, 0);
      });
  }

  public deleteEmployeeDivision() {
    this.employeeDivisionHttpService.deleteEmployeeDivision(this.employeeDivisionList.selectedItem.id)
      .subscribe((res) => {
        if (res.statusCode === 200) {
          this.notificationService.showSuccess('Operatia a fost finalizata cu success!', 'Stergere mapare Departament', 0, false, 0);
          this.employeeDivisionList.refresh(null);
        } else if (res.statusCode === 404) {
          this.notificationService.showError('Eroare salvare', 'Stergere mapare Departament', 0, false, 0);
        }
      }, (error) => {
        this.notificationService.showError('Eroare server', 'Stergere mapare Departament', 0, false, 0);
      });
  }

  // public deleteEmployeeStorage() {
  //   this.employeeStorageHttpService.deleteEmployeeStorage(this.employeeStorageList.selectedItem.id)
  //     .subscribe((res) => {
  //       if (res.statusCode === 200) {
  //         this.notificationService.showSuccess('Operatia a fost finalizata cu success!', 'Stergere mapare Storage', 0, false, 0);
  //         this.employeeStorageList.refresh(null);
  //       } else if (res.statusCode === 404) {
  //         this.notificationService.showError('Eroare salvare', 'Stergere mapare Storage', 0, false, 0);
  //       }
  //     }, (error) => {
  //       this.notificationService.showError('Eroare server', 'Stergere mapare Storage', 0, false, 0);
  //     });
  // }

  public deleteAssetComponentOp() {
    this.assetComponentOpHttpService.deleteAssetComponentOp(this.assetComponentOpList.selectedItem.id)
      .subscribe((res) => {
        if (res.statusCode === 200) {
          alert('The operation was completed successfully!');
          this.assetComponentOpList.refresh(null);
          this.assetComponentList.refresh(null);
        } else if (res.statusCode === 404) {
          alert('Save error!');
        }
      }, (error) => {
        alert('Server error!!');
      });
  }

  public onConfirmationApproved() {

    switch (this.operationType) {
      case OperationType.DeleteAssetComponent:
        this.deleteAssetComponent();
        break;
      case OperationType.DeleteEmployeeCostCenter:
        this.deleteEmployeeCostCenter();
        break;
      case OperationType.DeleteEmployeeDivision:
        this.deleteEmployeeDivision();
        break;
      // case OperationType.DeleteEmployeeStorage:
      //   this.deleteEmployeeStorage();
      //   break;
      case OperationType.DeleteAssetComponentOp:
        this.deleteAssetComponentOp();
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

  public changeTab(event){
    const tabLabel = event.textLabel;
    // if (!e.tabset){
    //     return;
    // }else{
    //     if (e.heading === 'Fisiere' || e.heading === 'Eticheta') {
    //         this.showDeleteScan = false;
    //     }else{
    //         this.showDeleteScan = true;
    //     }
    // }

    if (tabLabel === 'Active') {
      this.showMoveToStocksBtn = false;
      if (this.assetList.selectedItems.length > 0) {
        this.showTransferBtn = true;
      }
    } else if (tabLabel === 'Accesorii') {
      this.showTransferBtn = false;
      if (this.assetComponentList.selectedItems.length > 0) {
        this.showMoveToStocksBtn = true;
      }
    }  else if (tabLabel === 'Operatii') {
      this.showMoveToStocksBtn = false;
      this.showTransferBtn = false;
    }
  }

  public sendEmail() {
    this.employeeHttpService.sendEmail(this.employeeId) .subscribe((res) => {
      if (res === true) {
        alert('Mailul a fost trimis cu success!');
      } else if (res === false) {
        alert('Eroare trimitere mail');
      }
    }, (error) => {
      alert('Server error!!');
    });
  }

  public sendBookEmail() {
    this.employeeHttpService.sendBookEmail(this.employeeId) .subscribe((res) => {
      if (res === true) {
        alert('Mailul a fost trimis cu success!');
      } else if (res === false) {
        alert('Eroare trimitere mail');
      }
    }, (error) => {
      alert('Server error!!');
    });
  }

  public sendITBookEmail() {
    this.employeeHttpService.sendITBookEmail(this.employeeId) .subscribe((res) => {
      if (res === true) {
        alert('Mailul a fost trimis cu success!');
      } else if (res === false) {
        alert('Eroare trimitere mail');
      }
    }, (error) => {
      alert('Server error!!');
    });
  }

  public sendBookEmailPreview() {
    this.employeeHttpService.sendBookEmailPreview(this.employeeId).subscribe((res) => {
      this.message = res;
    }, (error) => {
      alert('Server error!!');
    });
  }

  public onInvStateUpdate(invStateId: number, invStateName: string) {
    this.invStateId = invStateId;
    this.invState = invStateName ;
  }

  // onItemStorageDelete(item: EmployeeStorage) {
  //   console.log(item);
  //   this.dialogService
  //     .confirmDialog({
  //       title: 'Confirm Action',
  //       message: 'Do you want to confirm this action?',
  //       confirmCaption: 'Confirm',
  //       cancelCaption: 'Cancel',
  //     })
  //     .subscribe((confirmed: any) => {
  //       if (confirmed) {
  //         this.deleteStorageItem(item);
  //         // this.notificationSvc.success('Asset successfully deleted.');
  //       }
  //     });
  // }

  // public deleteStorageItem(item: EmployeeStorage) {
  //   const filters = new Array<Param>;

  //   this.employeeStorageHttpService.deleteEmployeeStorage(item.id!).subscribe(() => {
  //     this.employeeStorageList.refresh(filters);
  //   });
  // }

  onItemCostCenterDelete(item: EmployeeCostCenter) {
    this.dialogService
      .confirmDialog({
        title: 'Confirm Action',
        message: 'Do you want to confirm this action?',
        confirmCaption: 'Confirm',
        cancelCaption: 'Cancel',
      })
      .subscribe((confirmed: any) => {
        if (confirmed) {
          this.deleteCostCenterItem(item);
          // this.notificationSvc.success('Asset successfully deleted.');
        }
      });
  }

  public deleteCostCenterItem(item: EmployeeCostCenter) {
    const filters = new Array<Param>;

    this.employeeCostCenterHttpService.deleteEmployeeCostCenter(item.id!).subscribe(() => {
      this.employeeCostCenterList.refresh(filters);
    });
  }

  onItemCompanyDelete(item: EmployeeCompany) {
    this.dialogService
      .confirmDialog({
        title: 'Confirm Action',
        message: 'Do you want to confirm this action?',
        confirmCaption: 'Confirm',
        cancelCaption: 'Cancel',
      })
      .subscribe((confirmed: any) => {
        if (confirmed) {
          this.deleteCompanyItem(item);
          // this.notificationSvc.success('Asset successfully deleted.');
        }
      });
  }

  public deleteCompanyItem(item: EmployeeCompany) {
    const filters = new Array<Param>;

    this.employeeCompanyHttpService.deleteEmployeeCompany(item.id!).subscribe(() => {
      this.employeeCompanyList.refresh(filters);
    });
  }

  onItemDivisionDelete(item: EmployeeDivision) {
    this.dialogService
      .confirmDialog({
        title: 'Confirm Action',
        message: 'Do you want to confirm this action?',
        confirmCaption: 'Confirm',
        cancelCaption: 'Cancel',
      })
      .subscribe((confirmed: any) => {
        if (confirmed) {
          this.deleteDivisionItem(item);
          // this.notificationSvc.success('Asset successfully deleted.');
        }
      });
  }

  public deleteDivisionItem(item: EmployeeDivision) {
    const filters = new Array<Param>;

    this.employeeDivisionHttpService.deleteEmployeeDivision(item.id!).subscribe(() => {
      this.employeeDivisionList.refresh(filters);
    });
  }
}

enum OperationType {
  NotSet = 1,
  AssetComponentalidation = 2,
  DeleteAssetComponent = 3,
  DeleteAssetComponentOp = 4,
  DeleteEmployeeCostCenter = 5,
  DeleteEmployeeDivision = 6,
  DeleteEmployeeStorage = 7
}
