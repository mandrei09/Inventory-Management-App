
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { Location as NgLocation } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AssetComponentList } from '../../assets/asset-components/asset-component.list';
import { AssetEntityListComponent } from '../../assets/assets/asset-entity.list';
import { AssetComponentOpDetailList } from '../../assets/asset-component-ops/asset-component-op.detail.list';
import { EntityFileListComponent } from '../../common/entity-file.list';
import { AssetTypeDropDownListComponent } from '../../assets/asset-types/asset-type.drop-down.list';
import { DocumentTypeDropDownListComponent } from '../../documents/document-types/document-type.drop-down.list';
import { AssetListComponent } from '../../assets/assets/asset.list';
import { EmployeeUI } from '../../../model/api/administration/employee-detail.ui';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { InvState } from '../../../model/api/inventory/inv-state';
import { AppData } from '../../../app-data';
import { EntityFileHttpService } from '../../../services/http/common/entity-file.http.service';
import { AssetComponentOpHttpService } from '../../../services/http/assets/asset-component-op.http.service';
import { InvStateHttpService } from '../../../services/http/inventory/inv-state.http.service';
import { AssetHttpService } from '../../../services/http/assets/asset.http.service';
import { AssetComponentHttpService } from '../../../services/http/assets/asset-component.http.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Param } from '../../../model/common/param';
import { AssetComponentAdd } from '../../../model/api/assets/asset-component-add';
import { AssetComponent } from '../../../model/api/assets/asset-component';
import { AssetComponentTransferAdd } from '../../../model/api/assets/asset-component-transfer-add';
import { AssetTransferAdd } from '../../../model/api/assets/asset-transfer-add';
import { Asset } from '../../../model/api/assets/asset';
import { EmployeeCostCenterList } from '../employee-cost-centers/employee-cost-center.list';
import { EmployeeCostCenterHttpService } from '../../../services/http/administration/employee-cost-center.http.service';
import { CostCenterListComponent } from '../cost-centers/cost-center.list';
import { EmployeeCostCenterAdd } from '../../../model/api/assets/employee-cost-center-add';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { CostCenterHttpService } from '../../../services/http/administration/cost-center.http.service';
import { AppUtils } from '../../../common/app.utils';
import { NotificationService } from '../../../services/notification.service';
import { DivisionHttpService } from '../../../services/http/administration/division.http.service';
import { EmployeeDivisionList } from '../employee-divisions/employee-division.list';
import { EmployeeDivisionHttpService } from '../../../services/http/administration/employee-division.http.service';
import { EmployeeDivisionAdd } from '../../../model/api/assets/employee-division-add';
import { Division } from '../../../model/api/administration/division';
import { DivisionListComponent } from '../divisions/division.list';
import { EmployeeCompanyList } from '../employee-companies/employee-company.list';
import { CompanyListComponent } from '../../assets/companies/company.list';
import { EmployeeCompanyHttpService } from '../../../services/http/administration/employee-company.http.service';
import { CompanyHttpService } from '../../../services/http/assets/company.http.service';
import { EmployeeCompanyAdd } from '../../../model/api/assets/employee-cmpany-add';
import { Company } from '../../../model/api/assets/company';


@Component({
    selector: 'employee-detail-ui',
    templateUrl: 'employee.detail.ui.html',
    styleUrls: ['employee.detail.ui.scss'],
})
export class EmployeeDetailUIComponent implements OnInit  {

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
    public division: CodeNameEntity = null;
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
        public entityFileHttpService: EntityFileHttpService,) {
        this.route.params.subscribe((params: Params) => {
            if (params['id']) {
                // let id: number = +params['id'];
                this.employeeId = +params['id'];
            }
        });
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
                       this.refreshAssetComponents();
                       this.refreshAssetComponentOperations();
                       this.refreshEmployeeCostCenters();
                       this.refreshEmployeeCompanies();
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
        this.router.navigate(['/employee'])
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

    public onEmployeeDivisionListSelectionChanged(employeeDivisions: Array<any>) {
      this.selectedEmployeeDivision = this.employeeDivisionList.selectedItem;
  }

//   public onEmployeeStorageListSelectionChanged(employeeStorages: Array<any>) {
//     this.selectedEmployeeStorage = this.employeeStorageList.selectedItem;
//     }


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

     public selectCostCenter() {
        this.costCenterListModal.show();
        let params:Array<Param> = Array<Param>();
        params.push(new Param('exceptCostCenterIds', AppUtils.getIdsList<CodeNameEntity, number>(this.selectedCostCenters())));
        // console.log(JSON.stringify(params));
        this.costCenterList.refresh(params);

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


    public setSelectedCostCenter() {

        let items: Array<any> = this.costCenterList.selectedItems;
        this.costCenter = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.costCenterListModal.hide();

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

     public selectCompany() {
      this.companyListModal.show();
      let params:Array<Param> = Array<Param>();
      params.push(new Param('exceptCompanyIds', AppUtils.getIdsList<CodeNameEntity, number>(this.selectedCompanies())));
      // console.log(JSON.stringify(params));
      this.companyList.refresh(params);

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


  public setSelectedCompany() {

      let items: Array<any> = this.companyList.selectedItems;
      this.company = ((items != null) && (items.length === 1)) ? items[0] : null;
      this.companyListModal.hide();

      let aIds: number[] = new Array<number>();
      let companysIds: EmployeeCompanyAdd = new EmployeeCompanyAdd();
      items.forEach(item => {
          // aIds.indexOf(item.id) !== -1 ? aIds.push(item.id) : '';
          let index: number = aIds.indexOf(item.id);
          if (index < 0) aIds.push(item.id);
      });

      companysIds.companyIds = aIds;
      companysIds.employeeId = this.employeeId;

      this.employeeCompanyHttpService.addCompanyByEmployee(companysIds).subscribe( (res) => {
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


  public setSelectedDivision() {

      let items: Array<any> = this.divisionList.selectedItems;
      this.division = ((items != null) && (items.length === 1)) ? items[0] : null;
      this.divisionListModal.hide();

      let aIds: number[] = new Array<number>();
      let divisionsIds: EmployeeDivisionAdd = new EmployeeDivisionAdd();
      items.forEach(item => {
          // aIds.indexOf(item.id) !== -1 ? aIds.push(item.id) : '';
          let index: number = aIds.indexOf(item.id);
          if (index < 0) aIds.push(item.id);
      });

      divisionsIds.divisionIds = aIds;
      divisionsIds.employeeId = this.employeeId;

      this.employeeDivisionHttpService.addDivisionByEmployee(divisionsIds).subscribe( (res) => {
              if (res.statusCode === 200) {
                  this.notificationService.showSuccess('Datele au fost salvate cu success!', 'Adauga mapare Departament', 2000, false, 0);
                  this.divisionList.refresh(null);
                  this.employeeDivisionList.refresh(null);
                  this.divisionList.selectedItems = new Array<Division>();
              } else if (res.statusCode === 404) {
                  this.notificationService.showError('Nu exista', 'Adauga mapare Departament', 0, false, 0);
                  this.divisionList.selectedItems = new Array<Division>();
              }
      }, (error) => {
          this.notificationService.showError('Eroare salvare!', 'Adauga mapare Departament', 0, false, 0);
          this.divisionList.selectedItems = new Array<Division>();
      });



  }

  public closeDivision() {
      this.divisionList.selectedItems = new Array<Division>();
      this.divisionListModal.hide();
  }

  /* DIVISION */

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

    public onDeleteEmployeeCompany() {
      this.operationType = OperationType.DeleteEmployeeCompany;
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

    public deleteEmployeeCompany() {
      this.employeeCompanyHttpService.deleteEmployeeCompany(this.employeeCompanyList.selectedItem.id)
      .subscribe((res) => {
          if (res.statusCode === 200) {
              this.notificationService.showSuccess('Operatia a fost finalizata cu success!', 'Stergere mapare companie', 2000, false, 0);
              this.employeeCompanyList.refresh(null);
          } else if (res.statusCode === 404) {
              this.notificationService.showError('Eroare salvare', 'Stergere mapare companie', 0, false, 0);
          }
      }, (error) => {
          this.notificationService.showError('Eroare server', 'Stergere mapare companie', 0, false, 0);
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
            //   case OperationType.DeleteEmployeeStorage:
            //         this.deleteEmployeeStorage();
            //         break;
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

    public changeTab(type, e){
        // if (!e.tabset){
        //     return;
        // }else{
        //     if (e.heading === 'Fisiere' || e.heading === 'Eticheta') {
        //         this.showDeleteScan = false;
        //     }else{
        //         this.showDeleteScan = true;
        //     }
        // }

        if (e.heading === 'Active') {
           this.showMoveToStocksBtn = false;
           if (this.assetList.selectedItems.length > 0) {
               this.showTransferBtn = true;
           }
        } else if (e.heading === 'Accesorii') {
            this.showTransferBtn = false;
            if (this.assetComponentList.selectedItems.length > 0) {
                this.showMoveToStocksBtn = true;
            }
        }  else if (e.heading === 'Operatii') {
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


}

enum OperationType {
    NotSet = 1,
    AssetComponentalidation = 2,
    DeleteAssetComponent = 3,
    DeleteAssetComponentOp = 4,
    DeleteEmployeeCostCenter = 5,
    DeleteEmployeeDivision = 6,
    DeleteEmployeeStorage = 7,
    DeleteEmployeeCompany = 8,
}
