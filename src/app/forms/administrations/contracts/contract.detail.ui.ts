import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Param } from '../../../model/common/param';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { PartnerHttpService } from '../../../services/http/documents/partner.http.service';
import { Employee } from '../../../model/api/administration/employee';
import { Partner } from '../../../model/api/documents/partner';
import { AdministrationHttpService } from '../../../services/http/administration/administration.http.service';
import { CostCenterHttpService } from '../../../services/http/administration/cost-center.http.service';
import { MasterTypeHttpService } from '../../../services/http/assets/master-type.http.service';
import { TypeHttpService } from '../../../services/http/administration/type.http.service';
import { SubTypeHttpService } from '../../../services/http/administration/sub-type.http.service';
import { EntityFileHttpService } from '../../../services/http/common/entity-file.http.service';
import { AccMonthHttpService } from '../../../services/http/accounting/acc-month.http.service';
import { AccountHttpService } from '../../../services/http/administration/account.http.service';
import { MasterTypeListComponent } from '../../assets/master-types/master-type.list';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SubTypeList } from '../sub-types/sub-type.list';
import { EmployeeListComponent } from '../employees/employee.list';
import { AccMonthListComponent } from '../../accounting/acc-month.list';
import { PartnerListComponent } from '../../documents/partners/partner.list';
import { AccountList } from '../account/account.list';
import { CostCenterListComponent } from '../cost-centers/cost-center.list';
import { AdministrationListComponent } from '../administrations/administration.list';
import { CompanyListComponent } from '../../assets/companies/company.list';
import { ProjectList } from '../../assets/projects/project.list';
import { EntityFileListComponent } from '../../common/entity-file.list';
import { EntityFile } from '../../../model/api/common/entity-file';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { EmployeeResource } from '../../../model/api/administration/employee-resource';
import { MonthEntity } from '../../../model/api/common/month-entity';
import { CodePartnerEntity } from '../../../model/api/common/code-partner-entity';
import { AppData } from '../../../app-data';
import { ProjectHttpService } from '../../../services/http/assets/project.http.service';
import { CompanyHttpService } from '../../../services/http/assets/company.http.service';
import { MasterType } from '../../../model/api/assets/master-type';
import { Type } from '../../../model/api/administration/type';
import { SubType } from '../../../model/api/administration/sub-type';
import { Administration } from '../../../model/api/administration/administration';
import { Company } from '../../../model/api/assets/company';
import { Project } from '../../../model/api/assets/project';

import { AccMonth } from '../../../model/api/accounting/acc-month';
import { CostCenter } from '../../../model/api/administration/cost-center';
import { Account } from '../../../model/api/administration/account';
import { AppConfig } from '../../../config';
import { TypeList } from '../types/type.list';
import { Budget } from '../../../model/api/administration/budget';
import { BudgetHttpService } from '../../../services/http/administration/budget.http.service';
import { BudgetList } from '../budget/budget.list';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { Region } from '../../../model/api/administration/region';
import { AssetType } from '../../../model/api/assets/asset-type';
import { ProjectType } from '../../../model/api/assets/project-type';
import { AdmCenterListComponent } from '../adm-centers/adm-center.list';
import { RegionListComponent } from '../regions/region.list';
import { AssetTypeListComponent } from '../../assets/asset-types/asset-type.list';
import { AdmCenterHttpService } from '../../../services/http/administration/adm-center.http.service';
import { RegionHttpService } from '../../../services/http/administration/region.http.service';
import { AssetTypeHttpService } from '../../../services/http/assets/asset-type.http.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ContractOpHttpService } from '../../../services/http/administration/contract-op.http.service';
import { ContractOpDetailListComponent } from '../contract-ops/contract-op.detail.list';
import { ContractSave } from '../../../model/api/administration/contract-save';
import { ContractHttpService } from '../../../services/http/administration/contract.http.service';


@Component({
    selector: 'app-contract-detail-ui',
    templateUrl: 'contract.detail.ui.html',
    styleUrls: ['contract.detail.ui.scss'],
    providers: [
        AdministrationHttpService,
        CostCenterHttpService,
        MasterTypeHttpService,
        TypeHttpService,
        SubTypeHttpService,
        EntityFileHttpService,
        EmployeeHttpService,
        AccMonthHttpService,
        AccountHttpService,
        ContractOpHttpService,
        BudgetHttpService,
        AdmCenterHttpService,
        RegionHttpService,
        AssetTypeHttpService,
        PartnerHttpService ]
})
export class ContractDetailUIComponent implements AfterViewInit  {

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

    @ViewChild('accountList') public accountList: AccountList;
    @ViewChild('accountListModal') public accountListModal: ModalDirective;

    @ViewChild('costCenterList') public costCenterList: CostCenterListComponent;
    @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;

    @ViewChild('administrationList') public administrationList: AdministrationListComponent;
    @ViewChild('administrationListModal') public administrationListModal: ModalDirective;

    @ViewChild('companyList') public companyList: CompanyListComponent;
    @ViewChild('companyListModal') public companyListModal: ModalDirective;

    @ViewChild('budgetList') public budgetList: BudgetList;
    @ViewChild('budgetListModal') public budgetListModal: ModalDirective;

    @ViewChild('projectList') public projectList: ProjectList;
    @ViewChild('projectListModal') public projectListModal: ModalDirective;

    @ViewChild('admCenterList') public admCenterList: AdmCenterListComponent;
    @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;

    @ViewChild('regionList') public regionList: RegionListComponent;
    @ViewChild('regionListModal') public regionListModal: ModalDirective;

    @ViewChild('assetTypeList') public assetTypeList: AssetTypeListComponent;
    @ViewChild('assetTypeListModal') public assetTypeListModal: ModalDirective;

    // @ViewChild('projectTypeList') public projectTypeList: ProjectTypeList;
    // @ViewChild('projectTypeListModal') public projectTypeListModal: ModalDirective;

    @ViewChild('contractOpDetailList') public contractOpList: ContractOpDetailListComponent;
    @ViewChild('entityFileList') public entityFileList: EntityFileListComponent;

    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
    @ViewChild('fileInput') fileInput;

    public entityTypeCode: string = 'CONTRACT';
    public entityFile: EntityFile = null;
    public confirmationMessage: string = '';
    public operationType: OperationType = OperationType.NotSet;


    public id: number = 0;
    public contract: ContractSave = new ContractSave();
    public filesToUpload: Array<File>;
    public selectedAssetOp: any;
    public isSaved: boolean = true;
    message = '';

    public get allowSaving(): boolean {
        return this.contract != null &&
        this.contract.quantity > 0 &&
        this.company != null &&
        this.project != null &&
        this.admCenter != null &&
        this.region != null &&
        this.assetType != null &&
        this.employee != null;
    }

    public costCenter: CodeNameEntity = null;
    public employee: Employee = null;
    public accMonth: AccMonth = null;
    public company: CodeNameEntity = null;
    public account: CodeNameEntity = null;
    public partner: CodePartnerEntity = null;
    public masterType: CodeNameEntity = null;
    public project: CodeNameEntity = null;
    public interCompany: CodeNameEntity = null;
    public type: CodeNameEntity = null;
    public subType: CodeNameEntity = null;
    public administration: CodeNameEntity = null;

    public budget: Budget = null;
    public admCenter: CodeNameEntity = null;
    public region: CodeNameEntity = null;
    public assetType: CodeNameEntity = null;
    public projectType: CodeNameEntity = null;

    public readOnlyForm: boolean = false;
    public get isAdmin(): boolean { return AppData.UserIsAdmin; }

    availablePartners: Partner[] = null;
    selectedPartners: Partner[] = [];
    selectedPartnerIds: Array<number> = new Array<number>();

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public contractHttpService: ContractHttpService,
        public masterTypeHttpService: MasterTypeHttpService,
        public accountHttpService: AccountHttpService,
        public typeHttpService: TypeHttpService,
        public subTypeHttpService: SubTypeHttpService,
        public accMonthHttpService: AccMonthHttpService,
        public budgetHttpService: BudgetHttpService,
        public employeeHttpService: EmployeeHttpService,
        public costCenterHttpService: CostCenterHttpService,
        public projectHttpService: ProjectHttpService,
        public companyHttpService: CompanyHttpService,
        public contractOpHttpService: ContractOpHttpService,
        public partnerHttpService: PartnerHttpService,
        public admCenterHttpService: AdmCenterHttpService,
        public regionHttpService: RegionHttpService,
        public assetTypeHttpService: AssetTypeHttpService,
        public administrationHttpService: AdministrationHttpService,
        public entityFileHttpService: EntityFileHttpService) {
        this.route.params.subscribe((params: Params) => {
            if (params['id']) {
                this.id = +params['id'];
            }
        });
    }

    ngAfterViewInit() {
        // if ((this.assetFullDetail !== null) && (this.assetFullDetail.id === 0)) this.refreshDocumentTypes();
        if (this.id > 0) {
            this.contractHttpService.getDetailById(this.id)
                .subscribe((asset: any) => {
                    // this.asset = asset;
                       this.updateDetails(asset);

                    if (asset.validated) {
                        this.refreshAssetOperations();
                        this.refreshEntityFiles();
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
        params.push(new Param('entityId', this.contract.id.toString()));

        this.entityFileList.refresh(params);
    }

    public refreshAssetOperations() {
        const params: Array<Param> = new Array<Param>();
        params.push(new Param('assetId', this.id.toString()));
        this.contractOpList.refresh(params);
    }

    public updateDetails(contract: any) {
        this.contract.id = contract.id;
        this.contract.code = contract.code;
        this.contract.name = contract.name;
        this.contract.companyId = contract.companyId;
        this.contract.projectId = contract.projectId;
        this.contract.administrationId = contract.administrationId;
        this.contract.masterTypeId = contract.masterTypeId;
        this.contract.typeId = contract.typeId;
        this.contract.subTypeId = contract.subTypeId;
        this.contract.employeeId = contract.employeeId;
        this.contract.accMonthId = contract.accMonthId;
        this.contract.interCompanyId = contract.interCompanyId;
        this.contract.partnerId = contract.partnerId;
        this.contract.accountId = contract.accountId;
        this.contract.costCenterId = contract.costCenterId;
        this.contract.valueIni = contract.valueIni;
        this.contract.valueFin = contract.valueFin;
        this.contract.quantity = contract.quantity;
        this.contract.info = contract.info;
        this.contract.validated = contract.validated;
        this.company = contract.company;
        this.project = contract.project;
        this.administration = contract.administration;
        this.masterType = contract.masterType;
        this.type = contract.type;
        this.subType = contract.subType;
        this.employee = contract.employee;
        this.accMonth = contract.accMonth;
        this.interCompany = contract.interCompany;
        this.partner = contract.partner;
        this.account = contract.account;
        this.costCenter = contract.costCenter;

        this.admCenter = contract.admCenter;
        this.region = contract.region;
        this.assetType = contract.assetType;
        this.projectType = contract.projectType;
        this.budget = contract.budget;
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

               /*begin COMPANY */
               public selectBudget() {

                this.budgetList.refresh(null);
                this.budgetListModal.show();
            }
            public setSelectedBudget() {
                const items: Array<Budget> = this.budgetList.selectedItems;
                this.budget = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.budgetListModal.hide();
            }

            /*end COMPANY */

               /*begin PROJECT */
               public selectProject() {

                this.projectList.refresh(null);
                this.projectListModal.show();
            }
            public setSelectedProject() {
                const items: Array<Project> = this.projectList.selectedItems;
                this.project = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.projectListModal.hide();
            }

            /*end PROJECT */

                /*begin ADMCENTER */
                public selectAdmCenter() {

                    this.admCenterList.refresh(null);
                    this.admCenterListModal.show();
                }
                public setSelectedAdmCenter() {
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
                public setSelectedRegion() {
                    const items: Array<Region> = this.regionList.selectedItems;
                    this.region = ((items != null) && (items.length === 1)) ? items[0] : null;
                    this.regionListModal.hide();
                }
                /*end REGION */

                  /*begin ASSETTYPE */
                  public selectAssetType() {

                    this.assetTypeList.refresh(null);
                    this.assetTypeListModal.show();
                }
                public setSelectedAssetType() {
                    const items: Array<AssetType> = this.assetTypeList.selectedItems;
                    this.assetType = ((items != null) && (items.length === 1)) ? items[0] : null;
                    this.assetTypeListModal.hide();
                }
                /*end PROJECTTYPE */

                //   /*begin PROJECTTYPE */
                //   public selectProjectType() {

                //     this.projectTypeList.refresh(null);
                //     this.projectTypeListModal.show();
                // }
                // public setSelectedProejctType() {
                //     let items: Array<ProjectType> = this.projectTypeList.selectedItems;
                //     this.region = ((items != null) && (items.length === 1)) ? items[0] : null;
                //     this.projectTypeListModal.hide();
                // }
                // /*end PROJECTTYPE */

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
        this.router.navigate(['/procurement/contract']);
    }

    public onDeleteAsset() {
        this.operationType = OperationType.Delete;
        this.confirmationMessage = 'Stergeti inregistrarea curenta?';
        this.confirmationModal.show();
    }

    public deleteAsset() {
        this.contractHttpService.delete(this.contract.id)
            .subscribe(() => this.router.navigate(['/assetdepdetails']));
    }

    public onValidateAsset() {
        this.operationType = OperationType.AssetValidation;
        this.confirmationMessage = 'Validati inregistrarea curenta?';
        this.confirmationModal.show();
    }

    public validateContract() {
        this.contract.validated = true;
        this.saveContract();
    }

    public addNewOperation() {
        // let assets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
        // assets.push(new AssetSimpleDetail(this.asset.id, this.asset.invNo, this.asset.assetName,
        //     '', this.asset.partner, this.asset.assetType, this.asset.accState, this.asset.usageStartDate, '', ''));
        // AppData.AssetList = assets;
        // this.router.navigate(['/newoperation']);
    }


    public saveContract() {
        this.isSaved = false;

        this.contract.companyId = this.company != null ? this.company.id : null;
        this.contract.projectId = this.project != null ? this.project.id : null;
        this.contract.administrationId = this.administration != null ? this.administration.id : null;
        this.contract.masterTypeId = this.masterType != null ? this.masterType.id : null;
        this.contract.typeId = this.type != null ? this.type.id : null;
        this.contract.subTypeId = this.subType != null ? this.subType.id : null;
        this.contract.employeeId = this.employee != null ? this.employee.id : null;
        this.contract.accMonthId = this.accMonth != null ? this.accMonth.id : null;
        this.contract.interCompanyId = this.interCompany != null ? this.interCompany.id : null;
        this.contract.partnerId = this.partner != null ? this.partner.id : null;
        this.contract.accountId = this.account != null ? this.account.id : null;
        this.contract.costCenterId = this.costCenter != null ? this.costCenter.id : null;

        this.contract.admCenterId = this.admCenter != null ? this.admCenter.id : null;
        this.contract.regionId = this.region != null ? this.region.id : null;
        this.contract.assetTypeId = this.assetType != null ? this.assetType.id : null;
        this.contract.projectTypeId = this.projectType != null ? this.projectType.id : null;
        this.contract.budgetId = this.budget != null ? this.budget.id : null;
        this.contract.partnerIds = new Array<number>();
        this.selectedPartners.forEach( item => {
            if (this.contract.partnerIds.indexOf(item.id) === -1) {
                this.contract.partnerIds.push(item.id);
            }
        });

        this.contract.validated = true;

        if (this.contract.id > 0) {
             this.contractHttpService.updateAsset(this.contract)
            .subscribe(() => {
                this.contractHttpService.getDetailById(this.contract.id)
                    .subscribe((asset: any) => {
                        if (asset != null) {
                            alert('Datele au fost modificate cu succes!');
                            this.isSaved = true;
                            this.updateDetails(asset);
                            this.refreshAssetOperations();
                        }
                    }, (error) => {
                        alert('Erosre la salvarea datelor!');
                    });
            }, (error) => {
                alert('Eroare server!');
            });
        } else {

            this.contractHttpService.addNewBudget(this.contract)
            .subscribe((assetId: number) => {
                if (assetId > 0) {
                    this.id = assetId;
                    alert('Datele au fost salvate!');
                    this.router.navigate(['/procurement/contract/', assetId]);
                    this.refreshAssetOperations();
                }
        });
        }
    }

    public onConfirmationApproved() {

        switch (this.operationType) {
            case OperationType.AssetValidation:
                this.validateContract();
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
        this.selectedAssetOp = this.contractOpList.selectedItem;
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
        this.contractOpHttpService.process(this.contractOpList.selectedItem.id).subscribe((data) => {
            this.refreshAssetOperations();
        });
    }

  public changeTab(type, e) {
    if (type === 'furnizori') {
        // this.showComponent = true;
        this.partnerHttpService.get(1, 10, 'name', 'asc', [], null, '').subscribe( (res: any) => {
            this.availablePartners = [];
            // console.log(JSON.stringify(res));
            res.items.forEach(element => {
                this.availablePartners.push(element);
            });
        });
    } else {
        // this.showComponent = false;
    }

 }

 drop(event: CdkDragDrop<Partner[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}

enum OperationType {
    NotSet = 1,
    AssetValidation = 2,
    Delete = 3,
    ProcessAssetOp = 4
}
